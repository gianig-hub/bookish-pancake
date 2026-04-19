/**
 * Auth middleware for the EK Marketplace API.
 *
 * Reads the session ID from the Authorization header (Bearer <sessionId>)
 * and attaches the user to req.user.
 *
 * TODO: Replace in-memory session lookup with Redis/DB before production.
 */

import type { Request, Response, NextFunction } from 'express';
import type { UserRole } from '@ek/types';
import { getSession } from '../lib/session';

// Extend Express Request to carry the authenticated user
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: import('@ek/types').User;
      sessionId?: string;
    }
  }
}

/**
 * requireAuth — rejects requests with no valid session.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  const sessionId = header?.startsWith('Bearer ') ? header.slice(7).trim() : null;

  if (!sessionId) {
    res.status(401).json({ error: 'Unauthorised — no session provided.' });
    return;
  }

  const session = getSession(sessionId);
  if (!session) {
    res.status(401).json({ error: 'Unauthorised — session expired or invalid.' });
    return;
  }

  req.user = session.user;
  req.sessionId = sessionId;
  next();
}

/**
 * requireRole — rejects requests where the user's role is not in allowedRoles.
 * Must be used AFTER requireAuth.
 *
 * @example
 *   router.get('/admin', requireAuth, requireRole(['admin']), handler)
 */
export function requireRole(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorised.' });
      return;
    }
    if (!allowedRoles.includes(req.user.role)) {
      res
        .status(403)
        .json({ error: `Forbidden — requires one of: ${allowedRoles.join(', ')}.` });
      return;
    }
    next();
  };
}
