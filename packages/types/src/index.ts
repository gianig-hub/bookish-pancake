// TODO: Add shared TypeScript types for EK Marketplace

export type ListingStatus = "active" | "sold" | "expired" | "draft";

export type ListingType =
  | "for-sale"
  | "wanted"
  | "new"
  | "used"
  | "refurbished"
  | "ex-display"
  | "trade-stock"
  | "clearance"
  | "hire-rental"
  | "service-request";

export interface Listing {
  id: string;
  title: string;
  description: string;
  type: ListingType;
  status: ListingStatus;
  price?: number;
  currency?: "GBP";
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Business {
  id: string;
  name: string;
  description?: string;
  website?: string;
  location?: string;
  verified: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: "buyer" | "seller" | "business" | "admin";
  createdAt: string;
}
