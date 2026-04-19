import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Leads",
};

/**
 * Business leads inbox.
 * TODO: fetch leads from API and render as a filterable table.
 */
export default function BusinessLeadsPage() {
  return (
    <main>
      <h1>Leads</h1>
      {/* TODO: replace with real LeadsTable component */}
      <p>Leads placeholder – not yet implemented.</p>
    </main>
  );
}
