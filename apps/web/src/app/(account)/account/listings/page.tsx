import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Listings" };

export default function AccountListingsPage() {
  // TODO: Fetch listings for the authenticated user from /api/users/:id/listings
  return (
    <>
      <h1>My Listings</h1>
      <p style={{ color: "#6b7280" }}>
        Your active and draft listings will appear here.
        {/* TODO: listing cards, status filters, post-new CTA */}
      </p>
    </>
  );
}
