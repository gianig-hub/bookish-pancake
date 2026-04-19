import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

/**
 * Public homepage – landing page for EK Marketplace.
 * TODO: replace with real marketing/browse content.
 */
export default function HomePage() {
  return (
    <main>
      <h1>EK Marketplace</h1>
      <p>AI-first UK marketplace for HVAC/R equipment, parts, tools, and services.</p>
      {/* TODO: add hero section, category browser, featured listings */}
    </main>
  );
}
