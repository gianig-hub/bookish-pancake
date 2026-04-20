import { UserRole } from '@ek/types';

/**
 * Route groups and the minimum role required to access them.
 * TODO: replace with a proper middleware/guard system once auth is wired.
 */
export const PROTECTED_ROUTES: Record<string, UserRole> = {
  '/account': UserRole.BUYER,
  '/account/listings': UserRole.SELLER,
  '/account/favourites': UserRole.BUYER,
  '/account/alerts': UserRole.BUYER,
  '/business': UserRole.BUSINESS,
  '/business/leads': UserRole.BUSINESS,
  '/business/profile': UserRole.BUSINESS,
  '/admin': UserRole.ADMIN,
  '/admin/moderation': UserRole.ADMIN,
};

/**
 * Routes that are publicly accessible (no auth required).
 */
export const PUBLIC_ROUTES: string[] = [
  '/',
  '/login',
  '/register',
  '/browse',
  '/listing',
];

/**
 * Routes that should redirect authenticated users away (e.g. /login when already logged in).
 */
export const AUTH_ONLY_REDIRECT_ROUTES: string[] = ['/login', '/register'];
