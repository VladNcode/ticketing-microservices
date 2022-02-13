import request from 'supertest';
import { app } from '../../app';

it('should return a correct current user', async () => {
  const cookie = await global.signup();

  const res = await request(app).get('/api/users/currentuser').set('Cookie', cookie).expect(400);

  expect(res.body.currentUser.email).toEqual('test@test.com');
});

it('should respond with null if not authenticated', async () => {
  const res = await request(app).get('/api/users/currentuser').expect(200);

  expect(res.body.currentUser).toEqual(null);
});
