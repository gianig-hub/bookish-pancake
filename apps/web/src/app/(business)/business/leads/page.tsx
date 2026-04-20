import type { Metadata } from "next";

export const metadata: Metadata = { title: "Leads" };

export default function BusinessLeadsPage() {
  // TODO: fetch inbound leads from /api/business/:id/leads
  return (
    <>
      <h1>Leads</h1>
      <p style={{ color: "#6b7280" }}>
        Enquiries from buyers will appear here.
        {/* TODO: lead list with contact/status management */}
      </p>
    </>
  );
}
