import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '@ek/types';

/**
 * Global error handler middleware.
 * Must be registered last in the Express middleware chain.
 * TODO: add Sentry/error tracking integration.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error('[api] Unhandled error:', err.message);
  const body: ApiResponse = {
    success: false,
    error: 'Internal server error',
  };
  res.status(500).json(body);
}
