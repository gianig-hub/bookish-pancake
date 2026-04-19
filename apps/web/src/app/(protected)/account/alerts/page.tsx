import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Alerts",
};

/**
 * User's saved search alerts.
 * TODO: fetch and manage alerts from API.
 */
export default function AccountAlertsPage() {
  return (
    <main>
      <h1>My Alerts</h1>
      {/* TODO: replace with real AlertsManager component */}
      <p>Alerts placeholder – not yet implemented.</p>
    </main>
  );
}
