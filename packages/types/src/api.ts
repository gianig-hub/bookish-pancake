/**
 * Generic API response envelope used across all EK API endpoints.
 * TODO: expand error codes once API error strategy is finalised.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  /** ISO-8601 timestamp of when the response was produced */
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  /** Field-level validation errors, keyed by field name */
  fields?: Record<string, string>;
}

/**
 * Paginated list wrapper used by list endpoints.
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
