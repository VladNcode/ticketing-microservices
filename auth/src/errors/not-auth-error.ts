import { CustomError } from './custom-error';

export class NotAuthError extends CustomError {
  statusCode = 401;
  constructor() {
    super('You are not authorized!');
    Object.setPrototypeOf(this, NotAuthError.prototype);
  }

  serializeErrors() {
    return [{ message: 'You are not authorized!' }];
  }
}
