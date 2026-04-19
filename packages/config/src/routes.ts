/**
 * EK Marketplace — Protected Route Groups
 * -----------------------------------------
 * Defines which URL path prefixes require authentication and which roles.
 * Used in Next.js middleware (apps/web) and API guards (apps/api).
 *
 * TODO: Wire into next/middleware.ts once auth is implemented.
 */

import { UserRole } from '@ek/types';

/**
 * A protected route definition.
 */
export interface ProtectedRoute {
  /** URL path prefix */
  path: string;
  /** Roles allowed to access this path. Empty array = any authenticated user. */
  roles: UserRole[];
  /** Human-readable label for this area */
  label: string;
}

/**
 * List of protected route groups.
 * Middleware should redirect unauthenticated users to /login.
 */
export const PROTECTED_ROUTES: ProtectedRoute[] = [
  {
    path: '/account',
    roles: [],
    label: 'Account Dashboard',
  },
  {
    path: '/seller',
    roles: [UserRole.PRIVATE_SELLER, UserRole.TRADER, UserRole.DEALER, UserRole.BUSINESS, UserRole.ADMIN],
    label: 'Seller Area',
  },
  {
    path: '/business',
    roles: [UserRole.DEALER, UserRole.BUSINESS, UserRole.TRADER, UserRole.ADMIN],
    label: 'Business Area',
  },
  {
    path: '/admin',
    roles: [UserRole.ADMIN],
    label: 'Admin Panel',
  },
];

/**
 * Public routes that should never be protected.
 * These bypass all auth checks.
 */
export const PUBLIC_ROUTES: string[] = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/listings',
  '/services',
  '/businesses',
  '/wanted',
  '/guides',
  '/pricing',
  '/about',
  '/contact',
  '/faq',
  '/help',
];

/**
 * Auth-only routes — redirect to /account/dashboard if already logged in.
 */
export const AUTH_ONLY_ROUTES: string[] = ['/login', '/register'];
