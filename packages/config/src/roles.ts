import type { UserRole } from "@ek/types";

/**
 * Canonical role name constants.
 * Use these instead of raw strings to avoid typos.
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
 * Ordered privilege hierarchy – higher index = more privileged.
 * TODO: replace with a proper RBAC permission matrix when needed.
 */
export const ROLE_HIERARCHY: UserRole[] = [
  "guest",
  "buyer",
  "seller",
  "business",
  "moderator",
  "admin",
];

/**
 * Returns true if `role` has at least the privilege of `required`.
 */
export function roleAtLeast(role: UserRole, required: UserRole): boolean {
  return ROLE_HIERARCHY.indexOf(role) >= ROLE_HIERARCHY.indexOf(required);
}
