/**
 * EK Marketplace — Global Error Handler Middleware
 * --------------------------------------------------
 * Must be registered as the last middleware in the Express app.
 *
 * TODO: Add structured logging (e.g. pino/winston) in production.
 * TODO: Map specific error types to appropriate HTTP status codes.
 */

import type { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export function errorMiddleware(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? 500;
  const code = err.code ?? 'INTERNAL_ERROR';
  const message = statusCode === 500 ? 'An unexpected error occurred' : err.message;

  // Log the full error in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('[error]', err);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
    },
  });
}
