import { Router, Request, Response } from "express";

const router = Router();

/**
 * GET /health
 * Basic liveness probe.
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    ok: true,
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
      // TODO: add DB ping, Redis ping
    },
  });
});

export { router as healthRouter };
