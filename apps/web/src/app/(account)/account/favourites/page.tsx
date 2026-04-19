import type { Metadata } from "next";

export const metadata: Metadata = { title: "Favourites" };

export default function AccountFavouritesPage() {
  // TODO: Fetch favourited listings from /api/users/:id/favourites
  return (
    <>
      <h1>Favourites</h1>
      <p style={{ color: "#6b7280" }}>
        Listings you&apos;ve saved will appear here.
        {/* TODO: listing cards with remove-from-favourites action */}
      </p>
    </>
  );
}
