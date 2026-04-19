import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — EK Marketplace",
  description: "Learn about EK Marketplace, the UK's specialist platform for air conditioning and refrigeration.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">About EK Marketplace</h1>
      <p className="mb-6 text-gray-600 leading-relaxed">
        EK Marketplace is the UK&apos;s specialist marketplace for air conditioning, refrigeration,
        cold rooms, and related equipment and services.
      </p>
      <p className="mb-6 text-gray-600 leading-relaxed">
        Our platform brings together buyers, sellers, engineers, dealers, and businesses across the
        UK&apos;s cooling industry — making it easier to find equipment, services, and trusted
        professionals.
      </p>
      <p className="text-gray-600 leading-relaxed">
        {/* TODO: Add real about content, team info, and company story */}
        We are currently in the early stages of building out the platform. More information coming
        soon.
      </p>
    </div>
  );
}
