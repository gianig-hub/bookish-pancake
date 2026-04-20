/**
 * apps/web/src/components/pricing/SubscriptionSummary.tsx
 *
 * SubscriptionSummary — shows the user's current plan and renewal date.
 * Displayed on account/billing pages.
 *
 * TODO: connect to real subscription data once billing is live.
 */

import type { UserSubscription, PricingPlan } from '@ek/types';

interface SubscriptionSummaryProps {
  subscription: UserSubscription;
  plan: PricingPlan;
  onManage: () => void;
}

export function SubscriptionSummary({ subscription, plan, onManage }: SubscriptionSummaryProps) {
  const renewalLabel = subscription.currentPeriodEnd
    ? `Renews ${new Date(subscription.currentPeriodEnd).toLocaleDateString('en-GB')}`
    : 'No renewal — free plan';

  const statusLabel: Record<string, string> = {
    active: 'Active',
    trialing: 'Trial',
    past_due: 'Payment overdue',
    cancelled: 'Cancelled',
    expired: 'Expired',
    none: 'Free',
  };

  return (
    <div className="subscription-summary">
      <div className="subscription-summary__plan">
        <span className="subscription-summary__plan-name">{plan.name}</span>
        <span className="subscription-summary__plan-price">{plan.displayPrice}</span>
      </div>

      <div className="subscription-summary__status">
        <span
          className={`subscription-summary__badge subscription-summary__badge--${subscription.status}`}
        >
          {statusLabel[subscription.status] ?? subscription.status}
        </span>
        <span className="subscription-summary__renewal">{renewalLabel}</span>
      </div>

      <button className="subscription-summary__manage-btn" onClick={onManage}>
        Manage subscription
      </button>
    </div>
  );
}
