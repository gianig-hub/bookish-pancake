/**
 * apps/api/src/entitlements/entitlements.service.ts
 *
 * Entitlements service — checks what a user is allowed to do based on their plan.
 *
 * MVP: derives entitlements from static config + in-memory subscription store.
 * TODO: once billing is live, validate subscription status against DB record.
 * TODO: add caching layer (Redis) for high-frequency entitlement checks.
 */

import { DEFAULT_ENTITLEMENTS } from '@ek/config';
import { subscriptionsService } from '../subscriptions/subscriptions.service';
import type { UserEntitlements } from '@ek/types';

export class EntitlementsService {
  /**
   * Get entitlements for a user based on their active subscription.
   * Falls back to buyer_free entitlements if no subscription found.
   */
  getEntitlements(userId: string): UserEntitlements {
    const subscription = subscriptionsService.getSubscription(userId);
    // TODO: check subscription.status === 'active' before granting paid features
    return DEFAULT_ENTITLEMENTS[subscription.planId] ?? DEFAULT_ENTITLEMENTS['buyer_free'];
  }

  /**
   * Check whether a user can create more listings.
   * @param userId - user to check
   * @param currentActiveListingCount - number of listings the user currently has active
   */
  canCreateListing(userId: string, currentActiveListingCount: number): boolean {
    const entitlements = this.getEntitlements(userId);
    if (entitlements.maxActiveListings === 0) return false;
    // Infinity represents unlimited
    if (!isFinite(entitlements.maxActiveListings)) return true;
    return currentActiveListingCount < entitlements.maxActiveListings;
  }

  /**
   * Check whether a user can purchase/apply a boost.
   */
  canBoostListing(userId: string): boolean {
    return this.getEntitlements(userId).canBoostListings;
  }

  /**
   * Check whether a user has access to business profile features.
   */
  hasBusinessProfile(userId: string): boolean {
    return this.getEntitlements(userId).hasBusinessProfile;
  }
}

export const entitlementsService = new EntitlementsService();
