import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

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

//* Routing
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', (req, res, next) => {
  throw new NotFoundError();
});

//* Error handler
app.use(errorHandler);

export { app };
