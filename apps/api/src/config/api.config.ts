/**
 * API runtime configuration.
 * TODO: validate all values with a schema library (e.g. zod) on startup.
 */
export const apiConfig = {
  port: parseInt(process.env.PORT ?? '3001', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  jwtSecret: process.env.JWT_SECRET ?? 'change-me-in-production',
  databaseUrl: process.env.DATABASE_URL ?? '',
} as const;
