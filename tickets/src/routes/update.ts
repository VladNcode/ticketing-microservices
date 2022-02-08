import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest, NotFoundError, NotAuthError } from '@vnctickets/common';
import { Ticket } from '../models/ticket';

import { TicketUpdatedPublisher } from '../events/publishers/ticket-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required!'),
    body('price')
      .isFloat({
        gt: 0,
      })
      .withMessage('Price must be greater than 0!'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthError();
    }

    const { title, price } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { title, price },
      { new: true }
    );

    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: updatedTicket!.id,
      title: updatedTicket!.title,
      price: updatedTicket!.price,
      userId: updatedTicket!.userId,
    });

    res.status(200).send(updatedTicket);
  }
);

export { router as updateTicketRouter };
