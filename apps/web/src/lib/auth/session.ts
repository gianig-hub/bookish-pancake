import type { SessionUser } from "@ek/types";

/**
 * getSessionUser – reads the current user from the session cookie / JWT.
 *
 * This is a SERVER-SIDE helper (safe to call in layouts and server components).
 *
 * TODO: implement real session lookup once auth library is chosen.
 *       Options: next-auth, lucia, iron-session, custom JWT.
 *
 * Returns null when there is no valid session (unauthenticated).
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  // TODO: read and verify the session cookie or JWT here.
  // Example with iron-session or next-auth:
  //   const session = await getServerSession(authOptions);
  //   return session?.user ?? null;
  return null;
}
