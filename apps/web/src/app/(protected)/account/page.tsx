import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account",
};

/**
 * Account dashboard – overview for any authenticated user.
 * TODO: show listing summary, recent activity, alerts count.
 */
export default function AccountPage() {
  return (
    <main>
      <h1>My Account</h1>
      {/* TODO: replace with real AccountDashboard component */}
      <p>Account dashboard placeholder – not yet implemented.</p>
    </main>
  );
}
