/**
 * apps/web/src/pages/pricing/upgrade.tsx
 *
 * Upgrade / Downgrade page — /pricing/upgrade
 *
 * Guides the user through selecting a new plan and initiating purchase.
 * Placeholder — real payment flow is not yet implemented.
 *
 * TODO: pre-select target plan if navigated from an upgrade CTA
 * TODO: integrate Stripe checkout / payment intent
 * TODO: handle downgrade logic (pro-rata, end-of-period)
 */

import { useState } from 'react';
import { PRICING_PLANS, PLAN_ORDER } from '@ek/config';
import { PlanCard } from '../../components/pricing/PlanCard';
import { PurchaseFlow } from '../../components/pricing/PurchaseFlow';
import type { PricingPlan } from '@ek/types';

export function UpgradePage() {
  const plans = PLAN_ORDER.map((id) => PRICING_PLANS[id]).filter((p) => p.isPaid);

  // TODO: load current plan from auth context
  const currentPlanId: string | undefined = undefined;

  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  function handleSelectPlan(planId: string) {
    setSelectedPlan(PRICING_PLANS[planId as keyof typeof PRICING_PLANS] ?? null);
  }

  function handleCancelPurchase() {
    setSelectedPlan(null);
  }

  function handleConfirmPurchase() {
    // TODO: initiate Stripe checkout session
    // TODO: redirect to payment page or show payment elements
    console.log('TODO: payment not yet implemented for plan:', selectedPlan?.id);
  }

  if (selectedPlan) {
    return (
      <PurchaseFlow
        purchaseItem={{ type: 'plan', item: selectedPlan }}
        onConfirm={handleConfirmPurchase}
        onCancel={handleCancelPurchase}
      />
    );
  }

  return (
    <div className="upgrade-page">
      <header className="upgrade-page__header">
        <h1>Upgrade Your Plan</h1>
        <p>Choose a plan below to unlock more listings, boosts, and business features.</p>
        <a href="/account/plan">← Back to current plan</a>
      </header>

      <div className="upgrade-page__plans">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            currentPlanId={currentPlanId}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </div>

      <div className="upgrade-page__compare-link">
        <a href="/pricing/compare">Compare all plans →</a>
      </div>
    </div>
  );
}
