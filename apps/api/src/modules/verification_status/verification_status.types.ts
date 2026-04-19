/**
 * apps/api/src/modules/verification_status/verification_status.types.ts
 * Server-side types for the verification_status module — placeholder.
 *
 * TODO: implement full verification workflow (document upload, admin review queue,
 *       status transitions, notification triggers).
 */

import type { VerificationStatus } from '@ek/types';

/** A verification record for a business. */
export interface VerificationRecord {
  id: string;
  businessId: string;
  status: VerificationStatus;
  /** Admin note — visible internally only */
  note?: string;
  /** ISO timestamp of the last status change */
  changedAt: Date;
  /** User ID of the admin who last changed the status */
  changedBy?: string;
}
