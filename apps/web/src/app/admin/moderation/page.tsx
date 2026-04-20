import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moderation | EK Marketplace',
};

// TODO: fetch flagged listings from GET /api/admin/moderation
// TODO: approve / reject / remove actions
export default function AdminModerationPage() {
  return (
    <main>
      <h1>Moderation</h1>
      <p>TODO: queue of flagged / reported listings awaiting review</p>
      {/* TODO: listing preview, flag reason, approve / reject buttons */}
      {/* TODO: pagination */}
    </main>
  );
}
