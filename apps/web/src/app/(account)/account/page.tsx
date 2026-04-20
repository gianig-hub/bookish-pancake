import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Account" };

export default function AccountPage() {
  // TODO: Fetch real user data from session/API
  return (
    <>
      <h1>My Account</h1>
      <p style={{ color: "#6b7280" }}>
        {/* TODO: Display real user name and account type */}
        Account overview will appear here once auth is wired up.
      </p>
    </>
  );
}
