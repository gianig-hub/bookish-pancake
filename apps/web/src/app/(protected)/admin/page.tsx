/**
 * /admin — admin panel.
 *
 * Restricted to: admin only.
 * Uses AdminGuard for role enforcement.
 * TODO: Build out with moderation queue, user management, content tools.
 */

'use client';

import { AdminGuard } from '../../../components/guards/RoleGuard';

export default function AdminPage() {
  return (
    <AdminGuard>
      <div>
        <h1>Admin Panel</h1>
        <p>Platform administration and moderation tools.</p>

        {/* TODO: Add sections for moderation queue, user management, AI tools */}
        <section style={{ marginTop: '2rem' }}>
          <h2>Moderation Queue</h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Empty. {/* TODO: Wire up listing moderation */}
          </p>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Users</h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            {/* TODO: Add user listing and management */}
            No users loaded.
          </p>
        </section>
      </div>
    </AdminGuard>
  );
}
