import request from 'supertest';
import { app } from '../../app';

it('returns 201 on successfull signin', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'wrongemail@test.com', password: 'password' })
    .expect(400);
});

it('returns 201 on successfull signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);
});
