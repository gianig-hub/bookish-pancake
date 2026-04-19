import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — EK Marketplace",
  description: "Find AC installation, refrigeration repair, cold room maintenance services and more.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">Services</h1>
      <p className="mb-8 text-gray-600">
        Find AC installation, refrigeration repair, cold room maintenance, emergency call-out, and
        more from qualified UK engineers.
      </p>

      {/* TODO: Replace with real service categories and search */}
      <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400">
        <p className="text-lg font-medium">Service directory coming soon</p>
        <p className="mt-2 text-sm">
          TODO: Integrate service category pages, search, and quote request flow.
        </p>
      </div>
    </div>
  );
}
