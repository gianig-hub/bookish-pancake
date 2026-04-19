/**
 * Categories router – MVP shell
 * Returns the available listing categories and their labels.
 * TODO: move to DB-driven categories once admin management is built (Phase 2).
 */

import { Router, Request, Response } from 'express';
import {
  CATEGORY_OPTIONS,
  EQUIPMENT_CATEGORIES,
  SERVICE_CATEGORIES,
  CATEGORY_LABELS,
} from '@ek/config';
import { ListingCategory } from '@ek/types';

const router = Router();

/**
 * GET /categories
 * Return all categories grouped by type.
 */
router.get('/', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    data: {
      equipment: EQUIPMENT_CATEGORIES.map((value: ListingCategory) => ({
        value,
        label: CATEGORY_LABELS[value],
      })),
      services: SERVICE_CATEGORIES.map((value: ListingCategory) => ({
        value,
        label: CATEGORY_LABELS[value],
      })),
      all: CATEGORY_OPTIONS,
    },
  });
});

export default router;
