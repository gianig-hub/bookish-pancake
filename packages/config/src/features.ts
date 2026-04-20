/**
 * Auth feature flags.
 * These act as placeholders until real feature-flag infrastructure (e.g. LaunchDarkly) is set up.
 *
 * TODO: Replace with environment-driven or remote config flags.
 */
export const AUTH_FEATURES = {
  /** Allow new registrations */
  REGISTRATION_ENABLED: true,

  /** Enable Google OAuth flow */
  GOOGLE_OAUTH_ENABLED: false, // TODO: wire up next-auth Google provider

  /** Enable magic-link / passwordless login */
  MAGIC_LINK_ENABLED: false, // TODO: implement magic-link flow

  /** Require email verification before account is active */
  EMAIL_VERIFICATION_REQUIRED: false, // TODO: implement verification email

  /** Enable business account upgrade flow */
  BUSINESS_UPGRADE_ENABLED: true,

  /** Rate-limit login attempts */
  LOGIN_RATE_LIMIT_ENABLED: false, // TODO: add Redis-backed rate limiter
} as const;

export type AuthFeatureKey = keyof typeof AUTH_FEATURES;
