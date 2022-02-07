import request from 'supertest';
import { app } from '../../app';

const createTicket = async (title: string, price: number) => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signup())
    .send({
      title: title,
      price: price,
    })
    .expect(201);
};

it('cat fetch a list of tickets', async () => {
  await createTicket('title', 20);
  await createTicket('title2', 40);
  await createTicket('title3', 60);

  const res = await request(app).get('/api/tickets').send().expect(200);

  expect(res.body.length).toEqual(3);
  expect(res.body[0].title).toEqual('title');
  expect(res.body[0].price).toEqual(20);
});
