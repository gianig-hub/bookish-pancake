import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import type { ApiResponse } from "@ek/types";

const router = Router();

/**
 * GET /users/me
 * Returns the currently authenticated user's profile.
 * TODO: fetch from DB once schema is ready.
 */
router.get("/me", requireAuth, (_req, res) => {
  const body: ApiResponse = {
    success: false,
    error: { code: "NOT_IMPLEMENTED", message: "User profile not yet implemented" },
    timestamp: new Date().toISOString(),
  };
  res.status(501).json(body);
});

/**
 * PATCH /users/me
 * Update the current user's profile.
 * TODO: implement profile update with validation.
 */
router.patch("/me", requireAuth, (_req, res) => {
  const body: ApiResponse = {
    success: false,
    error: { code: "NOT_IMPLEMENTED", message: "Profile update not yet implemented" },
    timestamp: new Date().toISOString(),
  };
  res.status(501).json(body);
});

export default router;
