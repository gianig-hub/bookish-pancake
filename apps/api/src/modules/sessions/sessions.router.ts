import { Router, Request, Response } from "express";
import type { ApiResponse } from "@ek/types";
import { authenticate } from "../../middleware/auth.js";

const router = Router();

/**
 * GET /sessions
 * Returns active sessions for the authenticated user.
 * TODO: query Redis/DB for sessions belonging to req.user.id.
 */
router.get("/", authenticate, (_req: Request, res: Response) => {
  // TODO: list sessions from Redis
  res.json({
    ok: true,
    data: { sessions: [], message: "TODO: implement session list" },
  } satisfies ApiResponse);
});

/**
 * DELETE /sessions/:sessionId
 * Revoke a specific session.
 * TODO: remove session from Redis, ensuring user can only revoke their own.
 */
router.delete("/:sessionId", authenticate, (req: Request, res: Response) => {
  const { sessionId } = req.params as { sessionId: string };
  // TODO: delete session from Redis
  res.json({
    ok: true,
    data: { sessionId, message: "TODO: implement session revocation" },
  } satisfies ApiResponse);
});

export { router as sessionsRouter };
