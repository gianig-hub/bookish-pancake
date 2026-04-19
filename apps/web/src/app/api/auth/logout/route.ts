/**
 * Next.js Route Handler — /api/auth/logout
 *
 * Clears session cookies.
 */

import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '../../../../lib/session';

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get('ek_session')?.value;
  if (sessionId) {
    deleteSession(sessionId);
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.delete('ek_session');
  response.cookies.delete('ek_role');
  return response;
}
