"use client";

/**
 * Register page
 * TODO: Implement registration with NextAuth.js or Clerk
 * TODO: Support email/password and OAuth (Google, Apple)
 * TODO: Add account type selection (buyer, seller, business)
 * TODO: Add email verification flow
 * TODO: Connect to DB to create user profile
 */
export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
      <p className="text-gray-600 mb-8">Join EK Marketplace — free for buyers and private sellers.</p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            disabled
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            disabled
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Choose a strong password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
          <div className="grid grid-cols-3 gap-2">
            {["Buyer", "Seller", "Business"].map((type) => (
              <button
                key={type}
                type="button"
                disabled
                className="border border-gray-200 rounded-md py-2 text-sm text-gray-600 hover:border-sky-400 hover:bg-sky-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          disabled
          className="w-full bg-sky-600 text-white py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-sky-600 hover:underline">Sign in</a>
      </p>

      <p className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-4 py-2">
        <strong>TODO:</strong> Implement with NextAuth.js or Clerk. Registration is disabled in this MVP shell.
      </p>
    </div>
  );
}
