import { Publisher, Subjects, TicketCreatedEvent } from '@vnctickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
