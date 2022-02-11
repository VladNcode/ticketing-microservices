import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@vnctickets/common';
import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);

//* Json and query
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//* Cookie-session
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'test' ? false : true,
  })
);

//* Middlewares
app.use(currentUser);

//* Routing
app.use(createChargeRouter);

app.all('*', (req, res, next) => {
  throw new NotFoundError();
});

//* Error handler
app.use(errorHandler);

export { app };
