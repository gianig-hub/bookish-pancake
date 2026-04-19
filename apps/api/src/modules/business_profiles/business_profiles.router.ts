/**
 * apps/api/src/modules/business_profiles/business_profiles.router.ts
 * Express router for the /businesses/:businessId/profile resource — MVP shell.
 *
 * TODO: add authentication + ownership-check middleware.
 * TODO: add input validation (zod / class-validator).
 */

import { Router, Request, Response } from 'express';
import { BusinessProfilesService } from './business_profiles.service';
import type { CreateBusinessProfileDto, UpdateBusinessProfileDto } from './business_profiles.types';

// Mounted at /businesses/:businessId/profile in the main router
const router = Router({ mergeParams: true });

// GET /businesses/:businessId/profile
router.get('/', async (req: Request, res: Response) => {
  const profile = await BusinessProfilesService.findByBusinessId(req.params.businessId);
  if (!profile) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }
  res.json({ data: profile });
});

// POST /businesses/:businessId/profile
router.post('/', async (req: Request, res: Response) => {
  const dto: CreateBusinessProfileDto = {
    businessId: req.params.businessId,
    ...req.body,
    servicesOffered: req.body.servicesOffered ?? [],
    equipmentCategories: req.body.equipmentCategories ?? [],
    serviceAreas: req.body.serviceAreas ?? [],
    contactDetails: req.body.contactDetails ?? {},
  };

  const profile = await BusinessProfilesService.create(dto);
  res.status(201).json({ data: profile });
});

// PATCH /businesses/:businessId/profile/:id
router.patch('/:id', async (req: Request, res: Response) => {
  const dto = req.body as UpdateBusinessProfileDto;
  const updated = await BusinessProfilesService.update(req.params.id, dto);
  if (!updated) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }
  res.json({ data: updated });
});

// POST /businesses/:businessId/profile/:id/publish
router.post('/:id/publish', async (req: Request, res: Response) => {
  // TODO: run server-side completion checks before allowing publish
  const published = await BusinessProfilesService.publish(req.params.id);
  if (!published) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }
  res.json({ data: published });
});

// POST /businesses/:businessId/profile/:id/unpublish
router.post('/:id/unpublish', async (req: Request, res: Response) => {
  const unpublished = await BusinessProfilesService.unpublish(req.params.id);
  if (!unpublished) {
    res.status(404).json({ error: 'Profile not found' });
    return;
  }
  res.json({ data: unpublished });
});

export default router;
