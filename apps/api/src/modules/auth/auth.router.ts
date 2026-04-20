import { Router, Request, Response } from "express";
import type { ApiResponse } from "@ek/types";
import { authenticate } from "../../middleware/auth.js";

const router = Router();

/**
 * POST /auth/register
 * TODO: validate body, hash password, create user record, issue session.
 */
router.post("/register", (req: Request, res: Response) => {
  const _body = req.body as unknown; // TODO: validate with zod
  res.status(201).json({
    ok: true,
    data: { message: "TODO: implement registration" },
  } satisfies ApiResponse);
});

/**
 * POST /auth/login
 * TODO: validate credentials, issue JWT + set httpOnly cookie.
 */
router.post("/login", (req: Request, res: Response) => {
  const _body = req.body as unknown; // TODO: validate with zod
  res.json({
    ok: true,
    data: { message: "TODO: implement login" },
  } satisfies ApiResponse);
});

/**
 * POST /auth/logout
 * TODO: invalidate session / JWT.
 */
router.post("/logout", authenticate, (_req: Request, res: Response) => {
  // TODO: clear session cookie, revoke token in Redis
  res.json({
    ok: true,
    data: { message: "TODO: implement logout" },
  } satisfies ApiResponse);
});

/**
 * GET /auth/me
 * Returns the current authenticated user.
 * TODO: return real AuthUser from req.user once authenticate() is wired.
 */
router.get("/me", authenticate, (req: Request, res: Response) => {
  res.json({
    ok: true,
    data: req.user ?? null,
  } satisfies ApiResponse);
});

export { router as authRouter };
