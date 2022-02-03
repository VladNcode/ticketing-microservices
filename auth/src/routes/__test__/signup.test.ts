import request from 'supertest';
import { app } from '../../app';

it('returns 201 on successfull signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('returns 400 with an invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'invalidemail', password: 'password' })
    .expect(400);
});

it('returns 400 with invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'p' })
    .expect(400);
});

it('returns 400 with missing email / password or both', async () => {
  await request(app).post('/api/users/signup').send({}).expect(400);
  await request(app).post('/api/users/signup').send({ email: 'test@test.com' }).expect(400);
  await request(app).post('/api/users/signup').send({ password: 'password' }).expect(400);
});

it('should not allow duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
});

it('sets a cookie after successfull signup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
});
