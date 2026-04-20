import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ApiResponse } from '@ek/types';
import { authenticate, requireRole } from '../middleware/auth';
import { UserRole } from '@ek/types';

export const usersRouter = Router();

/**
 * GET /api/users/me
 * Returns the currently authenticated user's profile.
 * TODO: fetch from database by session user id
 */
usersRouter.get('/me', authenticate, (_req: Request, res: Response): void => {
  const body: ApiResponse = {
    success: false,
    error: 'Not implemented',
  };
  res.status(501).json(body);
});

/**
 * PUT /api/users/me
 * Update the current user's profile.
 * TODO: validate body, update in database
 */
usersRouter.put('/me', authenticate, (_req: Request, res: Response): void => {
  const body: ApiResponse = {
    success: false,
    error: 'Not implemented',
  };
  res.status(501).json(body);
});

/**
 * GET /api/users
 * List all users — admin only.
 * TODO: pagination, filtering
 */
usersRouter.get('/', authenticate, requireRole(UserRole.ADMIN), (_req: Request, res: Response): void => {
  const body: ApiResponse = {
    success: false,
    error: 'Not implemented',
  };
  res.status(501).json(body);
});
