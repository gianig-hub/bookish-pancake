import type { Listing } from "@ek-marketplace/types";
import FeaturedListings from "@/components/FeaturedListings";

const SAMPLE_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Industrial Welding Machine",
    description: "Heavy-duty MIG welder, barely used.",
    price: 1200,
    currency: "GBP",
    category: "equipment",
    status: "active",
    sellerId: "user-1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    location: "Manchester, UK",
  },
  {
    id: "2",
    title: "Forklift Maintenance Service",
    description: "Professional forklift servicing, all makes and models.",
    category: "services",
    status: "active",
    sellerId: "user-2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    location: "Birmingham, UK",
  },
  {
    id: "3",
    title: "Wanted: CNC Milling Machine",
    description: "Looking for a used CNC mill in good condition.",
    category: "wanted",
    status: "active",
    sellerId: "user-3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    location: "London, UK",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-blue-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">EK Marketplace</h1>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Buy, sell, and discover equipment, services, and businesses — all in
          one place.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="#listings"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Browse Listings
          </a>
          <a
            href="#"
            className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Post an Ad
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Browse Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Equipment", "Services", "Wanted Ads", "Businesses"].map(
              (cat) => (
                <div
                  key={cat}
                  className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition cursor-pointer"
                >
                  <span className="font-medium text-gray-700">{cat}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section id="listings" className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Featured Listings</h2>
          <FeaturedListings listings={SAMPLE_LISTINGS} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6 text-sm">
        © {new Date().getFullYear()} EK Marketplace. All rights reserved.
      </footer>
    </main>
  );
}
