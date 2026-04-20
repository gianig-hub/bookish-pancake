/**
 * Auth utilities for the web app.
 *
 * TODO: Replace all placeholder implementations with real auth logic
 *       (JWT decode, next-auth session, or custom session lookup).
 */

import type { AuthUser, SessionUser } from "@ek/types";

/**
 * Returns the current authenticated user from a server component context.
 * Placeholder: always returns null (unauthenticated) until real auth is wired.
 *
 * TODO: implement using next-auth getServerSession() or custom JWT lookup.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  // TODO: decode and verify JWT / session cookie
  return null;
}

/**
 * Returns the session for the current request.
 * Placeholder: always returns null.
 *
 * TODO: implement session lookup from Redis or DB.
 */
export async function getCurrentSession(): Promise<SessionUser | null> {
  // TODO: read ek_session cookie, verify, and fetch from store
  return null;
}

/**
 * Build the redirect URL to /login, preserving the intended destination.
 */
export function buildLoginRedirect(next: string): string {
  return `/login?next=${encodeURIComponent(next)}`;
}
