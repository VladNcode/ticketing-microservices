import { Message } from 'node-nats-streaming';
import { Listener, Subjects, OrderCancelledEvent } from '@vnctickets/common';
import { queueGroupName } from './queueGroupName';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket throw err
    if (!ticket) {
      throw new Error('Ticket not found!');
    }

    // Mark the ticket as being reserving by setting its orderId property
    ticket.set({ orderId: undefined });

    // Save the ticket
    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
    });

    // Ack the message
    msg.ack();
  }
}
