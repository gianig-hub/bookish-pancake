import type { SessionUser } from '@ek/types';

/**
 * Retrieve the current session user from cookies / server context.
 * TODO: implement using a real session library (e.g. next-auth, iron-session).
 * Returns null when there is no active session.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  // TODO: decode JWT / session cookie and return SessionUser
  return null;
}

/**
 * Check whether a session is active.
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getSessionUser();
  return user !== null;
}
