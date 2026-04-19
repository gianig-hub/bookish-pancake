/**
 * EK Marketplace — Shared User Role Types
 * ----------------------------------------
 * These types are used across apps/api, apps/web, and apps/worker.
 * Keep this file minimal and extend via dedicated type files as the project grows.
 */

/**
 * All user roles in EK Marketplace.
 *
 * - buyer:           Can browse and contact sellers. Free.
 * - private_seller:  Can post individual/personal listings. Free.
 * - trader:          Regular paid seller with more listing allowances.
 * - dealer:          Verified dealer with a business listing and dedicated profile.
 * - business:        Business account (dealers, service providers, suppliers).
 * - admin:           Platform administrator with full access.
 *
 * TODO: Add 'moderator' role for community/AI-assisted moderation support.
 */
export enum UserRole {
  BUYER = 'buyer',
  PRIVATE_SELLER = 'private_seller',
  TRADER = 'trader',
  DEALER = 'dealer',
  BUSINESS = 'business',
  ADMIN = 'admin',
}

/**
 * Account types — describes the classification of a user/business account.
 * Distinct from role; role = permission level, account type = business context.
 */
export enum AccountType {
  PERSONAL = 'personal',
  BUSINESS = 'business',
  DEALER = 'dealer',
  SERVICE_PROVIDER = 'service_provider',
}
