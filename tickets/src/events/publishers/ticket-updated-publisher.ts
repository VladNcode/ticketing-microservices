import { Publisher, Subjects, TicketUpdatedEvent } from '@vnctickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
