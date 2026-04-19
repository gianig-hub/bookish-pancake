/**
 * EK Marketplace API – entry point
 *
 * MVP shell: Express server with listings and categories modules.
 * TODO: add authentication middleware (Phase 1 auth).
 * TODO: add rate limiting (express-rate-limit).
 * TODO: add request logging (morgan or pino-http).
 * TODO: add Sentry/error tracking.
 */

import express from 'express';
import listingsRouter from './modules/listings/listings.router';
import categoriesRouter from './modules/categories/categories.router';

const app = express();
const PORT = process.env.PORT ?? 4000;

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(express.json());

// TODO: add cors() with allowlist from env
// TODO: add helmet() for security headers
// TODO: add express-rate-limit

// ─── Routes ──────────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/listings', listingsRouter);
app.use('/api/categories', categoriesRouter);

// TODO: add /api/users, /api/auth, /api/business routers in later phases

// ─── Start ───────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});

export default app;
