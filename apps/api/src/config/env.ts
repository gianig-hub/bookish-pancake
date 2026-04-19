/**
 * EK Marketplace — Environment Configuration
 * --------------------------------------------
 * Reads and validates environment variables for the API.
 *
 * TODO: Replace manual validation with Zod schema validation.
 * TODO: Add DATABASE_URL, REDIS_URL, email, and payment config.
 *
 * ASSUMPTION: All variables are read from process.env.
 *             Use dotenv in development (dotenv is loaded by ts-node-dev).
 */

function requireEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`[config] Missing required environment variable: ${key}`);
  }
  return value;
}

export const config = {
  /** Server port */
  port: parseInt(process.env.API_PORT ?? '4000', 10),

  /** Node environment */
  nodeEnv: process.env.NODE_ENV ?? 'development',

  /** JWT secret — REQUIRED in production */
  jwtSecret: requireEnv('JWT_SECRET', 'dev-secret-change-in-production'),

  /** JWT expiry duration */
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',

  /** TODO: Add DATABASE_URL once Prisma is set up */
  // databaseUrl: requireEnv('DATABASE_URL'),

  /** TODO: Add REDIS_URL once Redis client is added */
  // redisUrl: requireEnv('REDIS_URL'),

  /** Allowed CORS origins */
  corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:3000').split(','),
} as const;
