import { PlaceholderPage } from "@/components/PlaceholderPage";

/**
 * Business Directory page
 * TODO: Implement business directory with search, filtering by trade type, location, rating
 * TODO: Build business profile pages (/businesses/[slug])
 * TODO: Add verified badge for registered businesses
 * TODO: Connect to business profiles from DB
 */
export default function BusinessesPage() {
  return (
    <PlaceholderPage
      title="Business Directory"
      description="Find and connect with verified UK AC, refrigeration, and cold room businesses, dealers, and installers."
      todoNote="Implement business directory with search, location filters, ratings, and individual profile pages."
      links={[
        { href: "/register", label: "Register Your Business" },
        { href: "/services", label: "Browse Services" },
      ]}
    />
  );
}
