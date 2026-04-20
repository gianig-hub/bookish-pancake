import type { Request, Response, NextFunction } from 'express';

/**
 * Simple request logger middleware.
 * TODO: replace with a structured logger (e.g. pino) in production.
 */
export function requestLogger(req: Request, _res: Response, next: NextFunction): void {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
}
