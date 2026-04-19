/**
 * API server configuration.
 * Values are read from environment variables with safe defaults for local dev.
 * TODO: use a validated config library (e.g. zod + dotenv) before production.
 */

const nodeEnv = (process.env.NODE_ENV ?? "development") as "development" | "test" | "production";

if (nodeEnv === "production" && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable must be set in production");
}

export const config = {
  port: parseInt(process.env.PORT ?? "4000", 10),
  nodeEnv,
  /** Secret used to sign JWTs / sessions. MUST be overridden via env in production. */
  jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-me",
  /** How long access tokens live */
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "15m",
  /** How long refresh tokens live */
  refreshExpiresIn: process.env.REFRESH_EXPIRES_IN ?? "7d",
  /** CORS allowed origins */
  corsOrigins: (process.env.CORS_ORIGINS ?? "http://localhost:3000").split(","),
  /** Auth rate limit: max requests per windowMs */
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX ?? "100", 10),
  /** Auth rate limit: window in milliseconds */
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? String(15 * 60 * 1000), 10),
  /** Database URL – not yet wired up */
  // TODO: add database connection once DB schema is designed
  databaseUrl: process.env.DATABASE_URL ?? "",
} as const;
