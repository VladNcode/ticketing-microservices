import { Publisher, OrderCancelledEvent, Subjects } from '@vnctickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
