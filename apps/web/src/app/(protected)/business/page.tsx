/**
 * /business — business dashboard.
 *
 * Restricted to: dealer, business, admin.
 * Uses BusinessGuard client component for role enforcement.
 * TODO: Build out with lead management, profile editor, FAQ manager.
 */

'use client';

import { BusinessGuard } from '../../../components/guards/RoleGuard';
import { useAuth } from '../../../contexts/AuthContext';

export default function BusinessPage() {
  const { user } = useAuth();

  return (
    <BusinessGuard>
      <div>
        <h1>Business Dashboard</h1>
        <p>
          Manage your business profile, leads, and listings.
        </p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Account type: <code>{user?.role}</code>
        </p>

        {/* TODO: Add sections for Profile, Leads, Reviews, Subscription */}
        <section style={{ marginTop: '2rem' }}>
          <h2>Business Profile</h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Not set up yet. {/* TODO: Link to profile setup wizard */}
          </p>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Leads</h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            No leads yet. {/* TODO: Wire up lead management */}
          </p>
        </section>
      </div>
    </BusinessGuard>
  );
}
