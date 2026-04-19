/**
 * apps/web/src/components/pricing/PurchaseFlow.tsx
 *
 * PurchaseFlow — placeholder purchase/checkout UI component.
 * Shown when a user selects a plan or boost to purchase.
 *
 * TODO: replace with real Stripe Checkout or Elements integration.
 * TODO: add loading, error, and success states.
 */

import type { PricingPlan, BoostType } from '@ek/types';

type PurchaseItem =
  | { type: 'plan'; item: PricingPlan }
  | { type: 'boost'; item: BoostType };

interface PurchaseFlowProps {
  purchaseItem: PurchaseItem;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PurchaseFlow({ purchaseItem, onConfirm, onCancel }: PurchaseFlowProps) {
  const name =
    purchaseItem.type === 'plan'
      ? purchaseItem.item.name
      : purchaseItem.item.name;

  const price =
    purchaseItem.type === 'plan'
      ? purchaseItem.item.displayPrice
      : purchaseItem.item.displayPrice;

  const description =
    purchaseItem.type === 'plan'
      ? purchaseItem.item.tagline
      : purchaseItem.item.description;

  return (
    <div className="purchase-flow">
      <div className="purchase-flow__header">
        <h2 className="purchase-flow__title">
          {purchaseItem.type === 'plan' ? 'Upgrade Plan' : 'Purchase Boost'}
        </h2>
      </div>

      <div className="purchase-flow__item-summary">
        <div className="purchase-flow__item-name">{name}</div>
        <div className="purchase-flow__item-description">{description}</div>
        <div className="purchase-flow__item-price">{price}</div>
      </div>

      {/* TODO: payment method fields (Stripe Elements or redirect to Stripe Checkout) */}
      <div className="purchase-flow__payment-placeholder">
        <p className="purchase-flow__payment-note">
          💳 Payment integration coming soon.
        </p>
        <p className="purchase-flow__payment-note purchase-flow__payment-note--small">
          TODO: Integrate Stripe Checkout or Payment Elements here.
        </p>
      </div>

      <div className="purchase-flow__actions">
        <button className="purchase-flow__cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="purchase-flow__confirm-btn purchase-flow__confirm-btn--disabled"
          onClick={onConfirm}
          disabled
          title="Payment not yet implemented"
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
}
