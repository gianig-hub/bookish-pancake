// EK Marketplace — shared application constants

export const APP_NAME = 'EK Marketplace';
export const APP_DESCRIPTION =
  'UK-focused AI-first marketplace for air conditioning, refrigeration, cold rooms, and related services.';

// --- Pagination ---
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// --- Listing ---
export const MAX_LISTING_IMAGES = 8;
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const LISTING_EXPIRY_DAYS = 90;

// --- UK Regions ---
export const UK_REGIONS = [
  'East Midlands',
  'East of England',
  'Greater London',
  'North East England',
  'North West England',
  'Northern Ireland',
  'Scotland',
  'South East England',
  'South West England',
  'Wales',
  'West Midlands',
  'Yorkshire and the Humber',
] as const;

export type UKRegion = (typeof UK_REGIONS)[number];

// --- Subscription plans ---
export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    priceGBP: 0,
    maxListings: 3,
  },
  SELLER_PLUS: {
    id: 'seller_plus',
    name: 'Seller Plus',
    priceGBP: 9.99,
    maxListings: 20,
  },
  TRADER_PRO: {
    id: 'trader_pro',
    name: 'Trader Pro',
    priceGBP: 24.99,
    maxListings: 100,
  },
  DEALER_BUSINESS: {
    id: 'dealer_business',
    name: 'Dealer / Business',
    priceGBP: 59.99,
    maxListings: -1, // unlimited
  },
} as const;

export type SubscriptionPlanId = keyof typeof SUBSCRIPTION_PLANS;

// --- API defaults ---
export const API_TIMEOUT_MS = 10_000;
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const RATE_LIMIT_MAX_REQUESTS = 200;
