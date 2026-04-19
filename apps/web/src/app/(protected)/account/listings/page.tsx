import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Listings",
};

/**
 * User's active listings.
 * TODO: fetch listings from API and display with status badges.
 */
export default function AccountListingsPage() {
  return (
    <main>
      <h1>My Listings</h1>
      {/* TODO: replace with real ListingsTable component */}
      <p>Listings placeholder – not yet implemented.</p>
    </main>
  );
}
