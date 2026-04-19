import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LOGIN_REDIRECT,
  AUTH_ROUTES,
  BUSINESS_ROUTES,
  ADMIN_ROUTES,
} from "@ek/config";

/**
 * Next.js Edge Middleware – enforces route-level auth and role guards.
 *
 * Runs on every matching request BEFORE the page is rendered, making it
 * impossible to accidentally render a protected page without a session.
 *
 * TODO: implement real session verification once auth library is chosen.
 *       Until then, all protected routes will redirect to /login (safe default).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Read session token from cookie ─────────────────────────────────────────
  // TODO: replace with real token/session cookie name
  const token = request.cookies.get("ek_session")?.value ?? null;

  // ── Determine route type ────────────────────────────────────────────────────
  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isBusinessRoute = BUSINESS_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  const isProtected = isAdminRoute || isBusinessRoute || isAuthRoute;

  if (isProtected && !token) {
    const loginUrl = new URL(LOGIN_REDIRECT, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // TODO: once token verification is implemented, decode the JWT here and
  // check roles for /business and /admin routes, redirecting to /account
  // if the user lacks the required role.

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
