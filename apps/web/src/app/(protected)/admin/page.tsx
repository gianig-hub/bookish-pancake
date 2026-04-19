import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

/**
 * Admin overview.
 * TODO: show platform stats, flagged content count, pending moderation.
 */
export default function AdminPage() {
  return (
    <main>
      <h1>Admin</h1>
      {/* TODO: replace with real AdminOverview component */}
      <p>Admin overview placeholder – not yet implemented.</p>
    </main>
  );
}
