/**
 * EK Marketplace — Auth Routes
 * ------------------------------
 * POST /auth/register  — create new account
 * POST /auth/login     — authenticate and receive JWT
 * POST /auth/logout    — invalidate session
 *
 * TODO: Implement route handlers once auth.service is built.
 */

import { Router } from 'express';
import type { Request, Response } from 'express';
import { authRateLimiter } from '../middleware/rateLimiter';

export const authRouter = Router();

// Strict rate limiting on all auth endpoints (login/register protection)
authRouter.use(authRateLimiter);

/**
 * POST /auth/register
 * TODO: Validate input (RegisterInput from @ek/types), hash password, create user.
 */
authRouter.post('/register', (_req: Request, res: Response) => {
  // TODO: Implement registration
  res.status(501).json({ success: false, error: { code: 'NOT_IMPLEMENTED', message: 'Registration not yet implemented' } });
});

/**
 * POST /auth/login
 * TODO: Validate credentials, compare hashed password, issue JWT.
 */
authRouter.post('/login', (_req: Request, res: Response) => {
  // TODO: Implement login
  res.status(501).json({ success: false, error: { code: 'NOT_IMPLEMENTED', message: 'Login not yet implemented' } });
});

/**
 * POST /auth/logout
 * TODO: Invalidate JWT/session in Redis.
 */
authRouter.post('/logout', (_req: Request, res: Response) => {
  // TODO: Implement logout
  res.status(501).json({ success: false, error: { code: 'NOT_IMPLEMENTED', message: 'Logout not yet implemented' } });
});
