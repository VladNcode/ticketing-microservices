import mongoose from 'mongoose';
import { app } from './app';

//* DB and server start
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }

  //* Starting server
  app.listen(3000, () => {
    console.log('Listening on 3000');
  });
};

start();
