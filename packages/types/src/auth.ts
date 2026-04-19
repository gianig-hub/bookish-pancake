/**
 * EK Marketplace — Shared Auth & Session Types
 * ----------------------------------------------
 * Shared between API (JWT/session creation) and web (session reading).
 * TODO: Extend with OAuth provider fields when social login is added.
 */

import type { UserRole, AccountType } from './roles';

/**
 * AuthUser — the full user object returned after successful authentication.
 * Typically stored server-side or used in JWT payload construction.
 *
 * TODO: Add emailVerified, createdAt, updatedAt once DB schema is in place.
 */
export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  accountType: AccountType;
  /** Whether the user's email has been verified */
  emailVerified: boolean;
  /** Whether the account is active/not banned */
  active: boolean;
}

/**
 * SessionUser — a lightweight version of AuthUser stored in the session/JWT.
 * Keep this minimal to reduce token/cookie size.
 */
export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  accountType: AccountType;
}

/**
 * LoginCredentials — input type for email/password login.
 * TODO: Add 'provider' field for OAuth flows.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * RegisterInput — input type for new user registration.
 * TODO: Add accountType selection during registration flow.
 */
export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
  accountType?: AccountType;
}
