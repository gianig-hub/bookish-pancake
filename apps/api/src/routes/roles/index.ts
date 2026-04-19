import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth";
import type { ApiResponse } from "@ek/types";

const router = Router();

/**
 * GET /roles
 * List all available roles. Admin only.
 * TODO: return roles from DB / config once roles table exists.
 */
router.get("/", requireAuth, requireRole("admin"), (_req, res) => {
  const body: ApiResponse = {
    success: false,
    error: { code: "NOT_IMPLEMENTED", message: "Roles listing not yet implemented" },
    timestamp: new Date().toISOString(),
  };
  res.status(501).json(body);
});

/**
 * POST /roles/assign
 * Assign a role to a user. Admin only.
 * TODO: implement role assignment with audit log.
 */
router.post("/assign", requireAuth, requireRole("admin"), (_req, res) => {
  const body: ApiResponse = {
    success: false,
    error: { code: "NOT_IMPLEMENTED", message: "Role assignment not yet implemented" },
    timestamp: new Date().toISOString(),
  };
  res.status(501).json(body);
});

export default router;
