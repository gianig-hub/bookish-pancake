// packages/types — public exports
//
// Add shared types here as the data model is defined.
// See README.md for the planned type structure.

// Example stub types — replace with real definitions from the database schema

export type ID = string

export type Timestamps = {
  createdAt: string
  updatedAt: string
}

export enum UserRole {
  Buyer = 'buyer',
  Seller = 'seller',
  Business = 'business',
  Admin = 'admin',
}

export enum ListingStatus {
  Draft = 'draft',
  Active = 'active',
  Expired = 'expired',
  Sold = 'sold',
  Removed = 'removed',
}

export enum ListingCondition {
  New = 'new',
  Used = 'used',
  Refurbished = 'refurbished',
  ExDisplay = 'ex_display',
  TradeStock = 'trade_stock',
  Clearance = 'clearance',
}

// Generic API response wrapper
export type ApiResponse<T> = {
  data: T | null
  error: { code: string; message: string } | null
  meta?: Record<string, unknown>
}

// Generic paginated response
export type PaginatedResponse<T> = ApiResponse<T[]> & {
  meta: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}
