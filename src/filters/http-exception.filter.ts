import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseError } from 'src/utils/errors';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // ✅ Default values for unknown errors
    let status = 500;
    let errorMessage = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorMessage = exception.message;
    } else if (exception instanceof BaseError) {
      status = exception.statusCode; // ✅ Use status code from error class
      errorMessage = exception.message;
    }

    this.logger.error(`❌ ${exception.name}: ${exception.message}`);

    response.status(status).json({
      statusCode: status,
      error: exception.name || 'Error',
      message: errorMessage,
    });
  }
}
