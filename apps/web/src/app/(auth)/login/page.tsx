/**
 * Login page — email/password auth shell.
 *
 * TODO: Connect form submission to /api/v1/auth/login.
 * TODO: Replace alert() with proper toast/error UI.
 * TODO: Add "Forgot password" link when reset flow is built.
 * TODO: Add OAuth / social login buttons when ready.
 */

'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import type { User } from '@ek/types';

// Inner component — useSearchParams must live inside a <Suspense> boundary
// in Next.js 15+.
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/account';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Replace with real fetch to process.env.NEXT_PUBLIC_API_URL
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Login failed. Please try again.');
        return;
      }

      login(data.sessionId, data.user as User);
      router.push(redirect);
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: '4rem auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Sign in</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 6 }}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 6 }}
          />
        </div>

        {error && (
          <p role="alert" style={{ color: '#dc2626', fontSize: '0.875rem' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.6rem 1rem',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', fontSize: '0.875rem' }}>
        Don&apos;t have an account?{' '}
        <a href="/register" style={{ color: '#2563eb' }}>
          Create one
        </a>
      </p>
      {/* TODO: Add forgot-password link */}
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
