import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../app';

declare global {
  var signup: () => string[];
}

jest.mock('../nats-wrapper');

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'string';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signup = () => {
  // Build a JWT payload: {id, email}
  const payload = { id: new mongoose.Types.ObjectId().toHexString(), email: 'test@test.com' };

  // Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object: {jwt: myjwt_token}
  const session = { jwt: token };

  // Turn session into JSON
  const sessionJson = JSON.stringify(session);

  // Encode JSON as base64
  const base64 = Buffer.from(sessionJson).toString('base64');

  // Return a string thats a cookie with an encoded data
  return [`session=${base64}`];
};
