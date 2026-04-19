import { Router, Request, Response } from "express";
import type { ApiResponse } from "@ek/types";
import { ROLES } from "@ek/config";

const router = Router();

/**
 * GET /roles
 * Returns the list of available roles.
 * Unauthenticated – safe to expose role names publicly.
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    ok: true,
    data: { roles: Object.values(ROLES) },
  } satisfies ApiResponse);
});

export { router as rolesRouter };
