import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Dashboard",
};

/**
 * Business dashboard overview.
 * TODO: show lead summary, profile completeness, active boosts.
 */
export default function BusinessPage() {
  return (
    <main>
      <h1>Business Dashboard</h1>
      {/* TODO: replace with real BusinessDashboard component */}
      <p>Business dashboard placeholder – not yet implemented.</p>
    </main>
  );
}
