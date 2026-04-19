/**
 * apps/web/src/components/pricing/ComparisonTable.tsx
 *
 * ComparisonTable — side-by-side feature comparison across all plans.
 * Framework: React (placeholder TSX).
 *
 * TODO: make responsive (horizontal scroll on mobile).
 */

import type { PricingPlan } from '@ek/types';

interface ComparisonTableProps {
  plans: PricingPlan[];
  currentPlanId?: string;
  onSelectPlan: (planId: string) => void;
}

/** All feature keys in display order (derived from first plan's feature list). */
function getFeatureKeys(plans: PricingPlan[]): Array<{ key: string; label: string }> {
  const first = plans[0];
  if (!first) return [];
  return first.features.map((f) => ({ key: f.key, label: f.label }));
}

export function ComparisonTable({ plans, currentPlanId, onSelectPlan }: ComparisonTableProps) {
  const featureKeys = getFeatureKeys(plans);

  return (
    <div className="comparison-table-wrapper">
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="comparison-table__feature-col">Feature</th>
            {plans.map((plan) => (
              <th
                key={plan.id}
                className={[
                  'comparison-table__plan-col',
                  plan.isRecommended ? 'comparison-table__plan-col--recommended' : '',
                  currentPlanId === plan.id ? 'comparison-table__plan-col--current' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <div>{plan.name}</div>
                <div className="comparison-table__price">{plan.displayPrice}</div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {featureKeys.map(({ key, label }) => (
            <tr key={key} className="comparison-table__row">
              <td className="comparison-table__feature-name">{label}</td>
              {plans.map((plan) => {
                const feature = plan.features.find((f) => f.key === key);
                return (
                  <td key={plan.id} className="comparison-table__cell">
                    {feature?.included ? (
                      <span className="comparison-table__check">
                        {feature.displayValue ?? '✓'}
                      </span>
                    ) : (
                      <span className="comparison-table__cross">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td />
            {plans.map((plan) => (
              <td key={plan.id}>
                {currentPlanId === plan.id ? (
                  <button className="comparison-table__cta comparison-table__cta--current" disabled>
                    Current Plan
                  </button>
                ) : (
                  <button
                    className="comparison-table__cta"
                    onClick={() => onSelectPlan(plan.id)}
                  >
                    {plan.ctaLabel}
                  </button>
                )}
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
