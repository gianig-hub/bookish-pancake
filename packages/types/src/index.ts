/**
 * @ek-marketplace/types
 * Shared TypeScript type definitions for the EK Marketplace monorepo.
 *
 * TODO: Expand these types as the platform is built out.
 * TODO: Consider generating types from the DB schema (Prisma) in future.
 */

// ─── User & Auth ─────────────────────────────────────────────────────────────

export type AccountType = "buyer" | "seller" | "business" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  accountType: AccountType;
  createdAt: Date;
  // TODO: Add avatar, phone, location, verified status
}

// ─── Listings ─────────────────────────────────────────────────────────────────

export type ListingType = "for-sale" | "wanted" | "service-request";

export type ListingCondition =
  | "new"
  | "used"
  | "refurbished"
  | "ex-display"
  | "trade-stock"
  | "clearance"
  | "hire-rental";

export type ListingCategory =
  | "ac-units"
  | "refrigeration"
  | "cold-rooms"
  | "freezer-rooms"
  | "display-refrigeration"
  | "parts"
  | "controllers"
  | "tools"
  | "services"
  | "other";

export interface Listing {
  id: string;
  type: ListingType;
  category: ListingCategory;
  title: string;
  description: string;
  price?: number;
  currency: "GBP";
  condition?: ListingCondition;
  location: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
  // TODO: Add photos, slug, views, status (active/expired/draft), boost info
}

// ─── Businesses ───────────────────────────────────────────────────────────────

export type BusinessTrade =
  | "ac-installation"
  | "ac-servicing"
  | "refrigeration-servicing"
  | "cold-room-installation"
  | "cold-room-servicing"
  | "equipment-dealer"
  | "parts-supplier"
  | "other";

export interface Business {
  id: string;
  slug: string;
  name: string;
  description: string;
  trades: BusinessTrade[];
  location: string;
  verified: boolean;
  createdAt: Date;
  // TODO: Add logo, phone, website, reviews, opening hours, coverage areas
}

// ─── Wanted Ads ───────────────────────────────────────────────────────────────

export interface WantedAd {
  id: string;
  title: string;
  description: string;
  category: ListingCategory;
  budget?: number;
  currency: "GBP";
  location: string;
  userId: string;
  createdAt: Date;
  // TODO: Add expires, responses count, status
}

// ─── Pricing / Subscriptions ──────────────────────────────────────────────────

export type PlanName = "buyer" | "private-seller" | "seller-plus" | "trader-pro" | "dealer-business";

export interface Plan {
  name: PlanName;
  displayName: string;
  priceGBP: number;
  maxListings: number | null;
  features: string[];
  // TODO: Add Stripe price IDs
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  error?: string;
  // TODO: Add pagination metadata
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  // TODO: Add cursor-based pagination support
}
