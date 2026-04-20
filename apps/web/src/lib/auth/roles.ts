import type { SessionUser } from '@ek/types';
import { UserRole } from '@ek/types';
import { ROLE_HIERARCHY } from '@ek/config';

/**
 * Check whether a user has at least the required role.
 * Uses the ROLE_HIERARCHY ordering for comparison.
 */
export function hasMinimumRole(user: SessionUser | null, required: UserRole): boolean {
  if (!user) return false;
  const userIndex = ROLE_HIERARCHY.indexOf(user.role);
  const requiredIndex = ROLE_HIERARCHY.indexOf(required);
  return userIndex >= requiredIndex;
}

/**
 * Check whether the current user can access a given path.
 * TODO: wire to PROTECTED_ROUTES from @ek/config.
 */
export function canAccessRoute(user: SessionUser | null, path: string): boolean {
  // TODO: look up PROTECTED_ROUTES[path] and call hasMinimumRole
  // Placeholder: allow everything for now
  void user;
  void path;
  return true;
}
