/**
 * apps/api/src/modules/businesses/businesses.router.ts
 * Express router for the /businesses resource — MVP shell.
 *
 * TODO: add authentication middleware (JWT / session) before all write routes.
 * TODO: add input validation (zod or class-validator).
 * TODO: add pagination to GET /businesses.
 */

import { Router, Request, Response } from 'express';
import { BusinessesService } from './businesses.service';
import type { CreateBusinessDto, UpdateBusinessDto } from './businesses.types';

const router = Router();

// GET /businesses — list all businesses
router.get('/', async (_req: Request, res: Response) => {
  const businesses = await BusinessesService.findAll();
  res.json({ data: businesses });
});

// GET /businesses/:id — get single business
router.get('/:id', async (req: Request, res: Response) => {
  const business = await BusinessesService.findById(req.params.id);
  if (!business) {
    res.status(404).json({ error: 'Business not found' });
    return;
  }
  res.json({ data: business });
});

// POST /businesses — create a new business
router.post('/', async (req: Request, res: Response) => {
  // TODO: extract ownerId from authenticated session
  const ownerId = (req as unknown as { user?: { id: string } }).user?.id ?? 'anonymous';
  const dto = req.body as CreateBusinessDto;

  if (!dto.businessName || !dto.businessType) {
    res.status(400).json({ error: 'businessName and businessType are required' });
    return;
  }

  const business = await BusinessesService.create(ownerId, dto);
  res.status(201).json({ data: business });
});

// PATCH /businesses/:id — update a business
router.patch('/:id', async (req: Request, res: Response) => {
  const dto = req.body as UpdateBusinessDto;
  const updated = await BusinessesService.update(req.params.id, dto);
  if (!updated) {
    res.status(404).json({ error: 'Business not found' });
    return;
  }
  res.json({ data: updated });
});

// DELETE /businesses/:id — delete a business
router.delete('/:id', async (req: Request, res: Response) => {
  const deleted = await BusinessesService.remove(req.params.id);
  if (!deleted) {
    res.status(404).json({ error: 'Business not found' });
    return;
  }
  res.status(204).send();
});

export default router;
