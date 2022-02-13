import mongoose from 'mongoose';
import request from 'supertest';
import { OrderStatus } from '@vnctickets/common';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Payment } from '../../models/payment';
import { stripe } from '../../stripe';

it('returns a 404 when purchasing an order that does not exist', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup())
    .send({
      token: 'asdasd',
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it('returns 401 when purchasing an order that does not belong to the user', async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: new mongoose.Types.ObjectId().toHexString(),
    price: 20,
    status: OrderStatus.Created,
  });

  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup())
    .send({
      token: 'asdasd',
      orderId: order.id,
    })
    .expect(401);
});

it('returns a 400 when purchasing a cancelled order', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: userId,
    price: 20,
    status: OrderStatus.Cancelled,
  });

  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup(userId))
    .send({
      token: 'asdasd',
      orderId: order.id,
    })
    .expect(400);
});

// it('returns 201 with valid inputs', async () => {
//   const userId = new mongoose.Types.ObjectId().toHexString();

//   const order = Order.build({
//     id: new mongoose.Types.ObjectId().toHexString(),
//     version: 0,
//     userId,
//     price: 20,
//     status: OrderStatus.Created,
//   });

//   await order.save();

//   console.log(order.id);

//   await request(app)
//     .post('/api/payments')
//     .set('Cookie', global.signup(userId))
//     .send({
//       token: 'tok_visa',
//       orderId: order.id,
//     })
//     .expect(201);

//   // Stripe mock
//   // const chargeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0];
//   // expect(chargeOptions.source).toEqual('tok_visa');
//   // expect(chargeOptions.amount).toEqual(20 * 100);
//   // expect(chargeOptions.currency).toEqual('usd');
// });

it('returns 201 with valid inputs with real stripe API', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const price = Math.floor(Math.random() * 100000);

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: userId,
    price,
    status: OrderStatus.Created,
  });

  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signup(userId))
    .send({
      token: 'tok_visa',
      orderId: order.id,
    })
    .expect(201);

  // const list = await stripe.charges.list();
  // expect(list.data[0].amount).toEqual(price * 100);

  const list = await stripe.charges.list({ limit: 50 });
  const stripeCharge = list.data.find(charge => charge.amount === price * 100);

  expect(stripeCharge).toBeDefined();

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: stripeCharge!.id,
  });

  expect(payment).not.toBeNull();
});
