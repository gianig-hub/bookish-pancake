/**
 * Auth routes: /auth/register, /auth/login, /auth/logout, /auth/me
 *
 * TODO: Add email verification flow before production.
 * TODO: Add rate limiting (express-rate-limit) before production.
 * TODO: Add OAuth (Google, etc.) when social login is needed.
 */

import { Router } from 'express';
import type { Request, Response } from 'express';
import { createUser, verifyCredentials } from '../lib/users';
import { createSession, deleteSession } from '../lib/session';
import { requireAuth } from '../middleware/auth';
import type { LoginInput, RegisterInput } from '@ek/types';

const router = Router();

// POST /auth/register
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body as RegisterInput;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  // Basic email format check — TODO: use zod for full validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
