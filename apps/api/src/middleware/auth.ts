import { Request, Response, NextFunction } from "express";
import type { AuthUser } from "@ek/types";
import { ROLE_HIERARCHY } from "@ek/config";
import type { UserRole } from "@ek/types";

/**
 * Augment Express Request with the authenticated user.
 * TODO: Remove `?` once real auth middleware is implemented and always sets `user`.
 */
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

/**
 * Stub auth middleware – placeholder until real JWT verification is implemented.
 *
 * TODO: Decode and verify Bearer JWT from Authorization header.
 *       Fetch user from DB or validate claims.
 *       Set req.user with verified AuthUser.
 */
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  // TODO: verify JWT token
  // const token = req.headers.authorization?.split(' ')[1];
  // if (!token) { res.status(401).json({ ok: false, error: { code: 'UNAUTHORIZED', message: 'No token' } }); return; }
  // req.user = verifyToken(token);
  next();
}

/**
 * Role-guard middleware factory.
 * Requires authenticate() to have run first and set req.user.
 *
 * @param minRole – minimum role required to proceed
 */
export function requireRole(minRole: UserRole) {
  return function roleGuard(req: Request, res: Response, next: NextFunction): void {
    const user = req.user;

    if (!user) {
      res.status(401).json({ ok: false, error: { code: "UNAUTHORIZED", message: "Authentication required" } });
      return;
    }

    if (ROLE_HIERARCHY.indexOf(user.role) < ROLE_HIERARCHY.indexOf(minRole)) {
      res.status(403).json({ ok: false, error: { code: "FORBIDDEN", message: "Insufficient permissions" } });
      return;
    }

    next();
  };
}
