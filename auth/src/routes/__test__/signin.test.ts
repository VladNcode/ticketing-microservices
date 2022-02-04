import request from 'supertest';
import { app } from '../../app';

it('it fails when email that does not exists is provided', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'wrongemail@test.com', password: 'password' })
    .expect(400);
});

it('allows user to login with correct credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  const res = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});

it('should not allow user to login with incorrect credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  const res = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'pass' })
    .expect(400);

  expect(res.get('Set-Cookie')).not.toBeDefined();
});
