/**
 * In-memory session store — server-only.
 *
 * TODO: Replace with Redis or database-backed sessions before production.
 * This is a placeholder that works for a single-process dev setup only.
 */

import type { Session } from '@ek/types';
import { randomUUID } from 'crypto';

// Session TTL: 7 days in milliseconds
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const sessions = new Map<string, Session>();

/**
 * Create and store a new session for a user.
 */
export function createSession(user: Session['user']): Session {
  const sessionId = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  const session: Session = { sessionId, user, expiresAt };
  sessions.set(sessionId, session);
  return session;
}

/**
 * Retrieve a session by ID. Returns null if missing or expired.
 */
export function getSession(sessionId: string): Session | null {
  const session = sessions.get(sessionId);
  if (!session) return null;
  if (new Date(session.expiresAt) < new Date()) {
    sessions.delete(sessionId);
    return null;
  }
  return session;
}

/**
 * Delete a session (logout).
 */
export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

/**
 * Purge all expired sessions.
 * Call this on a schedule (e.g., every hour) — TODO: wire up to a cron.
 */
export function purgeExpiredSessions(): void {
  const now = new Date();
  for (const [id, session] of sessions.entries()) {
    if (new Date(session.expiresAt) < now) {
      sessions.delete(id);
    }
  }
}
