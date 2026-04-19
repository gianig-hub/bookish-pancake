/**
 * apps/api/src/index.ts
 * EK Marketplace API — Express entry point (MVP shell).
 *
 * TODO: add proper error-handling middleware.
 * TODO: add rate limiting (express-rate-limit).
 * TODO: add request logging (morgan / pino).
 * TODO: add helmet for security headers.
 * TODO: wire up database connection pool (Prisma / pg).
 */

import express from 'express';
import { businessesRouter } from './modules/businesses';
import { businessProfilesRouter } from './modules/business_profiles';
import { serviceAreasRouter } from './modules/service_areas';
import { verificationStatusRouter } from './modules/verification_status';

const app = express();
const PORT = process.env.PORT ?? 4000;

// ---- Middleware ----
app.use(express.json());

// TODO: add CORS middleware for web app origin
// app.use(cors({ origin: process.env.WEB_URL }));

// ---- Health check ----
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---- Routes ----
app.use('/businesses', businessesRouter);
app.use('/businesses/:businessId/profile', businessProfilesRouter);
app.use(
  '/businesses/:businessId/profile/:profileId/service-areas',
  serviceAreasRouter,
);
app.use('/businesses/:businessId/verification', verificationStatusRouter);

// ---- 404 fallback ----
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`EK Marketplace API running on http://localhost:${PORT}`);
});

export default app;
