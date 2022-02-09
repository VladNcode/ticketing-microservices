import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import {
  NotFoundError,
  requireAuth,
  NotAuthError,
  BadRequestError,
} from '@vnctickets/common/build';
import { Order, OrderStatus } from '../models/order';

const router = express.Router();

router.get('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params.orderId);

  if (!validId) {
    throw new BadRequestError('Invalid order id!');
  }

  const order = await Order.findById(req.params.orderId).populate('ticket');

  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthError();
  }

  res.send(order);
});

export { router as showOrderRouter };
