/**
 * EK Marketplace — Auth Middleware
 * ----------------------------------
 * Reads and verifies the JWT from the Authorization header or cookie.
 * Sets req.user if the token is valid.
 *
 * TODO: Add cookie-based token reading for web app sessions.
 * TODO: Add Redis token blocklist check (for logout support).
 */

import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/auth.service';
import type { SessionUser } from '@ek/types';

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
    }
  }
}

/**
 * Middleware: authenticate the request.
 * Reads JWT from Authorization: Bearer <token> header.
 * Sets req.user on success, returns 401 on failure.
 */
export function authenticateMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'No token provided' } });
    return;
  }

  const token = authHeader.slice(7);
  const user = verifyToken(token);

  if (!user) {
    res.status(401).json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Invalid or expired token' } });
    return;
  }

  req.user = user;
  next();
}

/**
 * Middleware: optionally authenticate the request.
 * Sets req.user if a valid token is present, but does not reject if missing.
 * Use for public routes that show different content when authenticated.
 */
export function optionalAuthMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    const user = verifyToken(token);
    if (user) {
      req.user = user;
    }
  }

  next();
}
