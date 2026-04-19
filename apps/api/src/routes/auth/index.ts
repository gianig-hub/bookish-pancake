import { Router } from "express";
import type { ApiResponse } from "@ek/types";

const router = Router();

/**
 * POST /auth/register
 * TODO: implement email + password registration with DB persistence.
 */
router.post("/register", (_req, res) => {
  const body: ApiResponse = {
    success: false,
    error: { code: "NOT_IMPLEMENTED", message: "Registration not yet implemented" },
    timestamp: new Date().toISOString(),
  };
  res.status(501).json(body);
});

/**
 * POST /auth/login
 * TODO: implement credential validation and JWT issuance.
 */
router.post("/login", (_req, res) => {
  const body: ApiResponse = {
    success: false,
    error: { code: "NOT_IMPLEMENTED", message: "Login not yet implemented" },
    timestamp: new Date().toISOString(),
  };
  res.status(501).json(body);
});

/**
 * POST /auth/logout
 * TODO: invalidate session/refresh token.
 */
router.post("/logout", (_req, res) => {
  const body: ApiResponse = {
    success: false,
    error: { code: "NOT_IMPLEMENTED", message: "Logout not yet implemented" },
    timestamp: new Date().toISOString(),
  };
  res.status(501).json(body);
});

/**
 * POST /auth/refresh
 * TODO: exchange refresh token for new access token.
 */
router.post("/refresh", (_req, res) => {
  const body: ApiResponse = {
    success: false,
    error: { code: "NOT_IMPLEMENTED", message: "Token refresh not yet implemented" },
    timestamp: new Date().toISOString(),
  };
  res.status(501).json(body);
});

export default router;
