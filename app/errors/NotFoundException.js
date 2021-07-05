import ApplicationError from './ApplicationError';

export class NotFoundException extends ApplicationError {
  constructor(message) {
    super(404, message && 'Not Found');
  }
}
