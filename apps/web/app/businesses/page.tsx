import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Businesses & Dealers — EK Marketplace",
  description: "Browse verified AC and refrigeration businesses, installers, dealers, and suppliers.",
};

export default function BusinessesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">Businesses &amp; Dealers</h1>
      <p className="mb-8 text-gray-600">
        Browse verified AC and refrigeration businesses, installers, dealers, and suppliers across
        the UK.
      </p>

      {/* TODO: Replace with real business directory */}
      <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400">
        <p className="text-lg font-medium">Business directory coming soon</p>
        <p className="mt-2 text-sm">
          TODO: Fetch and display verified business profiles from the backend API.
        </p>
      </div>
    </div>
  );
}
