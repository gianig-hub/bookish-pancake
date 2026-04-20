/**
 * App configuration loaded from environment variables.
 *
 * TODO: Add validation (e.g. zod) once required env vars are established.
 */
export const config = {
  port: Number(process.env["PORT"] ?? 4000),
  nodeEnv: process.env["NODE_ENV"] ?? "development",
  /**
   * Secret used to sign JWTs / session tokens.
   * TODO: load from a secrets manager in production.
   */
  jwtSecret: process.env["JWT_SECRET"] ?? "changeme-dev-secret",
  jwtExpiresIn: process.env["JWT_EXPIRES_IN"] ?? "7d",
  /** TODO: Wire up real DB connection string */
  databaseUrl: process.env["DATABASE_URL"] ?? "",
  /** TODO: Wire up Redis URL for session store */
  redisUrl: process.env["REDIS_URL"] ?? "",
  corsOrigins: (process.env["CORS_ORIGINS"] ?? "http://localhost:3000").split(","),
} as const;
