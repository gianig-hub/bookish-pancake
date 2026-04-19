/**
 * EK Marketplace — Next.js Middleware
 * Handles route protection based on session and user role.
 *
 * TODO: Replace stub with real session reading once auth is implemented.
 *       Use NextAuth.js `getToken` or equivalent JWT utility.
 *
 * Protected route config is defined in packages/config/src/routes.ts
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROTECTED_ROUTES, AUTH_ONLY_ROUTES, PUBLIC_ROUTES } from '@ek/config';
import type { UserRole } from '@ek/types';

/**
 * TODO: Replace with real session reading (NextAuth getToken, etc.)
 */
function getSessionFromRequest(_req: NextRequest): { role: UserRole } | null {
  // STUB: Return null until auth is implemented.
  // In production, read the session token from cookies/headers here.
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.match(/\.(png|jpg|jpeg|svg|ico|css|js|woff2?)$/)
  ) {
    return NextResponse.next();
  }

  const session = getSessionFromRequest(request);

  // Redirect authenticated users away from auth-only routes (login/register)
  if (session && AUTH_ONLY_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  // Check protected routes
  for (const protectedRoute of PROTECTED_ROUTES) {
    if (pathname.startsWith(protectedRoute.path)) {
      // Not authenticated → redirect to login
      if (!session) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Authenticated but wrong role → redirect to account dashboard
      if (
        protectedRoute.roles.length > 0 &&
        !protectedRoute.roles.includes(session.role)
      ) {
        return NextResponse.redirect(new URL('/account', request.url));
      }

      break;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
