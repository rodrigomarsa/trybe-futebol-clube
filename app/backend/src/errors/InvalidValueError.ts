export default class InvalidValueError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 422;
  }
}
