/**
 * EK Marketplace — Feature Flags
 * --------------------------------
 * Centralised feature toggle configuration.
 * Use environment variables to override in production.
 *
 * TODO: Replace with a proper feature flag service (e.g. Unleash, LaunchDarkly) post-MVP.
 */

export interface FeatureFlags {
  /** Enable AI-assisted listing creation */
  aiListingAssistant: boolean;
  /** Enable AI-powered search (natural language queries) */
  aiSearch: boolean;
  /** Enable seller copilot suggestions */
  aiSellerCopilot: boolean;
  /** Enable business profile AI writer */
  aiBusinessProfileWriter: boolean;
  /** Enable admin AI moderation assistant */
  aiModerationAssistant: boolean;
  /** Enable social login (Google, Apple) */
  socialLogin: boolean;
  /** Enable business subscription/paid plans */
  subscriptions: boolean;
  /** Enable listing boosts */
  listingBoosts: boolean;
  /** Enable wanted ads */
  wantedAds: boolean;
  /** Enable service requests */
  serviceRequests: boolean;
  /** Enable user messaging/leads */
  messaging: boolean;
  /** Enable review system */
  reviews: boolean;
}

/**
 * Default feature flags for MVP phase.
 * AI features are OFF by default — enable via env vars when ready.
 */
export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  aiListingAssistant: false,
  aiSearch: false,
  aiSellerCopilot: false,
  aiBusinessProfileWriter: false,
  aiModerationAssistant: false,
  socialLogin: false,
  subscriptions: false,
  listingBoosts: false,
  wantedAds: true,
  serviceRequests: true,
  messaging: false,
  reviews: false,
};

/**
 * Read feature flags from environment variables (server-side only).
 * Falls back to DEFAULT_FEATURE_FLAGS if env var is not set.
 *
 * TODO: Add validation/parsing layer when env config is formalised.
 */
export function getFeatureFlags(): FeatureFlags {
  return {
    ...DEFAULT_FEATURE_FLAGS,
    aiListingAssistant: process.env.FEATURE_AI_LISTING_ASSISTANT === 'true',
    aiSearch: process.env.FEATURE_AI_SEARCH === 'true',
    aiSellerCopilot: process.env.FEATURE_AI_SELLER_COPILOT === 'true',
    aiBusinessProfileWriter: process.env.FEATURE_AI_BUSINESS_PROFILE === 'true',
    aiModerationAssistant: process.env.FEATURE_AI_MODERATION === 'true',
    socialLogin: process.env.FEATURE_SOCIAL_LOGIN === 'true',
    subscriptions: process.env.FEATURE_SUBSCRIPTIONS === 'true',
    listingBoosts: process.env.FEATURE_LISTING_BOOSTS === 'true',
    messaging: process.env.FEATURE_MESSAGING === 'true',
    reviews: process.env.FEATURE_REVIEWS === 'true',
  };
}
