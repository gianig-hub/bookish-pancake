/**
 * apps/web/src/pages/pricing/current-plan.tsx
 *
 * Current Plan page — /account/plan
 *
 * Shows the user's active subscription and allows them to manage it.
 * Placeholder — requires auth and billing integration.
 *
 * TODO: fetch real subscription data from /api/subscriptions/:userId
 * TODO: connect upgrade/cancel actions to billing API
 */

import { PRICING_PLANS } from '@ek/config';
import { SubscriptionSummary } from '../../components/pricing/SubscriptionSummary';
import type { UserSubscription } from '@ek/types';

// Placeholder data — replace with API call
const PLACEHOLDER_SUBSCRIPTION: UserSubscription = {
  userId: 'placeholder-user',
  planId: 'buyer_free',
  status: 'none',
  currentPeriodEnd: null,
};

export function CurrentPlanPage() {
  const subscription = PLACEHOLDER_SUBSCRIPTION; // TODO: load from API
  const plan = PRICING_PLANS[subscription.planId];

  function handleManage() {
    // TODO: route to upgrade/downgrade page or open billing portal
    console.log('Manage subscription clicked');
  }

  return (
    <div className="current-plan-page">
      <header className="current-plan-page__header">
        <h1>Your Plan</h1>
        <p>Manage your EK Marketplace subscription.</p>
      </header>

      <SubscriptionSummary
        subscription={subscription}
        plan={plan}
        onManage={handleManage}
      />

      <div className="current-plan-page__actions">
        <a href="/pricing" className="current-plan-page__view-all-link">
          View all plans →
        </a>
        {plan.isPaid && (
          <a href="/pricing/upgrade" className="current-plan-page__upgrade-link">
            Change plan →
          </a>
        )}
      </div>
    </div>
  );
}
