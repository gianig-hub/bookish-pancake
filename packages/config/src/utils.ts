import type { SessionUser, UserRole } from "@ek/types";

/**
 * hasAnyRole – returns true if the user holds at least one of the given roles.
 *
 * Checks both `user.role` (primary role) and `user.roles` (all roles held).
 * Use this helper everywhere role guards are needed to keep logic consistent.
 */
export function hasAnyRole(user: SessionUser, allowedRoles: UserRole[]): boolean {
  return allowedRoles.some((r) => user.role === r || user.roles.includes(r));
}
