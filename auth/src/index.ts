import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { signinRouter } from './routes/signin';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

//* Json and query
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//* Routing
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

//* Error handler
app.use(errorHandler);

//* Starting server
app.listen(3000, () => {
  console.log('Listening on 3000');
});
