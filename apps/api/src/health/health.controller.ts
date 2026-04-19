/**
 * EK Marketplace — Health Check Controller
 * ------------------------------------------
 * GET /health — returns service status.
 * Used by Docker healthchecks and uptime monitors.
 */

import { Router } from 'express';
import type { Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'ek-api',
    // TODO: Add DB and Redis connectivity checks here
  });
});
