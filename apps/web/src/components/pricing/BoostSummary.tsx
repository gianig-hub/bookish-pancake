/**
 * apps/web/src/components/pricing/BoostSummary.tsx
 *
 * BoostSummary — lists the user's active boosts across their listings.
 * Displayed on account/boosts and individual listing pages.
 *
 * TODO: connect to real active-boosts data from API.
 */

import type { BoostType } from '@ek/types';

interface ActiveBoostDisplay {
  id: string;
  listingTitle: string;
  boostType: BoostType;
  expiresAt: string;
}

interface BoostSummaryProps {
  activeBoosts: ActiveBoostDisplay[];
  onPurchaseBoost: () => void;
}

export function BoostSummary({ activeBoosts, onPurchaseBoost }: BoostSummaryProps) {
  return (
    <div className="boost-summary">
      <div className="boost-summary__header">
        <h3 className="boost-summary__title">Active Boosts</h3>
        <button className="boost-summary__add-btn" onClick={onPurchaseBoost}>
          + Add Boost
        </button>
      </div>

      {activeBoosts.length === 0 ? (
        <p className="boost-summary__empty">
          No active boosts. Boost a listing to increase its visibility.
        </p>
      ) : (
        <ul className="boost-summary__list">
          {activeBoosts.map((item) => (
            <li key={item.id} className="boost-summary__item">
              <div className="boost-summary__listing-title">{item.listingTitle}</div>
              <div className="boost-summary__boost-name">{item.boostType.name}</div>
              <div className="boost-summary__expires">
                Expires {new Date(item.expiresAt).toLocaleDateString('en-GB')}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
