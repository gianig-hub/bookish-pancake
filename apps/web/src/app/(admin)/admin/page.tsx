import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Dashboard" };

export default function AdminPage() {
  // TODO: fetch platform stats from /api/admin/stats
  return (
    <>
      <h1>Admin Dashboard</h1>
      <p style={{ color: "#6b7280" }}>
        {/* TODO: stats – total users, listings, pending moderation, revenue */}
        Platform overview will appear here.
      </p>
    </>
  );
}
