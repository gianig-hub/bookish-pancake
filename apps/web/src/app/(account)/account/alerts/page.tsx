import type { Metadata } from "next";

export const metadata: Metadata = { title: "Alerts" };

export default function AccountAlertsPage() {
  // TODO: Fetch search-alert subscriptions from /api/users/:id/alerts
  return (
    <>
      <h1>Alerts</h1>
      <p style={{ color: "#6b7280" }}>
        Saved search alerts will appear here.
        {/* TODO: alert list with edit/delete; create-alert CTA */}
      </p>
    </>
  );
}
