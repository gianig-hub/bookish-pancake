/**
 * EK Marketplace API — entry point.
 *
 * Express server with auth routes.
 * TODO: Add request logging (morgan/pino) before production.
 * TODO: Add Helmet.js security headers before production.
 * TODO: Add express-rate-limit before production.
 */

import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
const PORT = process.env.PORT ?? 4000;

// Parse JSON bodies
app.use(express.json());

// CORS — restrict origins in production via ALLOWED_ORIGINS env var
// TODO: Tighten CORS origins before production deployment.
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ek-api' });
});

// API routes
app.use('/api/v1', router);

// 404 fallthrough
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

app.listen(PORT, () => {
  console.log(`[api] Running on http://localhost:${PORT}`);
  // TODO: Remove this warning once DB is connected.
  console.warn('[api] WARNING: Using in-memory session and user store. Data will not persist.');
});

export default app;
