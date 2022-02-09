import { Publisher, OrderCreatedEvent, Subjects } from '@vnctickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
