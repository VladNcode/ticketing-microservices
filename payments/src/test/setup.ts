import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signup: (id?: string) => string[];
}

jest.mock('../nats-wrapper');
// jest.mock('../stripe');

//TODO
// process.env.STRIPE_KEY = 'STIPE_API_KEY_NEEDS_TO_BE_HERE';

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

global.signup = (id?: string) => {
  // Build a JWT payload: {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

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
