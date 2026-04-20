/**
 * apps/web/src/pages/pricing/index.tsx
 *
 * Pricing Overview page — /pricing
 *
 * Shows all plans as cards with a link to the comparison table.
 * TODO: fetch user's current plan from API when auth is connected.
 */

import { PRICING_PLANS, PLAN_ORDER } from '@ek/config';
import { PlanCard } from '../../components/pricing/PlanCard';

/**
 * PricingPage — main pricing overview.
 *
 * Usage (Next.js / React Router / etc.):
 *   Route: /pricing
 */
export function PricingPage() {
  const plans = PLAN_ORDER.map((id) => PRICING_PLANS[id]);

  // TODO: get currentPlanId from auth context / session
  const currentPlanId: string | undefined = undefined;

  function handleSelectPlan(planId: string) {
    // TODO: check auth — redirect to /login if not signed in
    // TODO: if free plan, assign directly; if paid plan, navigate to /pricing/upgrade/:planId
    console.log('Plan selected:', planId);
  }

  return (
    <div className="pricing-page">
      <header className="pricing-page__header">
        <h1 className="pricing-page__title">Simple, transparent pricing</h1>
        <p className="pricing-page__subtitle">
          Choose the plan that fits how you use EK Marketplace. Upgrade or downgrade any time.
        </p>
      </header>

      <div className="pricing-page__plans">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            currentPlanId={currentPlanId}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </div>

      <div className="pricing-page__compare-link">
        <a href="/pricing/compare">Compare all features →</a>
      </div>
    </div>
  );
}
