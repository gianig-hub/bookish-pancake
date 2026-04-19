import { PlaceholderPage } from "@/components/PlaceholderPage";

const plans = [
  {
    name: "Buyer",
    price: "Free",
    features: ["Browse listings", "Post wanted ads", "Save favourites", "Message sellers"],
  },
  {
    name: "Private Seller",
    price: "Free",
    features: ["Up to 5 active listings", "Basic listing visibility", "Buyer messages"],
  },
  {
    name: "Seller Plus",
    price: "£9.99/month",
    features: ["Up to 20 listings", "Priority visibility", "Analytics", "Boost credits"],
  },
  {
    name: "Trader Pro",
    price: "£24.99/month",
    features: ["Unlimited listings", "Featured placement", "Trade badge", "Advanced analytics"],
  },
  {
    name: "Dealer / Business",
    price: "£59.99/month",
    features: ["Business profile page", "Logo & branding", "Lead inbox", "Priority support"],
  },
];

/**
 * Pricing page
 * TODO: Wire up to real Stripe subscription plans
 * TODO: Add plan comparison table
 * TODO: Add boost/premium visibility options (Bump Up, Urgent, Featured, etc.)
 * TODO: Connect to user account and subscription management
 */
export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing Plans</h1>
        <p className="text-lg text-gray-600">Simple, transparent pricing for buyers, sellers, traders, and businesses.</p>
        <p className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-4 py-2 inline-block">
          🚧 <strong>TODO:</strong> Connect to Stripe for real subscriptions. Plans below are illustrative only.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:border-sky-300 hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-1">{plan.name}</h2>
            <p className="text-2xl font-bold text-sky-600 mb-4">{plan.price}</p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> {feature}
                </li>
              ))}
            </ul>
            <button
              disabled
              className="w-full bg-sky-600 text-white py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* TODO: Wire to auth + Stripe */}
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
