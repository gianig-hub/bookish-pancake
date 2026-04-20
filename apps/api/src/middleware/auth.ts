import type { Request, Response, NextFunction } from 'express';
import type { SessionUser } from '@ek/types';
import { UserRole } from '@ek/types';
import { ROLE_HIERARCHY } from '@ek/config';
import type { ApiResponse } from '@ek/types';

/**
 * Attach a decoded session user to the request.
 * TODO: implement real JWT verification.
 */
export function authenticate(_req: Request, _res: Response, next: NextFunction): void {
  // TODO: read Authorization header or session cookie
  // TODO: verify JWT and decode SessionUser
  // TODO: attach to req.user

  // For now, pass through — all routes are unprotected until auth is wired
  next();
}

/**
 * Require that the requesting user has at least the given role.
 * Must be used after the `authenticate` middleware.
 */
export function requireRole(minRole: UserRole) {
  return function (req: Request, res: Response, next: NextFunction): void {
    const user = (req as Request & { user?: SessionUser }).user;

    if (!user) {
      const body: ApiResponse = { success: false, error: 'Unauthorized' };
      res.status(401).json(body);
      return;
    }

    const userIndex = ROLE_HIERARCHY.indexOf(user.role);
    const requiredIndex = ROLE_HIERARCHY.indexOf(minRole);

    if (userIndex < requiredIndex) {
      const body: ApiResponse = { success: false, error: 'Forbidden' };
      res.status(403).json(body);
      return;
    }

    next();
  };
}
