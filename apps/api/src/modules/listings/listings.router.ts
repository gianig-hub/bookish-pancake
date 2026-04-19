/**
 * Listings router – MVP shell
 * TODO: Connect to database (PostgreSQL via Prisma/Drizzle) in Phase 2.
 */

import { Router, Request, Response } from 'express';
import { validateListingDraft } from './listings.validation';
import { ListingDraft, ListingStatus } from './listings.types';
import { randomUUID } from 'crypto';

const router = Router();

/**
 * POST /listings/draft
 * Accept a listing draft, validate it, and store it (placeholder).
 */
router.post('/draft', (req: Request, res: Response) => {
  const draft: ListingDraft = req.body?.draft;

  if (!draft || typeof draft !== 'object') {
    return res.status(400).json({ success: false, errors: [{ field: 'draft', message: 'Request body must contain a draft object.' }] });
  }

  const errors = validateListingDraft(draft);
  if (errors.length > 0) {
    return res.status(422).json({ success: false, errors });
  }

  // TODO: persist to database
  const record = {
    ...draft,
    id: randomUUID(),
    status: ListingStatus.DRAFT,
    userId: (req as Request & { userId?: string }).userId ?? 'anonymous', // TODO: extract from auth middleware
    photos: draft.photos ?? [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return res.status(201).json({ success: true, data: record });
});

/**
 * GET /listings
 * List active listings (placeholder – returns empty array).
 * TODO: implement DB query with pagination, filtering, sorting.
 */
router.get('/', (_req: Request, res: Response) => {
  // TODO: replace with real DB query
  return res.json({
    success: true,
    data: [],
    pagination: { page: 1, perPage: 20, total: 0 },
  });
});

/**
 * GET /listings/:id
 * Fetch a single listing by ID (placeholder).
 * TODO: implement DB lookup.
 */
router.get('/:id', (req: Request, res: Response) => {
  // TODO: replace with real DB lookup
  return res.status(404).json({ success: false, message: `Listing ${req.params.id} not found.` });
});

export default router;
