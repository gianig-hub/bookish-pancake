// Shared auth & user types for EK Marketplace

/**
 * User roles in the EK Marketplace platform.
 * TODO: Expand with granular permissions when RBAC is implemented.
 */
export type UserRole = "guest" | "buyer" | "seller" | "business" | "admin" | "moderator";

/**
 * Account types – determines dashboard view and feature access.
 */
export type AccountType = "personal" | "business";

/**
 * Authenticated user as stored in a JWT or session token.
 * Only carry what is safe to expose on every request.
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  accountType: AccountType;
  /** ISO-8601 timestamp */
  createdAt: string;
}

/**
 * Minimal session representation stored server-side (e.g. Redis).
 * TODO: extend with device info, IP, refresh-token reference.
 */
export interface SessionUser {
  sessionId: string;
  userId: string;
  role: UserRole;
  accountType: AccountType;
  /** ISO-8601 – when this session was issued */
  issuedAt: string;
  /** ISO-8601 – when this session expires */
  expiresAt: string;
}
