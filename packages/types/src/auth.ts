/**
 * UserRole – all possible roles a user can hold in EK Marketplace.
 * Roles are additive: a user can hold multiple roles.
 * TODO: expand with fine-grained permissions when RBAC engine is added.
 */
export type UserRole = "guest" | "buyer" | "seller" | "business" | "admin" | "moderator";

/**
 * AccountType – how the account was created / what tier it belongs to.
 * TODO: link to billing/subscription tier once payments are implemented.
 */
export type AccountType = "personal" | "business" | "trade" | "admin";

/**
 * AuthUser – the user object returned from the auth system after successful
 * sign-in. Kept minimal intentionally; do NOT add DB columns here yet.
 */
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  /** Primary role driving the UI shell shown to this user */
  role: UserRole;
  /** Additional roles held (e.g. seller + moderator) */
  roles: UserRole[];
  accountType: AccountType;
  /** ISO-8601 timestamp */
  createdAt: string;
}

/**
 * SessionUser – lightweight version of AuthUser embedded in the session/JWT.
 * Only include fields that are safe to expose client-side.
 */
export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  roles: UserRole[];
  accountType: AccountType;
}
