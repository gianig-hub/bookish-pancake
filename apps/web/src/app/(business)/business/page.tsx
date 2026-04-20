import type { Metadata } from "next";

export const metadata: Metadata = { title: "Business Dashboard" };

export default function BusinessPage() {
  // TODO: fetch business stats from /api/business/:id/stats
  return (
    <>
      <h1>Business Dashboard</h1>
      <p style={{ color: "#6b7280" }}>
        {/* TODO: stats cards – views, leads, active listings */}
        Your business overview will appear here once your profile is set up.
      </p>
    </>
  );
}
