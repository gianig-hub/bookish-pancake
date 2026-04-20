import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leads | EK Marketplace',
};

// TODO: fetch leads from GET /api/business/leads
// TODO: lead = buyer enquiry linked to a business listing
export default function BusinessLeadsPage() {
  return (
    <main>
      <h1>Leads</h1>
      <p>TODO: list of buyer enquiries — contact details, message, listing reference</p>
      {/* TODO: lead status (new / contacted / closed) */}
      {/* TODO: mark as contacted action */}
    </main>
  );
}
