import ApplicationError from './ApplicationError';

export class UnauthorizedError extends ApplicationError {
  constructor() {
    super(401, 'Unauthorized user');
  }
}
