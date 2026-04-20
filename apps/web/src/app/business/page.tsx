import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Dashboard | EK Marketplace',
};

// TODO: requires BUSINESS role — guard with role check
// TODO: fetch business overview from GET /api/business/me
export default function BusinessPage() {
  return (
    <main>
      <h1>Business Dashboard</h1>
      <nav>
        <ul>
          <li><a href="/business/leads">Leads</a></li>
          <li><a href="/business/profile">Business Profile</a></li>
        </ul>
      </nav>
      {/* TODO: KPI cards — leads this month, profile views, active listings */}
    </main>
  );
}
