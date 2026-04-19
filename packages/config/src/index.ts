// ─────────────────────────────────────────────
// Environment Helpers
// ─────────────────────────────────────────────

export const isProduction = () => process.env.NODE_ENV === 'production';
export const isDevelopment = () => process.env.NODE_ENV === 'development';
export const isTest = () => process.env.NODE_ENV === 'test';

// ─────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  DEFAULT_PAGE: 1,
} as const;

// ─────────────────────────────────────────────
// File Upload Limits
// ─────────────────────────────────────────────

export const UPLOAD = {
  MAX_FILE_SIZE_BYTES: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_IMAGES_PER_LISTING: 10,
} as const;

// ─────────────────────────────────────────────
// User Roles
// ─────────────────────────────────────────────

export const USER_ROLES = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
} as const;

// ─────────────────────────────────────────────
// Listing Constants
// ─────────────────────────────────────────────

export const LISTING_STATUS = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  SOLD: 'SOLD',
  EXPIRED: 'EXPIRED',
  REMOVED: 'REMOVED',
} as const;

export const LISTING_CONDITION = {
  NEW: 'NEW',
  USED: 'USED',
  REFURBISHED: 'REFURBISHED',
  EX_DISPLAY: 'EX_DISPLAY',
  TRADE_STOCK: 'TRADE_STOCK',
} as const;

export const LISTING_TYPE = {
  FOR_SALE: 'FOR_SALE',
  WANTED: 'WANTED',
  HIRE_RENTAL: 'HIRE_RENTAL',
  SERVICE_REQUEST: 'SERVICE_REQUEST',
} as const;

// ─────────────────────────────────────────────
// Top-Level Categories (matches seed data)
// ─────────────────────────────────────────────

export const CATEGORIES = [
  { slug: 'ac-units', name: 'AC Units' },
  { slug: 'refrigeration', name: 'Refrigeration' },
  { slug: 'cold-rooms', name: 'Cold Rooms' },
  { slug: 'freezer-rooms', name: 'Freezer Rooms' },
  { slug: 'parts', name: 'Parts & Components' },
  { slug: 'tools', name: 'Tools & Accessories' },
  { slug: 'wanted', name: 'Wanted Ads' },
] as const;
