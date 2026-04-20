import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Alerts | EK Marketplace',
};

// TODO: fetch saved search alerts from GET /api/alerts
export default function AccountAlertsPage() {
  return (
    <main>
      <h1>My Alerts</h1>
      <p>TODO: saved search alerts — name, criteria, frequency</p>
      {/* TODO: create alert form */}
      {/* TODO: toggle alert active/paused */}
    </main>
  );
}
