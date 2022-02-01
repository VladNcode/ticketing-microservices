import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;
  reason: string = 'Error connecting to database';
  constructor() {
    super('Error connecting to DB');

    // Only because we are extending a base class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
