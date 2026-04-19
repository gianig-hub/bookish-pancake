import { NextRequest, NextResponse } from "next/server";
import { ROUTE_GROUP_MIN_ROLE, PROTECTED_ROUTE_GROUPS } from "@ek/config";
import { ROLE_HIERARCHY } from "@ek/config";
import type { UserRole } from "@ek/types";

/**
 * Next.js Edge Middleware – enforces route-level auth guards.
 *
 * Current behaviour (placeholder):
 *   - Reads a `ek_session` cookie (value = JSON SessionUser) to determine auth state.
 *   - Redirects unauthenticated requests for protected paths to /login.
 *   - Redirects insufficient-role requests to /.
 *
 * TODO: Replace cookie-parsing with a proper JWT verification call once the
 *       real auth system (next-auth or custom JWT) is implemented.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Determine which protected group this path belongs to
  const group = (
    Object.entries(ROUTE_GROUP_MIN_ROLE) as [
      keyof typeof ROUTE_GROUP_MIN_ROLE,
      UserRole,
    ][]
  ).find(([key]) =>
    PROTECTED_ROUTE_GROUPS[key].some(
      (p) => pathname === p || pathname.startsWith(`${p}/`),
    ),
  );

  if (!group) {
    // Not a protected path – allow through
    return NextResponse.next();
  }

  const [, minRole] = group;

  // TODO: Replace with real session validation (JWT decode + verify)
  const rawSession = request.cookies.get("ek_session")?.value;

  if (!rawSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  let role: UserRole;
  try {
    // Placeholder: session cookie holds a JSON-encoded partial SessionUser
    const session = JSON.parse(rawSession) as { role: UserRole };
    role = session.role;
  } catch {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (ROLE_HIERARCHY.indexOf(role) < ROLE_HIERARCHY.indexOf(minRole)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/business/:path*",
    "/admin/:path*",
  ],
};
