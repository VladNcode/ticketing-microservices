import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';
import { Ticket } from '../../models/ticket';

it('return a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signup())
    .send({ title: 'title', price: 20 })
    .expect(404);
});

it('return a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId();
  await request(app).put(`/api/tickets/${id}`).send({ title: 'title', price: 20 }).expect(401);
});

it('return a 401 if the user does not own a ticket', async () => {
  const res = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', global.signup())
    .send({ title: 'title', price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', global.signup())
    .send({ title: 'new title', price: 40 })
    .expect(401);
});

it('return a 400 if the user provided invalid title or price', async () => {
  const cookie = global.signup();

  const res = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({ title: 'title', price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({ title: '', price: 20 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({ price: 20 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'title', price: -20 })
    .expect(400);
});

it('updates a ticked if valid imports provided', async () => {
  const cookie = global.signup();

  const res = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({ title: 'title', price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'new title', price: 100 })
    .expect(200);

  const ticket = await request(app).get(`/api/tickets/${res.body.id}`).expect(200);

  expect(ticket.body.title).toEqual('new title');
  expect(ticket.body.price).toEqual(100);
});

it('publishes an event', async () => {
  const cookie = global.signup();

  const res = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({ title: 'title', price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'new title', price: 100 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('rejects to update a ticket if it is reserved', async () => {
  const cookie = global.signup();

  const res = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({ title: 'title', price: 20 })
    .expect(201);

  const ticket = await Ticket.findById(res.body.id);
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set('Cookie', cookie)
    .send({ title: 'new title', price: 100 })
    .expect(400);
});
