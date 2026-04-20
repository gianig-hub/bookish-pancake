import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Listings | EK Marketplace',
};

// TODO: requires SELLER role — guard with role check
// TODO: fetch listings from GET /api/listings?owner=me
export default function AccountListingsPage() {
  return (
    <main>
      <h1>My Listings</h1>
      <p>TODO: list of user's active, draft, and expired listings</p>
      {/* TODO: post new listing CTA */}
      {/* TODO: listing status badges (active / draft / expired) */}
    </main>
  );
}
