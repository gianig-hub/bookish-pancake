"use client";

/**
 * Post an Ad page
 * TODO: Implement full multi-step post-ad flow:
 *   1. Choose listing type (For Sale / Wanted / Service Request)
 *   2. Category selection (AC, Refrigeration, Cold Room, Parts, etc.)
 *   3. Listing details (title, description, condition, price, location, photos)
 *   4. Plan selection (Free / Paid boosts)
 *   5. Preview and submit
 * TODO: Add AI-assisted title, description, and category suggestions
 * TODO: Require auth — redirect to /login if not authenticated
 * TODO: Connect to DB to save listings
 */
export default function PostAdPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Post an Ad</h1>
      <p className="text-gray-600 mb-8">
        List your AC unit, refrigeration equipment, parts, or service — quickly and for free.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-md px-4 py-3 text-sm text-amber-800 mb-8">
        <strong>TODO:</strong> Implement multi-step post-ad flow with auth check, category selection,
        listing details form, optional boosts, and DB submission.
        AI-assisted title/description generation planned.
      </div>

      <div className="grid grid-cols-1 gap-4">
        {["For Sale", "Wanted", "Service Request"].map((type) => (
          <button
            key={type}
            disabled
            className="w-full border-2 border-gray-200 rounded-xl p-6 text-left hover:border-sky-300 hover:bg-sky-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <h2 className="font-semibold text-gray-900">{type}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {type === "For Sale" && "Sell equipment, parts, or tools"}
              {type === "Wanted" && "Looking for something specific? Let sellers find you"}
              {type === "Service Request" && "Request AC, refrigeration, or cold room services"}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
