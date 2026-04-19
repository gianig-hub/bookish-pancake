// Listing types
export type ListingStatus = "active" | "sold" | "expired" | "draft";

export type ListingCategory =
  | "equipment"
  | "services"
  | "wanted"
  | "business";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price?: number;
  currency?: string;
  category: ListingCategory;
  status: ListingStatus;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
  images?: string[];
  location?: string;
}

// User types
export type UserRole = "buyer" | "seller" | "business" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  avatarUrl?: string;
}

// Business types
export interface Business {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  location?: string;
  website?: string;
  phone?: string;
  verified: boolean;
  createdAt: string;
}

// Subscription / plan types
export type PlanName = "free" | "seller_plus" | "trader_pro" | "dealer";

export interface Plan {
  name: PlanName;
  displayName: string;
  priceMonthly: number;
  currency: string;
  features: string[];
}
