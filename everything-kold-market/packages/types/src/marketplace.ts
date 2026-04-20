// Marketplace-wide shared types

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  sortOrder: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  region: string;
  postcode?: string;
}

export interface SearchFilters {
  query?: string;
  categorySlug?: string;
  brandSlug?: string;
  citySlug?: string;
  condition?: ListingCondition;
  minPrice?: number;
  maxPrice?: number;
  status?: ListingStatus;
  page?: number;
  pageSize?: number;
  sortBy?: 'createdAt' | 'price' | 'views';
  sortOrder?: 'asc' | 'desc';
}

export type ListingStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED';
export type ListingCondition = 'NEW' | 'USED' | 'REFURBISHED';
export type UserRole = 'ADMIN' | 'SELLER' | 'BUYER' | 'INSTALLER' | 'SHOP';
