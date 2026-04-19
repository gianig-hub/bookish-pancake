import { Request, Response, NextFunction } from "express";
import type { SessionUser } from "@ek/types";
import type { UserRole } from "@ek/types";
import { hasAnyRole } from "@ek/config";

// Extend Express Request to carry the authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
    }
  }
}

/**
 * requireAuth – middleware that checks for a valid session/JWT.
 *
 * TODO: implement real JWT verification once auth library is chosen
 * (e.g. jose, jsonwebtoken).  Until then, all requests are rejected with
 * 401 – this is the safe default and prevents accidental access.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Authentication required" },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // TODO: verify JWT and attach decoded user to req.user
  // Example:
  //   const user = verifyAccessToken(token);
  //   req.user = user;
  //   next();
  //
  // Until JWT verification is implemented, reject all requests to prevent
  // accidental access to protected endpoints.
  res.status(501).json({
    success: false,
    error: { code: "NOT_IMPLEMENTED", message: "JWT verification not yet implemented" },
    timestamp: new Date().toISOString(),
  });
}

/**
 * requireRole – middleware factory that restricts a route to specific roles.
 * Must be used AFTER requireAuth.
 */
export function requireRole(...roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;
    if (!user) {
      res.status(401).json({
        success: false,
        error: { code: "UNAUTHORIZED", message: "Authentication required" },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (!hasAnyRole(user, roles)) {
      res.status(403).json({
        success: false,
        error: { code: "FORBIDDEN", message: "Insufficient permissions" },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    next();
  };
}
