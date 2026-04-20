/**
 * apps/web/src/components/pricing/PlanCard.tsx
 *
 * PlanCard — displays a single pricing plan with its features and CTA.
 * Framework: React (placeholder TSX — wire into your chosen framework).
 *
 * TODO: connect CTA button to upgrade flow / auth check.
 */

import type { PricingPlan } from '@ek/types';

interface PlanCardProps {
  plan: PricingPlan;
  /** The user's current plan ID (if known). */
  currentPlanId?: string;
  onSelectPlan: (planId: string) => void;
}

/**
 * PlanCard component — renders a pricing plan card.
 *
 * Usage:
 *   <PlanCard plan={plan} currentPlanId={user.planId} onSelectPlan={handleSelect} />
 */
export function PlanCard({ plan, currentPlanId, onSelectPlan }: PlanCardProps) {
  const isCurrent = currentPlanId === plan.id;

  return (
    <div
      className={[
        'plan-card',
        plan.isRecommended ? 'plan-card--recommended' : '',
        isCurrent ? 'plan-card--current' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {plan.isRecommended && (
        <div className="plan-card__badge">Most Popular</div>
      )}

      <div className="plan-card__header">
        <h3 className="plan-card__name">{plan.name}</h3>
        <p className="plan-card__tagline">{plan.tagline}</p>
        <div className="plan-card__price">{plan.displayPrice}</div>
      </div>

      <ul className="plan-card__features">
        {plan.features.map((feature) => (
          <li
            key={feature.key}
            className={`plan-card__feature ${feature.included ? 'plan-card__feature--included' : 'plan-card__feature--excluded'}`}
          >
            <span className="plan-card__feature-icon">
              {feature.included ? '✓' : '✗'}
            </span>
            <span className="plan-card__feature-label">{feature.label}</span>
            {feature.displayValue && (
              <span className="plan-card__feature-value">{feature.displayValue}</span>
            )}
          </li>
        ))}
      </ul>

      <div className="plan-card__footer">
        {isCurrent ? (
          <button className="plan-card__cta plan-card__cta--current" disabled>
            Current Plan
          </button>
        ) : (
          <button
            className="plan-card__cta"
            onClick={() => onSelectPlan(plan.id)}
          >
            {plan.ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}
