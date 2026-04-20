/**
 * apps/api/src/boosts/boosts.controller.ts
 *
 * Boosts controller — HTTP handlers for boost endpoints.
 */

import { boostsService } from './boosts.service';
import type { BoostTypeId } from '@ek/types';

const VALID_BOOST_IDS: BoostTypeId[] = [
  'bump_up',
  'urgent',
  'featured',
  'top_of_category',
  'homepage_spotlight',
];

export const boostsController = {
  /**
   * GET /api/boosts
   * Returns all available boost types.
   */
  listBoostTypes() {
    return {
      success: true,
      data: boostsService.getAllBoostTypes(),
    };
  },

  /**
   * GET /api/boosts/:id
   * Returns a single boost type by ID.
   */
  getBoostType(id: string) {
    const boost = boostsService.getBoostTypeById(id as BoostTypeId);
    if (!boost) {
      return { success: false, error: 'Boost type not found', status: 404 };
    }
    return { success: true, data: boost };
  },

  /**
   * GET /api/listings/:listingId/boosts
   * Returns active boosts for a listing.
   */
  getActiveBoostsForListing(listingId: string) {
    return {
      success: true,
      data: boostsService.getActiveBoostsForListing(listingId),
    };
  },

  /**
   * GET /api/users/:userId/boosts
   * Returns all active boosts for a user.
   */
  getActiveBoostsForUser(userId: string) {
    return {
      success: true,
      data: boostsService.getActiveBoostsForUser(userId),
    };
  },

  /**
   * POST /api/listings/:listingId/boosts
   * Body: { userId: string, boostTypeId: BoostTypeId }
   *
   * TODO: initiate payment before activating boost.
   * Currently activates boost directly (MVP — no payment gate).
   */
  purchaseBoost(listingId: string, userId: string, boostTypeId: string) {
    if (!VALID_BOOST_IDS.includes(boostTypeId as BoostTypeId)) {
      return { success: false, error: 'Invalid boost type ID', status: 400 };
    }
    // TODO: check user entitlements (canBoostListings) before allowing purchase
    // TODO: initiate Stripe payment intent and return client secret
    const boost = boostsService.activateBoost(userId, listingId, boostTypeId as BoostTypeId);
    return { success: true, data: boost };
  },
};
