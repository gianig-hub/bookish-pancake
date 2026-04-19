/**
 * In-memory user store — placeholder only.
 *
 * TODO: Replace with PostgreSQL/Prisma before production.
 * Passwords are hashed with bcrypt before storage.
 */

import type { User, UserRole } from '@ek/types';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';

interface StoredUser extends User {
  passwordHash: string;
}

const users = new Map<string, StoredUser>();

const SALT_ROUNDS = 12;

/**
 * Find a user by email.
 */
export function findUserByEmail(email: string): StoredUser | null {
  for (const u of users.values()) {
    if (u.email.toLowerCase() === email.toLowerCase()) return u;
  }
  return null;
}

/**
 * Find a user by ID.
 */
export function findUserById(id: string): StoredUser | null {
  return users.get(id) ?? null;
}

/**
 * Create a new user with a hashed password.
 * Returns null if the email is already taken.
 */
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

  // Return a user without the hash
  const { passwordHash: _, ...safeUser } = user;
  return safeUser;
}

/**
 * Validate an email/password pair.
 * Returns the safe user on success or null on failure.
 */
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
