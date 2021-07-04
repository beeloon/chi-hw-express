import ApplicationError from './ApplicationError';

export class BadRequest extends ApplicationError {
  constructor() {
    super(400, 'Bad request');
  }
}
