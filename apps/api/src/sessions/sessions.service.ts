/**
 * EK Marketplace — Sessions Service
 * ------------------------------------
 * Handles JWT session lifecycle: creation, verification, refresh, invalidation.
 *
 * TODO: Implement Redis-backed token blocklisting for logout.
 * TODO: Add refresh token support for long-lived sessions.
 * TODO: Add session storage model once DB schema is defined.
 */

// Re-export from auth.service for convenience
export { createToken, verifyToken } from '../auth/auth.service';

/**
 * TODO: invalidateSession(tokenId: string): Promise<void>
 *   — add token JTI to Redis blocklist with TTL matching token expiry.
 *
 * TODO: refreshSession(refreshToken: string): Promise<string>
 *   — verify refresh token, issue new access token.
 */
