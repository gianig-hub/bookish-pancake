import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | EK Marketplace',
};

// TODO: requires ADMIN role — guard with role check (server-side)
// TODO: fetch dashboard stats from GET /api/admin/stats
export default function AdminPage() {
  return (
    <main>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><a href="/admin/moderation">Moderation</a></li>
        </ul>
      </nav>
      {/* TODO: site stats — total users, listings, reports, revenue */}
    </main>
  );
}
