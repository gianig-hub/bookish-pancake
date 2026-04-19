/**
 * EK Marketplace — Rate Limiter Middleware
 * ------------------------------------------
 * Uses `express-rate-limit` for standard request rate limiting.
 *
 * TODO: Replace in-memory store with Redis store in production
 *       (use express-rate-limit + rate-limit-redis).
 * TODO: Add per-user rate limiting for authenticated routes.
 */

import rateLimit from 'express-rate-limit';

/** Standard API rate limit: 100 requests per minute */
export const apiRateLimiter = rateLimit({
  windowMs: 60_000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { code: 'RATE_LIMITED', message: 'Too many requests. Please try again later.' },
  },
});

/** Strict auth rate limit: 10 requests per minute (login/register protection) */
export const authRateLimiter = rateLimit({
  windowMs: 60_000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { code: 'RATE_LIMITED', message: 'Too many login attempts. Please try again later.' },
  },
});
