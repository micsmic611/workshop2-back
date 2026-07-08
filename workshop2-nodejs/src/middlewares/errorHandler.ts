import { Request, Response, NextFunction } from 'express';

// Global error handler middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  // Default error
  let statusCode = 500;
  let message = 'Internal server error';

  // Check for known error types
  if (err.message) {
    message = err.message;

    // Determine status code based on error message
    if (message.includes('not found')) {
      statusCode = 404;
    } else if (
      message.includes('already exists') ||
      message.includes('Invalid') ||
      message.includes('required')
    ) {
      statusCode = 400;
    } else if (message.includes('Unauthorized') || message.includes('credentials')) {
      statusCode = 401;
    } else if (message.includes('Forbidden')) {
      statusCode = 403;
    }
  }

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Not found handler
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
};

// Async handler wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default {
  errorHandler,
  notFoundHandler,
  asyncHandler
};
