import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | EK Marketplace',
};

// TODO: admin layout with sidebar navigation
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* TODO: admin sidebar nav */}
      <aside>
        <nav>
          <ul>
            <li><a href="/admin">Dashboard</a></li>
            <li><a href="/admin/moderation">Moderation</a></li>
          </ul>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
