/**
 * Next.js Route Handler — /api/auth/register
 *
 * TODO: Replace in-process user/session logic with a call to apps/api.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '../../../../lib/auth';
import { createSession } from '../../../../lib/session';
import type { UserRole } from '@ek/types';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.email || !body?.password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  if (body.password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters.' },
      { status: 400 },
    );
  }

  const user = await createUser({
    email: body.email,
    password: body.password,
    name: body.name,
    role: body.role as UserRole | undefined,
  });

  if (!user) {
    return NextResponse.json(
      { error: 'An account with this email already exists.' },
      { status: 409 },
    );
  }

  const session = createSession(user);

  const response = NextResponse.json(
    {
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      sessionId: session.sessionId,
      expiresAt: session.expiresAt,
    },
    { status: 201 },
  );

  response.cookies.set('ek_session', session.sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(session.expiresAt),
    path: '/',
  });

  response.cookies.set('ek_role', user.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(session.expiresAt),
    path: '/',
  });

  return response;
}
