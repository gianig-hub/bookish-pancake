import { PlaceholderPage } from "@/components/PlaceholderPage";

/**
 * Services Marketplace page
 * TODO: Implement service listing with categories (installation, servicing, repair, cold rooms, maintenance, etc.)
 * TODO: Add location-based filtering (UK regions/postcodes)
 * TODO: Connect to real service listings from DB
 * TODO: Add AI-assisted service matching
 */
export default function ServicesPage() {
  return (
    <PlaceholderPage
      title="Services Marketplace"
      description="Find AC installation, refrigeration repair, cold room services, and more from vetted UK professionals."
      todoNote="Implement service listing with categories, location filters, and real business data from DB."
      links={[
        { href: "/businesses", label: "Browse Businesses" },
        { href: "/post-ad", label: "Post a Service Request" },
      ]}
    />
  );
}
