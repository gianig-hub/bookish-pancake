// ─────────────────────────────────────────────
// User Types
// ─────────────────────────────────────────────

export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
}

// ─────────────────────────────────────────────
// Listing Types
// ─────────────────────────────────────────────

export type ListingCondition = 'NEW' | 'USED' | 'REFURBISHED' | 'EX_DISPLAY' | 'TRADE_STOCK';
export type ListingType = 'FOR_SALE' | 'WANTED' | 'HIRE_RENTAL' | 'SERVICE_REQUEST';
export type ListingStatus = 'DRAFT' | 'ACTIVE' | 'SOLD' | 'EXPIRED' | 'REMOVED';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price?: number;
  currency: string;
  condition?: ListingCondition;
  listingType: ListingType;
  status: ListingStatus;
  categoryId: string;
  category?: Category;
  userId: string;
  user?: Pick<User, 'id' | 'name'>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateListingInput {
  title: string;
  description: string;
  price?: number;
  condition?: ListingCondition;
  listingType: ListingType;
  categoryId: string;
}

export interface UpdateListingInput extends Partial<CreateListingInput> {
  status?: ListingStatus;
}

export interface ListingFilters {
  search?: string;
  categoryId?: string;
  condition?: ListingCondition;
  listingType?: ListingType;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'newest' | 'oldest' | 'price_asc' | 'price_desc';
  page?: number;
  limit?: number;
}

// ─────────────────────────────────────────────
// Category Types
// ─────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  children?: Category[];
}

// ─────────────────────────────────────────────
// API Response Types
// ─────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  error: string | null;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
