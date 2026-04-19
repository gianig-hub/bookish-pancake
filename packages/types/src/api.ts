/**
 * EK Marketplace — Shared API Response Contract Types
 * -----------------------------------------------------
 * Standard envelope types for all API responses.
 * Use these in apps/api route handlers and apps/web API clients.
 */

/**
 * ApiSuccess — standard success response envelope.
 *
 * @example
 * const res: ApiSuccess<AuthUser> = { success: true, data: user };
 */
export interface ApiSuccess<T = unknown> {
  success: true;
  data: T;
  /** Optional human-readable message */
  message?: string;
}

/**
 * ApiError — standard error response envelope.
 */
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    /** Optional field-level validation errors */
    fields?: Record<string, string[]>;
  };
}

/**
 * ApiResponse — union of success and error envelopes.
 * Use as return type in API route handlers.
 */
export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;

/**
 * PaginatedData — wraps paginated list responses.
 */
export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * PaginatedResponse — convenience alias for paginated API success.
 */
export type PaginatedResponse<T> = ApiSuccess<PaginatedData<T>>;
