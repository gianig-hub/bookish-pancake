/**
 * Protected layout — wraps all routes under /(protected).
 *
 * Uses the RoleGuard client component to enforce authentication.
 * If no user is present, redirects to /login.
 *
 * TODO: Replace with server-side session check once sessions are persisted.
 */

'use client';

import React from 'react';
import { RoleGuard } from '../../components/guards/RoleGuard';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <RoleGuard roles={[]}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar nav — TODO: build out with proper nav links */}
        <aside
          style={{
            width: 200,
            padding: '2rem 1rem',
            background: '#f3f4f6',
            borderRight: '1px solid #e5e7eb',
          }}
        >
          <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '1rem' }}>
            Signed in as <strong>{user?.email}</strong>
          </p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="/account">My Account</a>
            {['dealer', 'business', 'admin'].includes(user?.role ?? '') && (
              <a href="/business">Business Dashboard</a>
            )}
            {user?.role === 'admin' && <a href="/admin">Admin</a>}
          </nav>
        </aside>
        <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
      </div>
    </RoleGuard>
  );
}
