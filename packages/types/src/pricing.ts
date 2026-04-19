/**
 * packages/types/src/pricing.ts
 *
 * Shared types for pricing plans, boosts, subscriptions, and entitlements.
 * MVP-level — extend as billing and entitlement logic is added.
 */

// ---------------------------------------------------------------------------
// Plan IDs
// ---------------------------------------------------------------------------

export type PricingPlanId =
  | 'buyer_free'
  | 'private_seller_free'
  | 'seller_plus'
  | 'trader_pro'
  | 'dealer_business';

// ---------------------------------------------------------------------------
// Plan features
// ---------------------------------------------------------------------------

export interface PlanFeature {
  /** Machine-readable key for the feature. */
  key: string;
  /** Human-readable label. */
  label: string;
  /** Short description shown in comparison table. */
  description?: string;
  /** Whether this feature is available on the plan. */
  included: boolean;
  /** Optional display value (e.g. "10 listings", "Unlimited"). */
  displayValue?: string;
}

// ---------------------------------------------------------------------------
// Pricing plan
// ---------------------------------------------------------------------------

export interface PricingPlan {
  id: PricingPlanId;
  /** Human-readable name. */
  name: string;
  /** Short tagline shown on the plan card. */
  tagline: string;
  /** Monthly price in pence (GBP). 0 = free. */
  monthlyPricePence: number;
  /** Formatted display price, e.g. "Free" or "£9.99/mo". */
  displayPrice: string;
  /** Ordered list of features included in this plan. */
  features: PlanFeature[];
  /** Whether this is a paid plan. */
  isPaid: boolean;
  /** Whether this plan is recommended / highlighted. */
  isRecommended?: boolean;
  /** CTA label for the plan card. */
  ctaLabel: string;
}

// ---------------------------------------------------------------------------
// Boosts
// ---------------------------------------------------------------------------

export type BoostTypeId =
  | 'bump_up'
  | 'urgent'
  | 'featured'
  | 'top_of_category'
  | 'homepage_spotlight';

export interface BoostType {
  id: BoostTypeId;
  /** Human-readable name. */
  name: string;
  /** Short description of what this boost does. */
  description: string;
  /** Duration in days. */
  durationDays: number;
  /** Price in pence (GBP). */
  pricePence: number;
  /** Formatted display price, e.g. "£1.99". */
  displayPrice: string;
}

// ---------------------------------------------------------------------------
// Subscriptions
// ---------------------------------------------------------------------------

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'cancelled'
  | 'expired'
  | 'none';

export interface UserSubscription {
  userId: string;
  planId: PricingPlanId;
  status: SubscriptionStatus;
  /** ISO 8601 date string. Null if free plan. */
  currentPeriodEnd: string | null;
  // TODO: add Stripe subscription ID and payment method details when billing is implemented
}

// ---------------------------------------------------------------------------
// Entitlements (placeholder)
// ---------------------------------------------------------------------------

/**
 * UserEntitlements — what a user is allowed to do based on their active plan.
 *
 * TODO: derive these from the active subscription + plan config once billing is live.
 * For MVP, this is populated from the plan definition in packages/config.
 */
export interface UserEntitlements {
  planId: PricingPlanId;
  /** Maximum number of active listings allowed. */
  maxActiveListings: number;
  /** Whether featured/paid visibility boosts are available. */
  canBoostListings: boolean;
  /** Whether business profile features are unlocked. */
  hasBusinessProfile: boolean;
  /** Whether lead management features are unlocked. */
  hasLeadManagement: boolean;
  /** Whether analytics dashboard is available. */
  hasAnalytics: boolean;
  // TODO: extend with granular feature flags as entitlement logic matures
}
