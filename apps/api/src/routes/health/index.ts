import { Router } from "express";
import type { ApiResponse } from "@ek/types";

const router = Router();

/**
 * GET /health
 * Basic liveness probe – no auth required.
 */
router.get("/", (_req, res) => {
  const body: ApiResponse<{ status: string; uptime: number }> = {
    success: true,
    data: {
      status: "ok",
      uptime: process.uptime(),
    },
    timestamp: new Date().toISOString(),
  };
  res.json(body);
});

export default router;
