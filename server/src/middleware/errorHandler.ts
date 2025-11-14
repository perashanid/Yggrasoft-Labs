import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
  stack?: string;
}

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    statusCode,
    path: req.path,
    method: req.method,
  });

  const errorResponse: ErrorResponse = {
    success: false,
    message,
  };

  // Include error details in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error = err.message;
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
};

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};
