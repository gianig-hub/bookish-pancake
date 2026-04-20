import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account | EK Marketplace',
};

// TODO: shared account layout with sidebar nav
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* TODO: account sidebar navigation component */}
      <aside>
        <nav>
          <ul>
            <li><a href="/account">Overview</a></li>
            <li><a href="/account/listings">My Listings</a></li>
            <li><a href="/account/favourites">Favourites</a></li>
            <li><a href="/account/alerts">Alerts</a></li>
          </ul>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
