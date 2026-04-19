/**
 * EK Marketplace — Users Routes
 * --------------------------------
 * GET  /users/me      — get current authenticated user profile
 * PATCH /users/me     — update current user profile
 * GET  /users         — list all users (admin only)
 *
 * TODO: Implement route handlers once users.service is built.
 */

import { Router } from 'express';
import type { Request, Response } from 'express';
import { authenticateMiddleware } from '../middleware/auth.middleware';
import { requireRole } from '../roles/roles.guard';
import { apiRateLimiter } from '../middleware/rateLimiter';
import { UserRole } from '@ek/types';

export const usersRouter = Router();

/**
 * GET /users/me — returns the authenticated user's profile
 */
usersRouter.get('/me', apiRateLimiter, authenticateMiddleware, (_req: Request, res: Response) => {
  // TODO: Return req.user (set by auth middleware)
  res.status(501).json({ success: false, error: { code: 'NOT_IMPLEMENTED', message: 'Not yet implemented' } });
});

/**
 * PATCH /users/me — update authenticated user's profile
 */
usersRouter.patch('/me', apiRateLimiter, authenticateMiddleware, (_req: Request, res: Response) => {
  // TODO: Validate and update user profile
  res.status(501).json({ success: false, error: { code: 'NOT_IMPLEMENTED', message: 'Not yet implemented' } });
});

/**
 * GET /users — admin only: list all users
 */
usersRouter.get('/', apiRateLimiter, authenticateMiddleware, requireRole([UserRole.ADMIN]), (_req: Request, res: Response) => {
  // TODO: Paginated user list for admin
  res.status(501).json({ success: false, error: { code: 'NOT_IMPLEMENTED', message: 'Not yet implemented' } });
});
