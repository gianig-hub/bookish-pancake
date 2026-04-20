/**
 * Auth feature flags.
 * TODO: wire these to an environment-based feature flag system (e.g. LaunchDarkly, env vars).
 */
export const AUTH_FLAGS = {
  /** Enable email/password login */
  EMAIL_LOGIN_ENABLED: true,

  /** Enable social login (Google, etc.) — not implemented yet */
  SOCIAL_LOGIN_ENABLED: false,

  /** Enable magic link login — not implemented yet */
  MAGIC_LINK_ENABLED: false,

  /** Require email verification on sign-up */
  EMAIL_VERIFICATION_REQUIRED: true,

  /** Enable two-factor authentication — not implemented yet */
  TWO_FACTOR_ENABLED: false,

  /** Allow guest browsing without authentication */
  GUEST_BROWSE_ENABLED: true,

  /** Allow self-service business account upgrade */
  SELF_SERVICE_BUSINESS_UPGRADE: false,
} as const;

export type AuthFlag = keyof typeof AUTH_FLAGS;

/**
 * JWT / session configuration constants.
 * TODO: move sensitive values to environment variables before production.
 */
export const AUTH_SESSION = {
  /** Access token TTL in seconds (15 minutes) */
  ACCESS_TOKEN_TTL: 60 * 15,

  /** Refresh token TTL in seconds (30 days) */
  REFRESH_TOKEN_TTL: 60 * 60 * 24 * 30,

  /** Cookie name used to store the session token */
  SESSION_COOKIE_NAME: 'ek_session',
} as const;
