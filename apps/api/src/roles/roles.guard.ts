/**
 * EK Marketplace — Role Guard Middleware
 * -----------------------------------------
 * Factory function that returns an Express middleware enforcing role-based access.
 *
 * Usage:
 *   router.get('/admin/users', authenticateMiddleware, requireRole([UserRole.ADMIN]), handler)
 */

import type { Request, Response, NextFunction } from 'express';
import type { UserRole } from '@ek/types';

/**
 * Returns middleware that checks if req.user has one of the required roles.
 * Must be used AFTER authenticateMiddleware (which sets req.user).
 */
export function requireRole(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as Request & { user?: { role: UserRole } }).user;

    if (!user) {
      res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'Authentication required' } });
      return;
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } });
      return;
    }

    next();
  };
}
