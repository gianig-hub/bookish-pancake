/**
 * packages/config/src/pricing.ts
 *
 * Constants for pricing plans, boosts, listing limits, and feature flags.
 * MVP-level — these values drive the UI and basic entitlement checks.
 *
 * TODO: move prices to a database or CMS when billing is fully implemented.
 */

import type {
  PricingPlan,
  PricingPlanId,
  BoostType,
  BoostTypeId,
  UserEntitlements,
} from '@ek/types';

// ---------------------------------------------------------------------------
// Plan definitions
// ---------------------------------------------------------------------------

export const PRICING_PLANS: Record<PricingPlanId, PricingPlan> = {
  buyer_free: {
    id: 'buyer_free',
    name: 'Buyer',
    tagline: 'Browse and find equipment for free',
    monthlyPricePence: 0,
    displayPrice: 'Free',
    isPaid: false,
    ctaLabel: 'Get started free',
    features: [
      { key: 'search', label: 'Search all listings', included: true },
      { key: 'save_searches', label: 'Save searches & alerts', included: true },
      { key: 'contact_sellers', label: 'Contact sellers', included: true },
      { key: 'create_wanted', label: 'Post wanted ads', included: true, displayValue: 'Up to 3' },
      { key: 'create_listings', label: 'Create listings', included: false },
      { key: 'business_profile', label: 'Business profile', included: false },
      { key: 'boosts', label: 'Listing boosts', included: false },
      { key: 'analytics', label: 'Analytics dashboard', included: false },
      { key: 'lead_management', label: 'Lead management', included: false },
    ],
  },

  private_seller_free: {
    id: 'private_seller_free',
    name: 'Private Seller',
    tagline: 'Sell your equipment — no monthly fee',
    monthlyPricePence: 0,
    displayPrice: 'Free',
    isPaid: false,
    ctaLabel: 'Start selling free',
    features: [
      { key: 'search', label: 'Search all listings', included: true },
      { key: 'save_searches', label: 'Save searches & alerts', included: true },
      { key: 'contact_sellers', label: 'Contact sellers', included: true },
      { key: 'create_wanted', label: 'Post wanted ads', included: true, displayValue: 'Up to 3' },
      { key: 'create_listings', label: 'Create listings', included: true, displayValue: 'Up to 5' },
      { key: 'business_profile', label: 'Business profile', included: false },
      { key: 'boosts', label: 'Listing boosts', included: false },
      { key: 'analytics', label: 'Analytics dashboard', included: false },
      { key: 'lead_management', label: 'Lead management', included: false },
    ],
  },

  seller_plus: {
    id: 'seller_plus',
    name: 'Seller Plus',
    tagline: 'More listings, more visibility',
    monthlyPricePence: 999,
    displayPrice: '£9.99/mo',
    isPaid: true,
    ctaLabel: 'Upgrade to Seller Plus',
    features: [
      { key: 'search', label: 'Search all listings', included: true },
      { key: 'save_searches', label: 'Save searches & alerts', included: true },
      { key: 'contact_sellers', label: 'Contact sellers', included: true },
      { key: 'create_wanted', label: 'Post wanted ads', included: true, displayValue: 'Unlimited' },
      { key: 'create_listings', label: 'Create listings', included: true, displayValue: 'Up to 25' },
      { key: 'business_profile', label: 'Business profile', included: false },
      { key: 'boosts', label: 'Listing boosts', included: true },
      { key: 'analytics', label: 'Analytics dashboard', included: false },
      { key: 'lead_management', label: 'Lead management', included: false },
    ],
  },

  trader_pro: {
    id: 'trader_pro',
    name: 'Trader Pro',
    tagline: 'For active traders and small dealers',
    monthlyPricePence: 2499,
    displayPrice: '£24.99/mo',
    isPaid: true,
    isRecommended: true,
    ctaLabel: 'Upgrade to Trader Pro',
    features: [
      { key: 'search', label: 'Search all listings', included: true },
      { key: 'save_searches', label: 'Save searches & alerts', included: true },
      { key: 'contact_sellers', label: 'Contact sellers', included: true },
      { key: 'create_wanted', label: 'Post wanted ads', included: true, displayValue: 'Unlimited' },
      { key: 'create_listings', label: 'Create listings', included: true, displayValue: 'Up to 100' },
      { key: 'business_profile', label: 'Business profile', included: true },
      { key: 'boosts', label: 'Listing boosts', included: true },
      { key: 'analytics', label: 'Analytics dashboard', included: true },
      { key: 'lead_management', label: 'Lead management', included: true },
    ],
  },

  dealer_business: {
    id: 'dealer_business',
    name: 'Dealer / Business',
    tagline: 'Full-power presence for dealers and businesses',
    monthlyPricePence: 5999,
    displayPrice: '£59.99/mo',
    isPaid: true,
    ctaLabel: 'Upgrade to Dealer Business',
    features: [
      { key: 'search', label: 'Search all listings', included: true },
      { key: 'save_searches', label: 'Save searches & alerts', included: true },
      { key: 'contact_sellers', label: 'Contact sellers', included: true },
      { key: 'create_wanted', label: 'Post wanted ads', included: true, displayValue: 'Unlimited' },
      { key: 'create_listings', label: 'Create listings', included: true, displayValue: 'Unlimited' },
      { key: 'business_profile', label: 'Business profile', included: true },
      { key: 'boosts', label: 'Listing boosts', included: true, displayValue: 'Priority access' },
      { key: 'analytics', label: 'Analytics dashboard', included: true, displayValue: 'Advanced' },
      { key: 'lead_management', label: 'Lead management', included: true, displayValue: 'Priority' },
    ],
  },
};

