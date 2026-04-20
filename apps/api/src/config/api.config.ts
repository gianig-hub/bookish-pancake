/**
 * API runtime configuration.
 * TODO: validate all values with a schema library (e.g. zod) on startup.
 */

if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable must be set in production');
}

export const apiConfig = {
  port: parseInt(process.env.PORT ?? '3001', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  jwtSecret: process.env.JWT_SECRET ?? 'dev-only-change-me-before-production',
  databaseUrl: process.env.DATABASE_URL ?? '',
} as const;
