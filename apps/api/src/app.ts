/**
 * EK Marketplace — Express App Factory
 * --------------------------------------
 * Registers all middleware and routes.
 * TODO: Add Prisma, Redis connections, CORS, rate limiting.
 */

import express from 'express';
import { healthRouter } from './health/health.controller';
import { authRouter } from './auth/auth.routes';
import { usersRouter } from './users/users.routes';
import { errorMiddleware } from './middleware/error.middleware';

export const app = express();

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Add CORS middleware (cors package)
// TODO: Add rate limiter middleware
// TODO: Add request logger middleware

// Routes
app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// TODO: Add /listings, /businesses, /wanted, /services routes in Phase 2

// Global error handler (must be last)
app.use(errorMiddleware);
