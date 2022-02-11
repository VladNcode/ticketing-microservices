import { Subjects, Publisher, ExpirationCompleteEvent } from '@vnctickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
