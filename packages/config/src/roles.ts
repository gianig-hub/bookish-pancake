import type { UserRole } from "@ek/types";

/**
 * Canonical role name constants – use these instead of raw strings.
 */
export const ROLES = {
  GUEST: "guest" as UserRole,
  BUYER: "buyer" as UserRole,
  SELLER: "seller" as UserRole,
  BUSINESS: "business" as UserRole,
  ADMIN: "admin" as UserRole,
  MODERATOR: "moderator" as UserRole,
} as const;

/**
 * Roles that have access to the /account area.
 */
export const ACCOUNT_ROLES: UserRole[] = [ROLES.BUYER, ROLES.SELLER, ROLES.BUSINESS, ROLES.ADMIN];

/**
 * Roles that have access to the /business area.
 */
export const BUSINESS_ROLES: UserRole[] = [ROLES.BUSINESS, ROLES.ADMIN];

/**
 * Roles that have access to the /admin area.
 */
export const ADMIN_ROLES: UserRole[] = [ROLES.ADMIN, ROLES.MODERATOR];

/**
 * Default role assigned to new users at sign-up.
 */
export const DEFAULT_ROLE: UserRole = ROLES.BUYER;
