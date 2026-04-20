import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account | EK Marketplace',
};

// TODO: add server-side auth guard — redirect to /login if not authenticated
// TODO: fetch user profile from API
export default function AccountPage() {
  return (
    <main>
      <h1>My Account</h1>
      <nav>
        <ul>
          <li><a href="/account/listings">My Listings</a></li>
          <li><a href="/account/favourites">Favourites</a></li>
          <li><a href="/account/alerts">Alerts</a></li>
        </ul>
      </nav>
      {/* TODO: account overview — recent activity, subscription status */}
    </main>
  );
}
