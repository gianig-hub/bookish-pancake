import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business | EK Marketplace',
};

// TODO: shared business layout with sidebar nav
export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* TODO: business sidebar navigation */}
      <aside>
        <nav>
          <ul>
            <li><a href="/business">Dashboard</a></li>
            <li><a href="/business/leads">Leads</a></li>
            <li><a href="/business/profile">Profile</a></li>
          </ul>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
