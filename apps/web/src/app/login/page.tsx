"use client";

/**
 * Login page
 * TODO: Implement auth with NextAuth.js or Clerk
 * TODO: Support email/password + Google/Apple OAuth
 * TODO: Add "Forgot password" flow
 * TODO: Redirect to account/dashboard after login
 */
export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
      <p className="text-gray-600 mb-8">Sign in to your EK Marketplace account.</p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            disabled
          />
        </div>
        <button
          type="submit"
          disabled
          className="w-full bg-sky-600 text-white py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-sky-600 hover:underline">Register free</a>
      </p>

      <p className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-4 py-2">
        <strong>TODO:</strong> Implement with NextAuth.js or Clerk. Auth is disabled in this MVP shell.
      </p>
    </div>
  );
}
