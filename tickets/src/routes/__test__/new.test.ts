import request from 'supertest';
import { app } from '../../app';

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

it('returns an error if an invalid title is provided', async () => {});
it('returns an error if an invalid price is provided', async () => {});
it('creates a ticket with valid inputs', async () => {});
