/**
 * Next.js Middleware — route-level protection.
 *
 * Runs on every matching request before the page renders.
 * Checks for a session ID cookie and redirects unauthenticated users.
 *
 * TODO: Replace cookie-based session lookup with a proper session validation
 *       call (Redis / DB) once the persistence layer is in place.
 * TODO: Add CSRF protection middleware.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/** Routes that require authentication */
const PROTECTED_PREFIXES = ['/account', '/business', '/admin'];

/** Routes that require specific roles (prefix → allowed roles) */
const ROLE_REQUIRED: Record<string, string[]> = {
  '/admin': ['admin'],
  '/business': ['dealer', 'business', 'admin'],
  // /account is open to any authenticated user
};

/** Cookie name used to persist the session ID */
const SESSION_COOKIE = 'ek_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isProtected) return NextResponse.next();

  const sessionId = request.cookies.get(SESSION_COOKIE)?.value;

  if (!sessionId) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // TODO: Validate the session ID against the session store / API.
  // For now we trust the cookie presence as a basic guard.
  // Replace this with a real DB/Redis lookup or a signed-JWT check.

  // Role check — read the role stored in a separate cookie (set on login).
  // TODO: Use a signed JWT or server-side session for this instead of a cookie.
  const userRole = request.cookies.get('ek_role')?.value;

  for (const [prefix, allowedRoles] of Object.entries(ROLE_REQUIRED)) {
    if (pathname.startsWith(prefix)) {
      if (!userRole || !allowedRoles.includes(userRole)) {
        // Redirect to account home or a 403 page
        const forbiddenUrl = new URL('/forbidden', request.url);
        return NextResponse.redirect(forbiddenUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/business/:path*', '/admin/:path*'],
};
