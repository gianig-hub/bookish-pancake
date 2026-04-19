/**
 * EK Marketplace — Shared Role Constants
 * ----------------------------------------
 * Human-readable labels and metadata for each UserRole.
 * Import from '@ek/config'.
 */

import { UserRole, AccountType } from '@ek/types';

/**
 * Role display labels — used in UI and admin panels.
 */
export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.BUYER]: 'Buyer',
  [UserRole.PRIVATE_SELLER]: 'Private Seller',
  [UserRole.TRADER]: 'Trader',
  [UserRole.DEALER]: 'Dealer',
  [UserRole.BUSINESS]: 'Business',
  [UserRole.ADMIN]: 'Admin',
};

/**
 * Role descriptions — used in onboarding and pricing pages.
 */
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  [UserRole.BUYER]: 'Browse and contact sellers. Free forever.',
  [UserRole.PRIVATE_SELLER]: 'Post personal/individual listings. Free with limits.',
  [UserRole.TRADER]: 'Regular paid seller with higher listing allowances.',
  [UserRole.DEALER]: 'Verified dealer with a dedicated business profile.',
  [UserRole.BUSINESS]: 'Business account for dealers, service providers, and suppliers.',
  [UserRole.ADMIN]: 'Platform administrator with full access.',
};

/**
 * Account type labels — used in onboarding flows.
 */
export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  [AccountType.PERSONAL]: 'Personal',
  [AccountType.BUSINESS]: 'Business',
  [AccountType.DEALER]: 'Dealer',
  [AccountType.SERVICE_PROVIDER]: 'Service Provider',
};

/**
 * Roles that are considered "business" accounts.
 * Used in middleware to gate /business routes.
 */
export const BUSINESS_ROLES: UserRole[] = [
  UserRole.DEALER,
  UserRole.BUSINESS,
  UserRole.TRADER,
];

/**
 * Roles that can post listings.
 */
export const SELLER_ROLES: UserRole[] = [
  UserRole.PRIVATE_SELLER,
  UserRole.TRADER,
  UserRole.DEALER,
  UserRole.BUSINESS,
  UserRole.ADMIN,
];