/** Ordered list of plans for display in pricing tables / plan cards. */
export const PLAN_ORDER: PricingPlanId[] = [
  'buyer_free',
  'private_seller_free',
  'seller_plus',
  'trader_pro',
  'dealer_business',
];

// ---------------------------------------------------------------------------
// Monthly prices (convenience — pence)
// ---------------------------------------------------------------------------

export const PLAN_MONTHLY_PRICE_PENCE: Record<PricingPlanId, number> = {
  buyer_free: 0,
  private_seller_free: 0,
  seller_plus: 999,
  trader_pro: 2499,
  dealer_business: 5999,
};

// ---------------------------------------------------------------------------
// Boost definitions
// ---------------------------------------------------------------------------

export const BOOST_TYPES: Record<BoostTypeId, BoostType> = {
  bump_up: {
    id: 'bump_up',
    name: 'Bump Up',
    description: 'Move your listing back to the top of search results.',
    durationDays: 7,
    pricePence: 149,
    displayPrice: '£1.49',
  },
  urgent: {
    id: 'urgent',
    name: 'Urgent',
    description: 'Add an "Urgent Sale" badge to attract buyers quickly.',
    durationDays: 14,
    pricePence: 299,
    displayPrice: '£2.99',
  },
  featured: {
    id: 'featured',
    name: 'Featured',
    description: 'Appear in the Featured Listings section on category pages.',
    durationDays: 14,
    pricePence: 499,
    displayPrice: '£4.99',
  },
  top_of_category: {
    id: 'top_of_category',
    name: 'Top of Category',
    description: 'Pin your listing at the top of its category for maximum visibility.',
    durationDays: 7,
    pricePence: 699,
    displayPrice: '£6.99',
  },
  homepage_spotlight: {
    id: 'homepage_spotlight',
    name: 'Homepage Spotlight',
    description: 'Showcase your listing in the homepage spotlight banner.',
    durationDays: 3,
    pricePence: 999,
    displayPrice: '£9.99',
  },
};

/** Ordered list of boosts for display. */
export const BOOST_ORDER: BoostTypeId[] = [
  'bump_up',
  'urgent',
  'featured',
  'top_of_category',
  'homepage_spotlight',
];

// ---------------------------------------------------------------------------
// MVP listing limits by plan
// ---------------------------------------------------------------------------

export const MVP_LISTING_LIMITS: Record<PricingPlanId, number | null> = {
  buyer_free: 0,           // buyers cannot create equipment listings
  private_seller_free: 5,
  seller_plus: 25,
  trader_pro: 100,
  dealer_business: null,   // null = unlimited
};

export const MVP_WANTED_AD_LIMITS: Record<PricingPlanId, number | null> = {
  buyer_free: 3,
  private_seller_free: 3,
  seller_plus: null,
  trader_pro: null,
  dealer_business: null,
};

// ---------------------------------------------------------------------------
// Feature flags for paid visibility
// ---------------------------------------------------------------------------

/**
 * Feature flags that gate paid / visibility features.
 * These are MVP placeholders — connect to real user plan checks once billing is live.
 *
 * TODO: replace these static flags with dynamic plan-based entitlement checks.
 */
export const FEATURE_FLAGS = {
  /** Enable the pricing page and plan cards. Always true for MVP. */
  PRICING_PAGE_ENABLED: true,

  /** Allow users to purchase boosts. Gate behind plan check in UI. */
  BOOSTS_ENABLED: true,

  /** Show "Recommended" badge on trader_pro plan. */
  SHOW_RECOMMENDED_PLAN: true,

  /** Show annual pricing toggle on pricing page (not yet implemented). */
  ANNUAL_PRICING_ENABLED: false, // TODO: add annual billing option

  /** Enable free trial for paid plans (not yet implemented). */
  FREE_TRIAL_ENABLED: false, // TODO: add free trial logic when billing is live
} as const;

// ---------------------------------------------------------------------------
// Default entitlements by plan (used until real billing is wired up)
// ---------------------------------------------------------------------------

export const DEFAULT_ENTITLEMENTS: Record<PricingPlanId, UserEntitlements> = {
  buyer_free: {
    planId: 'buyer_free',
    maxActiveListings: 0,
    canBoostListings: false,
    hasBusinessProfile: false,
    hasLeadManagement: false,
    hasAnalytics: false,
  },
  private_seller_free: {
    planId: 'private_seller_free',
    maxActiveListings: 5,
    canBoostListings: false,
    hasBusinessProfile: false,
    hasLeadManagement: false,
    hasAnalytics: false,
  },
  seller_plus: {
    planId: 'seller_plus',
    maxActiveListings: 25,
    canBoostListings: true,
    hasBusinessProfile: false,
    hasLeadManagement: false,
    hasAnalytics: false,
  },
  trader_pro: {
    planId: 'trader_pro',
    maxActiveListings: 100,
    canBoostListings: true,
    hasBusinessProfile: true,
    hasLeadManagement: true,
    hasAnalytics: true,
  },
  dealer_business: {
    planId: 'dealer_business',
    maxActiveListings: Infinity,
    canBoostListings: true,
    hasBusinessProfile: true,
    hasLeadManagement: true,
    hasAnalytics: true,
  },
};
