import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moderation Queue",
};

/**
 * Content moderation queue.
 * TODO: fetch flagged listings/ads from API and render approve/reject workflow.
 */
export default function AdminModerationPage() {
  return (
    <main>
      <h1>Moderation Queue</h1>
      {/* TODO: replace with real ModerationQueue component */}
      <p>Moderation queue placeholder – not yet implemented.</p>
    </main>
  );
}
