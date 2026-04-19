/**
 * Auth routes: /auth/register, /auth/login, /auth/logout, /auth/me
 *
 * TODO: Add email verification flow before production.
 * TODO: Replace in-memory rate limiter with express-rate-limit + Redis before production.
 * TODO: Add OAuth (Google, etc.) when social login is needed.
 */

import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { createUser, verifyCredentials } from '../lib/users';
import { createSession, deleteSession } from '../lib/session';
import { requireAuth } from '../middleware/auth';
import type { LoginInput, RegisterInput } from '@ek/types';

const router = Router();

// ---------------------------------------------------------------------------
// Simple in-memory rate limiter — applied as middleware to all auth routes.
// TODO: Replace with express-rate-limit + Redis before production.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 10; // requests per window per IP

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

function authRateLimit(req: Request, res: Response, next: NextFunction): void {
  const ip = (req.ip ?? req.socket.remoteAddress) ?? 'unknown';
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    next();
    return;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    res.status(429).json({ error: 'Too many requests. Please try again later.' });
    return;
  }

  entry.count += 1;
  next();
}

// Apply rate limiting to all auth routes
router.use(authRateLimit);

// ---------------------------------------------------------------------------
// Safe email format check — avoids regex backtracking (ReDoS).
// TODO: Replace with zod schema validation for full validation.
// ---------------------------------------------------------------------------
function isValidEmailFormat(email: string): boolean {
  const at = email.indexOf('@');
  if (at <= 0 || at === email.length - 1) return false;
  const domain = email.slice(at + 1);
  const dot = domain.lastIndexOf('.');
  return dot > 0 && dot < domain.length - 1;
}

// POST /auth/register
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body as RegisterInput;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  // Safe email format check (no regex backtracking)
  if (!isValidEmailFormat(email)) {
    res.status(400).json({ error: 'Invalid email address.' });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ error: 'Password must be at least 8 characters.' });
    return;
  }

  const user = await createUser({ email, password, name, role });
  if (!user) {
    res.status(409).json({ error: 'An account with this email already exists.' });
    return;
  }

  const session = createSession(user);
  res.status(201).json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    sessionId: session.sessionId,
    expiresAt: session.expiresAt,
  });
});

// POST /auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginInput;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    // Use the same message for both not-found and wrong-password (security)
    res.status(401).json({ error: 'Invalid email or password.' });
    return;
  }

  const session = createSession(user);
  res.status(200).json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    sessionId: session.sessionId,
    expiresAt: session.expiresAt,
  });
});

// POST /auth/logout
router.post('/logout', requireAuth, (req: Request, res: Response) => {
  if (req.sessionId) {
    deleteSession(req.sessionId);
  }
  res.status(200).json({ ok: true });
});

// GET /auth/me — returns the currently authenticated user
router.get('/me', requireAuth, (req: Request, res: Response) => {
  const u = req.user!;
  res.status(200).json({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
  });
});

export default router;
