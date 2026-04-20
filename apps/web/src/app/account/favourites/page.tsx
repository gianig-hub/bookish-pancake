import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favourites | EK Marketplace',
};

// TODO: fetch saved listings from GET /api/favourites
export default function AccountFavouritesPage() {
  return (
    <main>
      <h1>Favourites</h1>
      <p>TODO: saved/favourited listings grid</p>
      {/* TODO: remove from favourites action */}
    </main>
  );
}
