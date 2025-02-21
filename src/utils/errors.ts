import { HttpStatus } from '@nestjs/common';

export class BaseError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name; // ✅ Automatically sets the error name
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends BaseError {
  constructor(message = 'Resource not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class BadRequestError extends BaseError {
  constructor(message = 'Bad request') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class InternalServerError extends BaseError {
  constructor(message = 'Internal Server Error') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
