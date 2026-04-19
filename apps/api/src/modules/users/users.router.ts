import { Router, Request, Response } from "express";
import type { ApiResponse } from "@ek/types";
import { authenticate, requireRole } from "../../middleware/auth.js";

const router = Router();

/**
 * GET /users
 * Admin-only list of users.
 * TODO: paginate, filter, search.
 */
router.get("/", authenticate, requireRole("admin"), (_req: Request, res: Response) => {
  // TODO: query DB for user list
  res.json({
    ok: true,
    data: { users: [], total: 0, message: "TODO: implement user list" },
  } satisfies ApiResponse);
});

/**
 * GET /users/:id
 * Returns a single user profile.
 * TODO: authorise – user can only see their own profile unless admin.
 */
router.get("/:id", authenticate, (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  // TODO: fetch user from DB by id
  res.json({
    ok: true,
    data: { id, message: "TODO: implement get user by id" },
  } satisfies ApiResponse);
});

/**
 * PATCH /users/:id
 * Update user profile.
 * TODO: authorise – user can only update their own profile unless admin.
 */
router.patch("/:id", authenticate, (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const _body = req.body as unknown; // TODO: validate with zod
  // TODO: update user in DB
  res.json({
    ok: true,
    data: { id, message: "TODO: implement update user" },
  } satisfies ApiResponse);
});

export { router as usersRouter };
