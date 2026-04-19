/**
 * Shared auth + role types for EK Marketplace.
 * Used by both apps/web and apps/api.
 */

// All supported roles. Add new roles here when needed.
export type UserRole =
  | 'buyer'
  | 'private_seller'
  | 'trader'
  | 'dealer'
  | 'business'
  | 'admin';

// Minimal user shape shared across the monorepo.
export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  /** ISO timestamp */
  createdAt: string;
}

// Session payload stored server-side (in-memory for now — TODO: persist in DB/Redis).
export interface Session {
  sessionId: string;
  user: User;
  /** ISO timestamp */
  expiresAt: string;
}

// Payload returned to clients on successful auth.
export interface AuthResponse {
  user: Omit<User, 'createdAt'>;
  sessionId: string;
  expiresAt: string;
}

// Shape of the login request body.
export interface LoginInput {
  email: string;
  password: string;
}

// Shape of the register request body.
export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
  role?: UserRole; // defaults to 'buyer' if not provided
}
