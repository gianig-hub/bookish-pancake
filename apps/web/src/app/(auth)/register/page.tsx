/**
 * Register page — email/password account creation shell.
 *
 * TODO: Connect to /api/v1/auth/register.
 * TODO: Add role selection UI (buyer/private_seller/trader/dealer/business).
 * TODO: Add email verification step when the email flow is built.
 * TODO: Add terms & conditions checkbox.
 * TODO: Add OAuth / social signup buttons.
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import type { User, UserRole } from '@ek/types';

const ROLE_LABELS: Record<UserRole, string> = {
  buyer: 'Buyer — browse and contact sellers',
  private_seller: 'Private Seller — sell personal items',
  trader: 'Trader — trade-level selling',
  dealer: 'Dealer — full dealer listing',
  business: 'Business — business dashboard',
  admin: 'Admin',
};

// Roles available at registration (admin assigned separately)
const REGISTRATION_ROLES: UserRole[] = [
  'buyer',
  'private_seller',
  'trader',
  'dealer',
  'business',
];

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('buyer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setLoading(false);
      return;
    }

    try {
      // TODO: Replace with real fetch to process.env.NEXT_PUBLIC_API_URL
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Registration failed. Please try again.');
        return;
      }

      login(data.sessionId, data.user as User);
      router.push('/account');
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 460, margin: '4rem auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Create account</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
            Name <span style={{ color: '#6b7280' }}>(optional)</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 6 }}
          />
        </div>

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
            Password <span style={{ color: '#6b7280' }}>(min. 8 characters)</span>
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 6 }}
          />
        </div>

        <div>
          <label htmlFor="role" style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
            Account type
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: 6 }}
          >
            {REGISTRATION_ROLES.map((r) => (
              <option key={r} value={r}>
                {ROLE_LABELS[r]}
              </option>
            ))}
          </select>
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
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', fontSize: '0.875rem' }}>
        Already have an account?{' '}
        <a href="/login" style={{ color: '#2563eb' }}>
          Sign in
        </a>
      </p>
    </main>
  );
}
