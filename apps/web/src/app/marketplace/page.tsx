import { PlaceholderPage } from "@/components/PlaceholderPage";

/**
 * Equipment Marketplace page
 * TODO: Implement listing grid with category filters (AC units, fridges, freezers, cold rooms, parts, tools, etc.)
 * TODO: Add search, sort, pagination
 * TODO: Connect to real listings from DB
 * TODO: Add AI-assisted search
 */
export default function MarketplacePage() {
  return (
    <PlaceholderPage
      title="Equipment Marketplace"
      description="Browse and buy used, new, and refurbished AC and refrigeration equipment across the UK."
      todoNote="Implement listing grid with category filters, search, pagination, and real data from DB."
      links={[
        { href: "/post-ad", label: "Post an Ad" },
        { href: "/wanted-ads", label: "Post a Wanted Ad" },
      ]}
    />
  );
}
