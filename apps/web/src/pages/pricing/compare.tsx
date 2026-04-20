/**
 * apps/web/src/pages/pricing/compare.tsx
 *
 * Compare Plans page — /pricing/compare
 *
 * Full side-by-side feature comparison table.
 */

import { PRICING_PLANS, PLAN_ORDER } from '@ek/config';
import { ComparisonTable } from '../../components/pricing/ComparisonTable';

export function ComparePlansPage() {
  const plans = PLAN_ORDER.map((id) => PRICING_PLANS[id]);

  // TODO: get currentPlanId from auth context
  const currentPlanId: string | undefined = undefined;

  function handleSelectPlan(planId: string) {
    // TODO: check auth — redirect to /login if not signed in
    // TODO: route to upgrade flow for paid plans
    console.log('Plan selected from comparison:', planId);
  }

  return (
    <div className="compare-plans-page">
      <header className="compare-plans-page__header">
        <h1>Compare Plans</h1>
        <p>See everything that's included in each EK Marketplace plan.</p>
        <a href="/pricing">← Back to pricing overview</a>
      </header>

      <ComparisonTable
        plans={plans}
        currentPlanId={currentPlanId}
        onSelectPlan={handleSelectPlan}
      />
    </div>
  );
}
