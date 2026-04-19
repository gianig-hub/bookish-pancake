/**
 * Route groups and protected path prefixes.
 *
 * These are used in both the Next.js middleware (apps/web) and
 * the API auth middleware (apps/api) to decide redirect/403 behaviour.
 */

/** Routes accessible to unauthenticated visitors */
export const PUBLIC_ROUTES = ["/", "/login", "/register", "/browse", "/listing"] as const;

/** Routes that require any authenticated user */
export const AUTH_ROUTES = ["/account"] as const;

/** Routes that require the 'business' or 'admin' role */
export const BUSINESS_ROUTES = ["/business"] as const;

/** Routes that require the 'admin' or 'moderator' role */
export const ADMIN_ROUTES = ["/admin"] as const;

/** URL to redirect unauthenticated users to */
export const LOGIN_REDIRECT = "/login";

/** URL to redirect after successful sign-in (default) */
export const POST_LOGIN_REDIRECT = "/account";

/** URL to redirect after successful sign-out */
export const POST_LOGOUT_REDIRECT = "/";
