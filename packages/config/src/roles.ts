import { UserRole } from '@ek/types';

/**
 * Human-readable role labels for UI display.
 */
export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.GUEST]: 'Guest',
  [UserRole.BUYER]: 'Buyer',
  [UserRole.SELLER]: 'Seller',
  [UserRole.BUSINESS]: 'Business',
  [UserRole.ADMIN]: 'Admin',
  [UserRole.SUPER_ADMIN]: 'Super Admin',
};

/**
 * Ordered list of roles from lowest to highest privilege.
 * Useful for guard comparisons.
 */
export const ROLE_HIERARCHY: UserRole[] = [
  UserRole.GUEST,
  UserRole.BUYER,
  UserRole.SELLER,
  UserRole.BUSINESS,
  UserRole.ADMIN,
  UserRole.SUPER_ADMIN,
];

/**
 * Default role assigned to newly registered users.
 */
export const DEFAULT_USER_ROLE = UserRole.BUYER;
