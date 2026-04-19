/**
 * apps/api/src/boosts/boosts.service.ts
 *
 * Boosts service — manages listing boost purchases and active boosts.
 *
 * MVP: in-memory store only.
 * TODO: persist boosts to database.
 * TODO: integrate payment step before activating a boost.
 * TODO: implement boost expiry job (cron/queue worker).
 */

import { BOOST_TYPES, BOOST_ORDER } from '@ek/config';
import type { BoostType, BoostTypeId } from '@ek/types';

// ---------------------------------------------------------------------------
// Types (local to service — extend to shared types as needed)
// ---------------------------------------------------------------------------

interface ActiveBoost {
  id: string;
  listingId: string;
  userId: string;
  boostTypeId: BoostTypeId;
  activatedAt: string;
  expiresAt: string;
}

// ---------------------------------------------------------------------------
// In-memory store (MVP placeholder — not persistent)
// ---------------------------------------------------------------------------

let nextBoostId = 1;
const activeBoosts: ActiveBoost[] = [];

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

export class BoostsService {
  /** Return all available boost types in display order. */
  getAllBoostTypes(): BoostType[] {
    return BOOST_ORDER.map((id) => BOOST_TYPES[id]);
  }

  /** Return a single boost type by ID. */
  getBoostTypeById(id: BoostTypeId): BoostType | null {
    return BOOST_TYPES[id] ?? null;
  }

  /** Return all active boosts for a listing. */
  getActiveBoostsForListing(listingId: string): ActiveBoost[] {
    const now = new Date();
    return activeBoosts.filter(
      (b) => b.listingId === listingId && new Date(b.expiresAt) > now,
    );
  }

  /** Return all active boosts for a user. */
  getActiveBoostsForUser(userId: string): ActiveBoost[] {
    const now = new Date();
    return activeBoosts.filter(
      (b) => b.userId === userId && new Date(b.expiresAt) > now,
    );
  }

  /**
   * Activate a boost for a listing.
   * MVP: no payment check.
   * TODO: gate behind successful payment before calling this method.
   */
  activateBoost(userId: string, listingId: string, boostTypeId: BoostTypeId): ActiveBoost {
    const boostType = BOOST_TYPES[boostTypeId];
    const now = new Date();
    const expiresAt = new Date(now.getTime() + boostType.durationDays * 24 * 60 * 60 * 1000);

    const boost: ActiveBoost = {
      id: String(nextBoostId++),
      listingId,
      userId,
      boostTypeId,
      activatedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    activeBoosts.push(boost);
    return boost;
  }
}

export const boostsService = new BoostsService();
