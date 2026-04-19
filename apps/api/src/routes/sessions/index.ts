import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import type { ApiResponse } from "@ek/types";

const router = Router();

/**
 * GET /sessions
 * List active sessions for the current user.
 * TODO: implement once session store is set up (e.g. Redis or DB table).
 */
router.get("/", requireAuth, (_req, res) => {
  const body: ApiResponse = {
    success: false,
    error: { code: "NOT_IMPLEMENTED", message: "Session listing not yet implemented" },
    timestamp: new Date().toISOString(),
  };
  res.status(501).json(body);
});

/**
 * DELETE /sessions/:id
 * Revoke a specific session (remote sign-out).
 * TODO: implement session revocation.
 */
router.delete("/:id", requireAuth, (_req, res) => {
  const body: ApiResponse = {
    success: false,
    error: { code: "NOT_IMPLEMENTED", message: "Session revocation not yet implemented" },
    timestamp: new Date().toISOString(),
  };
  res.status(501).json(body);
});

export default router;
