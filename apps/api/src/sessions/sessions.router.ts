import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ApiResponse } from '@ek/types';
import { authenticate } from '../middleware/auth';

export const sessionsRouter = Router();

/**
 * GET /api/sessions/me
 * Return the current session info (non-sensitive).
 * TODO: decode and return session metadata (issued at, expires at, device)
 */
sessionsRouter.get('/me', authenticate, (_req: Request, res: Response): void => {
  const body: ApiResponse = {
    success: false,
    error: 'Not implemented',
  };
  res.status(501).json(body);
});

/**
 * DELETE /api/sessions/me
 * Revoke the current session.
 * TODO: invalidate token / remove session record from database
 */
sessionsRouter.delete('/me', authenticate, (_req: Request, res: Response): void => {
  const body: ApiResponse = {
    success: false,
    error: 'Not implemented',
  };
  res.status(501).json(body);
});
