/**
 * In-memory session store for the web app — server-only.
 *
 * Stores sessions keyed by session ID.
 * TODO: Replace with Redis or encrypted cookie-based sessions before production.
 * This module must only be imported in server components or API routes.
 */

import type { Session, User } from '@ek/types';
import { randomUUID } from 'crypto';

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// In-memory map — resets on server restart
const sessions = new Map<string, Session>();

export function createSession(user: User): Session {
  const sessionId = randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();
  const session: Session = { sessionId, user, expiresAt };
  sessions.set(sessionId, session);
  return session;
}

export function getSession(sessionId: string): Session | null {
  const session = sessions.get(sessionId);
  if (!session) return null;
  if (new Date(session.expiresAt) < new Date()) {
    sessions.delete(sessionId);
    return null;
  }
  return session;
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}
