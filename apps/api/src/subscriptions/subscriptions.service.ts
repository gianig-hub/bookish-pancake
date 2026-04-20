/**
 * apps/api/src/subscriptions/subscriptions.service.ts
 *
 * Subscriptions service — manages user plan subscriptions.
 *
 * MVP: in-memory store only. No real billing or Stripe integration yet.
 * TODO: replace in-memory store with database persistence.
 * TODO: integrate with Stripe (or chosen payment provider) for billing lifecycle.
 */

import type { PricingPlanId, SubscriptionStatus, UserSubscription } from '@ek/types';

// ---------------------------------------------------------------------------
// In-memory store (MVP placeholder — not persistent)
// ---------------------------------------------------------------------------

const subscriptionStore = new Map<string, UserSubscription>();

export class SubscriptionsService {
  /**
   * Get the active subscription for a user.
   * Returns a free-plan placeholder if no subscription exists.
   */
  getSubscription(userId: string): UserSubscription {
    return (
      subscriptionStore.get(userId) ?? {
        userId,
        planId: 'buyer_free',
        status: 'none',
        currentPeriodEnd: null,
      }
    );
  }

  /**
   * Assign a plan to a user.
   * MVP: no payment check. TODO: gate behind payment success event from billing provider.
   */
  assignPlan(userId: string, planId: PricingPlanId): UserSubscription {
    const subscription: UserSubscription = {
      userId,
      planId,
      status: planId === 'buyer_free' || planId === 'private_seller_free' ? 'none' : 'active',
      currentPeriodEnd:
        planId === 'buyer_free' || planId === 'private_seller_free'
          ? null
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
    subscriptionStore.set(userId, subscription);
    return subscription;
  }

  /**
   * Cancel a user's paid subscription (downgrade to buyer_free).
   * TODO: handle proration and end-of-period access when billing is live.
   */
  cancelSubscription(userId: string): UserSubscription {
    return this.assignPlan(userId, 'buyer_free');
  }

  /**
   * Update subscription status (e.g. from webhook).
   * TODO: wire to payment provider webhook handlers.
   */
  updateStatus(userId: string, status: SubscriptionStatus): UserSubscription | null {
    const existing = subscriptionStore.get(userId);
    if (!existing) return null;
    const updated: UserSubscription = { ...existing, status };
    subscriptionStore.set(userId, updated);
    return updated;
  }
}

export const subscriptionsService = new SubscriptionsService();
