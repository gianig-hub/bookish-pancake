/**
 * apps/api/src/plans/plans.service.ts
 *
 * Plans service — returns plan definitions from config.
 * MVP: reads from static config. TODO: load overrides from DB when billing is live.
 */

import {
  PRICING_PLANS,
  PLAN_ORDER,
  DEFAULT_ENTITLEMENTS,
} from '@ek/config';
import type { PricingPlan, PricingPlanId, UserEntitlements } from '@ek/types';

export class PlansService {
  /** Return all plans in display order. */
  getAllPlans(): PricingPlan[] {
    return PLAN_ORDER.map((id) => PRICING_PLANS[id]);
  }

  /** Return a single plan by ID. */
  getPlanById(id: PricingPlanId): PricingPlan | null {
    return PRICING_PLANS[id] ?? null;
  }

  /**
   * Return default entitlements for a plan.
   * TODO: merge with active subscription record once billing is wired up.
   */
  getEntitlementsForPlan(planId: PricingPlanId): UserEntitlements {
    return DEFAULT_ENTITLEMENTS[planId];
  }
}

export const plansService = new PlansService();
