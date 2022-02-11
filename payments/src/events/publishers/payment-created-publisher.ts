import { Subjects, Publisher, PaymentCreatedEvent } from '@vnctickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
