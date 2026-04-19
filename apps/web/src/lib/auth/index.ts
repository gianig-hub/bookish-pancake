/**
 * Auth utilities for the web app.
 *
 * TODO: Replace in-memory user store with API calls to apps/api before production.
 * TODO: Use secure HttpOnly cookie for session ID instead of localStorage.
 */

import type { User, UserRole } from '@ek/types';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

interface StoredUser extends User {
  passwordHash: string;
}

// In-memory user store — TODO: replace with real DB calls
const users = new Map<string, StoredUser>();

const SALT_ROUNDS = 12;

export function findUserByEmail(email: string): StoredUser | null {
  for (const u of users.values()) {
    if (u.email.toLowerCase() === email.toLowerCase()) return u;
  }
  return null;
}

export async function createUser(opts: {
  email: string;
  password: string;
  name?: string;
  role?: UserRole;
}): Promise<User | null> {
  if (findUserByEmail(opts.email)) return null;

  const passwordHash = await bcrypt.hash(opts.password, SALT_ROUNDS);
  const user: StoredUser = {
    id: randomUUID(),
    email: opts.email,
    name: opts.name,
    role: opts.role ?? 'buyer',
    createdAt: new Date().toISOString(),
    passwordHash,
  };
  users.set(user.id, user);
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}

export async function verifyCredentials(
  email: string,
  password: string,
): Promise<User | null> {
  const stored = findUserByEmail(email);
  if (!stored) return null;
  const valid = await bcrypt.compare(password, stored.passwordHash);
  if (!valid) return null;
  const { passwordHash: _, ...safeUser } = stored;
  return safeUser;
}

/**
 * Role helpers
 */
export function canAccessBusiness(role: UserRole): boolean {
  return ['dealer', 'business', 'admin'].includes(role);
}

export function canAccessAdmin(role: UserRole): boolean {
  return role === 'admin';
}

export function canPost(role: UserRole): boolean {
  return ['private_seller', 'trader', 'dealer', 'business', 'admin'].includes(role);
}
