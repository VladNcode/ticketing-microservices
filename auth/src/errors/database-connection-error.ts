export class DatabaseConnectionError extends Error {
  reason: string = 'Error connecting to database';
  constructor() {
    super();

    // Only because we are extending a base class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
