import { Router } from 'express';
import type { Request, Response } from 'express';
import type { ApiResponse } from '@ek/types';

export const authRouter = Router();

/**
 * POST /api/auth/register
 * TODO: validate body with zod
 * TODO: hash password with bcrypt
 * TODO: create user in database
 * TODO: send verification email if EMAIL_VERIFICATION_REQUIRED
 */
authRouter.post('/register', (_req: Request, res: Response): void => {
  const body: ApiResponse = {
    success: false,
    error: 'Not implemented',
  };
  res.status(501).json(body);
});

/**
 * POST /api/auth/login
 * TODO: validate credentials
 * TODO: create session / issue JWT
 */
authRouter.post('/login', (_req: Request, res: Response): void => {
  const body: ApiResponse = {
    success: false,
    error: 'Not implemented',
  };
  res.status(501).json(body);
});

/**
 * POST /api/auth/logout
 * TODO: invalidate session / clear cookie
 */
authRouter.post('/logout', (_req: Request, res: Response): void => {
  const body: ApiResponse = {
    success: false,
    error: 'Not implemented',
  };
  res.status(501).json(body);
});

/**
 * POST /api/auth/refresh
 * TODO: validate refresh token and issue new access token
 */
authRouter.post('/refresh', (_req: Request, res: Response): void => {
  const body: ApiResponse = {
    success: false,
    error: 'Not implemented',
  };
  res.status(501).json(body);
});
