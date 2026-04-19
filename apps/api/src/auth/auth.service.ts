/**
 * EK Marketplace — Auth Service
 * ------------------------------
 * Business logic for authentication: password hashing, JWT creation, session management.
 *
 * ASSUMPTION: bcryptjs is used for password hashing.
 * ASSUMPTION: jsonwebtoken is used for JWT creation.
 * TODO: Implement all methods once DB (Prisma) and Redis are in place.
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config/env';
import type { AuthUser, LoginCredentials, RegisterInput, SessionUser } from '@ek/types';
import { UserRole, AccountType } from '@ek/types';

const SALT_ROUNDS = 12;

/**
 * Hash a plain-text password.
 */
export async function hashPassword(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, SALT_ROUNDS);
}

/**
 * Verify a plain-text password against a stored hash.
 */
export async function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plaintext, hash);
}

/**
 * Create a JWT for a user session.
 * The payload is a SessionUser (lightweight, no sensitive fields).
 */
export function createToken(user: AuthUser): string {
  const payload: SessionUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    accountType: user.accountType,
  };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

/**
 * Verify and decode a JWT.
 * Returns null if the token is invalid or expired.
 */
export function verifyToken(token: string): SessionUser | null {
  try {
    return jwt.verify(token, config.jwtSecret) as SessionUser;
  } catch {
    return null;
  }
}

/**
 * TODO: registerUser — validate input, check for duplicate email, hash password, insert user.
 * TODO: loginUser — find user by email, verify password, create session token.
 * TODO: logoutUser — invalidate session in Redis (blocklist token).
 */
