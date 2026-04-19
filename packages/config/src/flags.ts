/**
 * Feature flags for auth-related functionality.
 *
 * These are placeholders – values will eventually come from a remote config
 * service (LaunchDarkly / Unleash / environment variables).
 *
 * TODO: wire up to real feature-flag provider before going to production.
 */
export const AUTH_FLAGS = {
  /** Allow users to register with email + password */
  EMAIL_PASSWORD_ENABLED: true,

  /** Allow OAuth sign-in via Google */
  GOOGLE_OAUTH_ENABLED: false, // TODO: enable once OAuth app is configured

  /** Allow OAuth sign-in via Apple */
  APPLE_OAUTH_ENABLED: false, // TODO: enable once Apple developer account is set up

  /** Require email verification before accessing protected routes */
  EMAIL_VERIFICATION_REQUIRED: false, // TODO: enable before go-live

  /** Enable magic-link (passwordless) sign-in */
  MAGIC_LINK_ENABLED: false, // TODO: implement magic-link flow

  /** Enable two-factor authentication */
  TWO_FACTOR_ENABLED: false, // TODO: implement 2FA

  /** Enable business account self-service upgrade */
  BUSINESS_UPGRADE_ENABLED: false, // TODO: implement after billing is ready
} as const;

export type AuthFlagKey = keyof typeof AUTH_FLAGS;
