import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Favourites",
};

/**
 * User's saved/favourited listings.
 * TODO: fetch saved listings from API.
 */
export default function AccountFavouritesPage() {
  return (
    <main>
      <h1>My Favourites</h1>
      {/* TODO: replace with real FavouritesList component */}
      <p>Favourites placeholder – not yet implemented.</p>
    </main>
  );
}
