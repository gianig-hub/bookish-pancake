/**
 * apps/web/src/components/pricing/UpgradeCTA.tsx
 *
 * UpgradeCTA — contextual upgrade prompt shown to users on free/lower plans.
 * Used inline on account, listing, and business pages.
 */

import type { PricingPlan } from '@ek/types';

interface UpgradeCTAProps {
  /** The plan being promoted. */
  targetPlan: PricingPlan;
  /** Short message explaining why upgrading is beneficial in this context. */
  message: string;
  onUpgrade: (planId: string) => void;
}

export function UpgradeCTA({ targetPlan, message, onUpgrade }: UpgradeCTAProps) {
  return (
    <div className="upgrade-cta">
      <div className="upgrade-cta__content">
        <p className="upgrade-cta__message">{message}</p>
        <p className="upgrade-cta__plan-info">
          Upgrade to <strong>{targetPlan.name}</strong> for{' '}
          <strong>{targetPlan.displayPrice}</strong>
        </p>
      </div>
      <button
        className="upgrade-cta__button"
        onClick={() => onUpgrade(targetPlan.id)}
      >
        {targetPlan.ctaLabel}
      </button>
    </div>
  );
}
