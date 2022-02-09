import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@vnctickets/common/build';
import { body } from 'express-validator';

const router = express.Router();

router.post('/api/orders', requireAuth, [], async (req: Request, res: Response) => {
  res.send({});
});

export { router as createOrderRouter };
