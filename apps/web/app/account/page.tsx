import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account — EK Marketplace",
  description: "Manage your EK Marketplace account, listings, and preferences.",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold">My Account</h1>
      <p className="mb-8 text-gray-600">
        Manage your listings, favourites, messages, and subscription settings.
      </p>

      {/* TODO: Replace with real auth check and account dashboard */}
      <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-400">
        <p className="text-lg font-medium">Account area coming soon</p>
        <p className="mt-2 text-sm">
          TODO: Implement user authentication (login/register) and account dashboard including My
          Listings, Favourites, Alerts, Messages, and Subscription management.
        </p>
      </div>
    </div>
  );
}
