import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../shared/errors/error.js';

export function errorMiddleware(
  err: Error | HTTPError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof HTTPError) {
    // Custom HTTPError handling
    res.status(err.statusCode).json({
      error: {
        name: err.name,
        message: err.message,
        statusCode: err.statusCode,
        statusMessage: err.statusMessage,
      },
    });
  } else {
    // Generic server error
    res.status(500).json({
      error: {
        name: 'InternalServerError',
        message: err.message || 'An unexpected error occurred',
      },
    });
  }

  console.error(`Error: ${err.message}`);
  next(); // Optional, for logging chains or future error-handling extensions
}
