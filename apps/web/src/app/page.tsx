import Link from "next/link";

const categories = [
  { href: "/marketplace", icon: "❄️", label: "Equipment", description: "Buy & sell AC and refrigeration units" },
  { href: "/services", icon: "🔧", label: "Services", description: "Find installation, repair, and maintenance" },
  { href: "/businesses", icon: "🏢", label: "Businesses", description: "Browse verified UK trade businesses" },
  { href: "/wanted-ads", icon: "📋", label: "Wanted Ads", description: "Post or browse equipment wanted ads" },
  { href: "/guides", icon: "📖", label: "Guides", description: "Expert guides on AC & refrigeration" },
  { href: "/pricing", icon: "💷", label: "Pricing", description: "Plans for sellers, traders, and dealers" },
];

/**
 * EK Marketplace MVP Home Page
 * TODO: Replace hero search with AI-powered semantic search
 * TODO: Replace category grid with real listing counts from DB
 * TODO: Add featured listings carousel
 * TODO: Add recent activity / new listings feed
 */
export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-700 to-sky-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            UK&apos;s AC &amp; Refrigeration Marketplace
          </h1>
          <p className="text-lg md:text-xl text-sky-100 mb-8">
            Buy, sell, and find services for air conditioning, refrigeration, cold rooms &amp; more
          </p>

          {/* Search bar — placeholder */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            {/* TODO: Wire up to real search (AI-powered semantic search planned) */}
            <input
              type="text"
              placeholder="Search for equipment, services, or businesses…"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
              disabled
            />
            <button
              disabled
              className="bg-amber-400 text-gray-900 px-6 py-3 rounded-md text-sm font-semibold hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>
          <p className="mt-3 text-sky-200 text-xs">
            🚧 Search coming soon — <Link href="/post-ad" className="underline">Post an Ad</Link> or <Link href="/marketplace" className="underline">Browse Listings</Link>
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Explore the Marketplace
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-sky-300 hover:shadow-md transition-all group"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                  {cat.label}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-sky-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">Ready to sell or list?</h2>
            <p className="text-sky-100 mt-1">Post your ad in minutes — free for private sellers.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/post-ad"
              className="bg-white text-sky-700 px-6 py-3 rounded-md font-semibold hover:bg-sky-50 transition-colors"
            >
              Post an Ad
            </Link>
            <Link
              href="/register"
              className="border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-sky-600 transition-colors"
            >
              Register Free
            </Link>
          </div>
        </div>
      </section>

      {/* Placeholder content notice */}
      <section className="py-8 px-4 bg-amber-50 border-y border-amber-100">
        <div className="max-w-4xl mx-auto text-center text-amber-800 text-sm">
          <strong>🚧 MVP Shell:</strong> This is the EK Marketplace development preview.
          Most sections are placeholders — real listings, search, and user accounts are coming soon.
        </div>
      </section>
    </div>
  );
}
