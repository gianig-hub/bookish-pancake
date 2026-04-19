import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const isDev = process.env.NODE_ENV === 'development';

  console.error('[Error]', err.message);

  res.status(500).json({
    data: null,
    error: 'Internal server error',
    ...(isDev && { details: err.message }),
  });
};
