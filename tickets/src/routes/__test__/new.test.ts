import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('has a routehandler listening to /api/tickets for post requests', async () => {
  const res = await request(app).post('/api/tickets').send({});
  expect(res.status).not.toEqual(404);
});

it('can only be accessed if user is signed in', async () => {
  const res = await request(app).post('/api/tickets').send({});
  expect(res.status).toEqual(401);
});

it('returns status other than 401 if user is signed in', async () => {
  const res = await request(app).post('/api/tickets').set('Cookie', global.signup()).send({});
  expect(res.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      price: 10,
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'title',
      price: -10,
    })
    .expect(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'title',
    })
    .expect(400);
});

it('creates a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: 'title',
      price: 10,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual('title');
  expect(tickets[0].price).toEqual(10);
});
