import type { Metadata } from "next";

export const metadata: Metadata = { title: "Moderation" };

export default function AdminModerationPage() {
  // TODO: fetch pending listings/reports from /api/admin/moderation
  return (
    <>
      <h1>Moderation</h1>
      <p style={{ color: "#6b7280" }}>
        {/* TODO: queued listings for review, flagged content, reported users */}
        Listings pending review will appear here.
      </p>
    </>
  );
}
