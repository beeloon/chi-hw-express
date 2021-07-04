export default class ApplicationError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);

    this.status = status;
    this.message = message;
  }
}
