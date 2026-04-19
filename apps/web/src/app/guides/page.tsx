import { PlaceholderPage } from "@/components/PlaceholderPage";

/**
 * Guides & Blog page
 * TODO: Implement guides/blog with categories (installation guides, buying guides, maintenance tips, industry news)
 * TODO: Build individual guide pages (/guides/[slug])
 * TODO: Add SEO-optimised content for key UK AC and refrigeration topics
 * TODO: Consider AI-assisted content generation (with human review)
 */
export default function GuidesPage() {
  return (
    <PlaceholderPage
      title="Guides & Resources"
      description="Expert guides on air conditioning, refrigeration, cold rooms, and related services for UK buyers and businesses."
      todoNote="Implement guides/blog with categories, individual guide pages, and SEO-optimised content."
      links={[
        { href: "/help", label: "Help & FAQ" },
        { href: "/contact", label: "Suggest a Guide" },
      ]}
    />
  );
}
