/**
 * apps/api/src/modules/service_areas/service_areas.router.ts
 * Express router for business profile service areas — MVP shell.
 *
 * Mounted at /businesses/:businessId/profile/:profileId/service-areas
 *
 * TODO: add auth middleware.
 * TODO: validate area slugs against canonical list.
 */

import { Router, Request, Response } from 'express';
import { ServiceAreasService } from './service_areas.service';

const router = Router({ mergeParams: true });

// GET /.../:profileId/service-areas
router.get('/', async (req: Request, res: Response) => {
  const areas = await ServiceAreasService.findByProfileId(req.params.profileId);
  res.json({ data: areas });
});

// PUT /.../:profileId/service-areas — replace the full set
router.put('/', async (req: Request, res: Response) => {
  const { areas } = req.body as { areas: Array<{ label: string; slug: string }> };

  if (!Array.isArray(areas)) {
    res.status(400).json({ error: 'areas must be an array' });
    return;
  }

  const updated = await ServiceAreasService.set(req.params.profileId, areas);
  res.json({ data: updated });
});

export default router;
