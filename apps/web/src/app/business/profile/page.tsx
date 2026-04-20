import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Profile | EK Marketplace',
};

// TODO: fetch business profile from GET /api/business/me/profile
// TODO: PUT /api/business/me/profile to save changes
export default function BusinessProfilePage() {
  return (
    <main>
      <h1>Business Profile</h1>
      <p>TODO: business name, logo, description, trading address, contact details</p>
      {/* TODO: accreditations / certifications */}
      {/* TODO: service areas (UK regions) */}
    </main>
  );
}
