/**
 * apps/api/src/modules/verification_status/verification_status.service.ts
 * Verification status service — placeholder shell.
 *
 * All businesses start as 'unverified'. Status transitions are admin-controlled.
 *
 * TODO: implement document upload, review queue, email notifications, and
 *       automated checks (Companies House lookup, FGas register, etc.).
 */

import type { VerificationRecord } from './verification_status.types';
import type { VerificationStatus } from '@ek/types';

const store = new Map<string, VerificationRecord>();

function generateId(): string {
  return `vr_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export const VerificationStatusService = {
  /** Get the current verification record for a business. */
  async findByBusinessId(businessId: string): Promise<VerificationRecord | undefined> {
    return Array.from(store.values()).find((r) => r.businessId === businessId);
  },

  /** Initialise a new verification record (called when a business is created). */
  async initForBusiness(businessId: string): Promise<VerificationRecord> {
    const existing = await this.findByBusinessId(businessId);
    if (existing) return existing;

    const id = generateId();
    const record: VerificationRecord = {
      id,
      businessId,
      status: 'unverified',
      changedAt: new Date(),
    };
    store.set(id, record);
    return record;
  },

  /**
   * Update the verification status for a business.
   * TODO: restrict to admin users only; add status-transition validation.
   */
  async updateStatus(
    businessId: string,
    status: VerificationStatus,
    changedBy?: string,
    note?: string,
  ): Promise<VerificationRecord | undefined> {
    const existing = await this.findByBusinessId(businessId);
    if (!existing) return undefined;

    const updated: VerificationRecord = {
      ...existing,
      status,
      note,
      changedBy,
      changedAt: new Date(),
    };
    store.set(existing.id, updated);
    return updated;
  },
};
