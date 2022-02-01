import express from 'express';

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.listen(3000, () => {
  console.log('Listening on 3000');
});
