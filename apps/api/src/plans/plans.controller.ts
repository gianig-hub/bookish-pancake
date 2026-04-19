/**
 * apps/api/src/plans/plans.controller.ts
 *
 * Plans controller — HTTP handlers for plan-related endpoints.
 * Framework-agnostic handler signatures; wire into your router of choice.
 */

import { plansService } from './plans.service';
import type { PricingPlanId } from '@ek/types';

export const plansController = {
  /**
   * GET /api/plans
   * Returns all available pricing plans.
   */
  listPlans() {
    return {
      success: true,
      data: plansService.getAllPlans(),
    };
  },

  /**
   * GET /api/plans/:id
   * Returns a single plan by ID.
   */
  getPlan(id: string) {
    const plan = plansService.getPlanById(id as PricingPlanId);
    if (!plan) {
      return { success: false, error: 'Plan not found', status: 404 };
    }
    return { success: true, data: plan };
  },
};
