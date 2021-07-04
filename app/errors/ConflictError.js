import ApplicationError from './ApplicationError';

export class ConflictError extends ApplicationError {
  constructor(message) {
    super(409, message);
  }
}
