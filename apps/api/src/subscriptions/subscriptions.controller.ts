/**
 * apps/api/src/subscriptions/subscriptions.controller.ts
 *
 * Subscriptions controller — HTTP handlers for subscription endpoints.
 */

import { subscriptionsService } from './subscriptions.service';
import type { PricingPlanId } from '@ek/types';

export const subscriptionsController = {
  /**
   * GET /api/subscriptions/:userId
   * Returns the current subscription for a user.
   */
  getSubscription(userId: string) {
    return {
      success: true,
      data: subscriptionsService.getSubscription(userId),
    };
  },

  /**
   * POST /api/subscriptions/:userId/upgrade
   * Body: { planId: PricingPlanId }
   *
   * TODO: this must trigger a payment flow before assigning the plan.
   * For MVP, plan is assigned directly (no real payment check).
   */
  upgradePlan(userId: string, planId: string) {
    const validPlanIds: PricingPlanId[] = [
      'buyer_free',
      'private_seller_free',
      'seller_plus',
      'trader_pro',
      'dealer_business',
    ];
    if (!validPlanIds.includes(planId as PricingPlanId)) {
      return { success: false, error: 'Invalid plan ID', status: 400 };
    }
    // TODO: initiate Stripe checkout session here and return checkout URL
    const subscription = subscriptionsService.assignPlan(userId, planId as PricingPlanId);
    return { success: true, data: subscription };
  },

  /**
   * POST /api/subscriptions/:userId/cancel
   * Cancels the current paid subscription.
   */
  cancelSubscription(userId: string) {
    const subscription = subscriptionsService.cancelSubscription(userId);
    return { success: true, data: subscription };
  },
};
