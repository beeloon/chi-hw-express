export default class RequestError extends Error {
  constructor(message, status) {
    super(message);

    this.status = status;
  }
}
