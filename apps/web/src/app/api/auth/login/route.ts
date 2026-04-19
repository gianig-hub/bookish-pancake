/**
 * Next.js Route Handler — /api/auth/login
 *
 * Proxies login requests to the API and sets session cookies.
 * TODO: Replace in-process user/session logic with a call to apps/api.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials } from '../../../../lib/auth';
import { createSession } from '../../../../lib/session';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.email || !body?.password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const user = await verifyCredentials(body.email, body.password);
  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const session = createSession(user);

  const response = NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    sessionId: session.sessionId,
    expiresAt: session.expiresAt,
  });

  // Set HttpOnly cookie for middleware to read
  response.cookies.set('ek_session', session.sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(session.expiresAt),
    path: '/',
  });

  // Store role in a readable cookie for middleware role checks
  // TODO: Replace with signed JWT or server-side role check
  response.cookies.set('ek_role', user.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(session.expiresAt),
    path: '/',
  });

  return response;
}
