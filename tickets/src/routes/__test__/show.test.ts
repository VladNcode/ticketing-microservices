import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if a ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId();

  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('returns a ticket if a ticket is valid', async () => {
  const title = 'title';
  const price = 20;

  const res = await request(app)
    .post('/api/tickets/')
    .set('Cookie', global.signup())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketId = res.body.id;

  const ticketRes = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .set('Cookie', global.signup())
    .send()
    .expect(200);

  expect(ticketRes.body.title).toEqual(title);
  expect(ticketRes.body.price).toEqual(price);
});
