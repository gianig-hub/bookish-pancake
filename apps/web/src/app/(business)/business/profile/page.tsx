import type { Metadata } from "next";

export const metadata: Metadata = { title: "Business Profile" };

export default function BusinessProfilePage() {
  // TODO: fetch & update business profile via /api/business/:id/profile
  return (
    <>
      <h1>Business Profile</h1>
      <p style={{ color: "#6b7280" }}>
        {/* TODO: editable business profile form – name, description, accreditations, logo */}
        Your public business profile will appear here.
      </p>
    </>
  );
}
