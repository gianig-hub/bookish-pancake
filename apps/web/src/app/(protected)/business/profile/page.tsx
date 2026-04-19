import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Profile",
};

/**
 * Business public profile editor.
 * TODO: load and save business profile via API.
 */
export default function BusinessProfilePage() {
  return (
    <main>
      <h1>Business Profile</h1>
      {/* TODO: replace with real BusinessProfileForm component */}
      <p>Business profile placeholder – not yet implemented.</p>
    </main>
  );
}
