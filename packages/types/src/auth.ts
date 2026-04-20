/**
 * User roles for EK Marketplace.
 * Keep minimal - no advanced RBAC engine yet.
 * TODO: extend when subscription tiers and permissions matrix is designed.
 */
export enum UserRole {
  GUEST = 'guest',
  BUYER = 'buyer',
  SELLER = 'seller',
  BUSINESS = 'business',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

/**
 * Account type distinguishes personal vs business accounts.
 */
export enum AccountType {
  PERSONAL = 'personal',
  BUSINESS = 'business',
}

/**
 * Minimal authenticated user shape.
 * TODO: expand with profile fields once user schema is defined.
 */
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  accountType: AccountType;
  emailVerified: boolean;
  /** ISO 8601 datetime string, e.g. "2026-01-01T00:00:00.000Z" */
  createdAt: string;
}

/**
 * Session user — slimmer shape stored in JWT / session token.
 * Excludes sensitive or bulky fields.
 */
export interface SessionUser {
  id: string;
  email: string;
  role: UserRole;
  accountType: AccountType;
}

/**
 * Standard API response wrapper.
 * TODO: add pagination metadata when listing endpoints are built.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Paginated API response wrapper.
 */
export interface PaginatedApiResponse<T = unknown> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}
