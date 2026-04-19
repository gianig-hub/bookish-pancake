import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipment Marketplace — EK Marketplace",
  description: "Browse AC units, refrigeration equipment, cold room components, and more.",
};

export default function MarketplacePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">Equipment Marketplace</h1>
      <p className="mb-8 text-gray-600">
        Browse AC units, refrigeration equipment, cold room components, parts, tools, and more.
      </p>

      {/* TODO: Replace with real listing grid fetched from API */}
      <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400">
        <p className="text-lg font-medium">Listings coming soon</p>
        <p className="mt-2 text-sm">
          TODO: Fetch and display equipment listings from the backend API.
        </p>
      </div>
    </div>
  );
}
