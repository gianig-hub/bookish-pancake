// EK Marketplace — Business Constants
// Shared constants used across apps and packages.

// ---------------------------------------------------------------------------
// Listing Categories
// ---------------------------------------------------------------------------

export const CATEGORIES = [
  { slug: 'air-conditioning', label: 'Air Conditioning' },
  { slug: 'refrigeration', label: 'Refrigeration' },
  { slug: 'cold-rooms', label: 'Cold Rooms' },
  { slug: 'freezer-rooms', label: 'Freezer Rooms' },
  { slug: 'heat-pumps', label: 'Heat Pumps' },
  { slug: 'ventilation', label: 'Ventilation' },
  { slug: 'parts-components', label: 'Parts & Components' },
  { slug: 'tools-equipment', label: 'Tools & Equipment' },
  { slug: 'services', label: 'Services' },
] as const

export type CategorySlug = (typeof CATEGORIES)[number]['slug']

// ---------------------------------------------------------------------------
// UK Regions
// ---------------------------------------------------------------------------

export const UK_REGIONS = [
  'East Midlands',
  'East of England',
  'London',
  'North East England',
  'North West England',
  'Northern Ireland',
  'Scotland',
  'South East England',
  'South West England',
  'Wales',
  'West Midlands',
  'Yorkshire and the Humber',
] as const

export type UKRegion = (typeof UK_REGIONS)[number]

// ---------------------------------------------------------------------------
// Listing Types
// ---------------------------------------------------------------------------

export const LISTING_TYPES = ['equipment', 'service', 'wanted', 'business'] as const
export type ListingType = (typeof LISTING_TYPES)[number]

// ---------------------------------------------------------------------------
// Listing Conditions
// ---------------------------------------------------------------------------

export const CONDITIONS = ['new', 'used-good', 'used-fair', 'for-parts'] as const
export type Condition = (typeof CONDITIONS)[number]

// ---------------------------------------------------------------------------
// User Roles
// ---------------------------------------------------------------------------

export const USER_ROLES = ['ADMIN', 'SELLER', 'BUYER', 'INSTALLER', 'SHOP'] as const
export type UserRole = (typeof USER_ROLES)[number]

// ---------------------------------------------------------------------------
// Subscription Plans
// ---------------------------------------------------------------------------

export const SUBSCRIPTION_PLANS = [
  { id: 'free', label: 'Free', listingsPerMonth: 3, price: 0 },
  { id: 'starter', label: 'Starter', listingsPerMonth: 20, price: 19 },
  { id: 'pro', label: 'Pro', listingsPerMonth: 100, price: 49 },
  { id: 'business', label: 'Business', listingsPerMonth: -1, price: 99 },
] as const

// ---------------------------------------------------------------------------
// Pagination Defaults
// ---------------------------------------------------------------------------

export const PAGINATION = {
  defaultPage: 1,
  defaultPerPage: 20,
  maxPerPage: 100,
} as const

// ---------------------------------------------------------------------------
// Image Limits
// ---------------------------------------------------------------------------

export const IMAGE_LIMITS = {
  maxFileSizeMB: 10,
  maxFilesPerListing: 10,
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
} as const
