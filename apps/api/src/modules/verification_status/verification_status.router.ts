/**
 * apps/api/src/modules/verification_status/verification_status.router.ts
 * Express router for the verification_status resource — placeholder shell.
 *
 * TODO: add admin-only auth middleware for status-change endpoints.
 * TODO: add full review workflow (submit docs, approve/reject, notify).
 */

import { Router, Request, Response } from 'express';
import { VerificationStatusService } from './verification_status.service';
import type { VerificationStatus } from '@ek/types';

const router = Router({ mergeParams: true });

// GET /businesses/:businessId/verification
router.get('/', async (req: Request, res: Response) => {
  const record = await VerificationStatusService.findByBusinessId(req.params.businessId);
  if (!record) {
    res.status(404).json({ error: 'Verification record not found' });
    return;
  }
  res.json({ data: record });
});

// PATCH /businesses/:businessId/verification — admin only (placeholder)
router.patch('/', async (req: Request, res: Response) => {
  // TODO: enforce admin-only access
  const { status, note } = req.body as { status: VerificationStatus; note?: string };

  if (!status) {
    res.status(400).json({ error: 'status is required' });
    return;
  }

  const updated = await VerificationStatusService.updateStatus(
    req.params.businessId,
    status,
    undefined, // TODO: pass authenticated admin user ID
    note,
  );

  if (!updated) {
    res.status(404).json({ error: 'Verification record not found' });
    return;
  }

  res.json({ data: updated });
});

export default router;
