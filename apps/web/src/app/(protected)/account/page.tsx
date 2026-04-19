/**
 * /account — personal account dashboard.
 *
 * Accessible to any authenticated user.
 * TODO: Build out with listings, favourites, messages, and subscription sections.
 */

'use client';

import { useAuth } from '../../../contexts/AuthContext';

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>My Account</h1>
      <p>
        Welcome back, <strong>{user?.name ?? user?.email}</strong>.
      </p>
      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
        Role: <code>{user?.role}</code>
      </p>

      {/* TODO: Add sections for My Listings, Favourites, Alerts, Messages */}
      <section style={{ marginTop: '2rem' }}>
        <h2>My Listings</h2>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          No listings yet. {/* TODO: Link to post-ad flow */}
        </p>
      </section>
    </div>
  );
}
