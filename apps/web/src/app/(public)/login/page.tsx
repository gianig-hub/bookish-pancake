import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

/**
 * Login page – email + password sign-in form.
 * TODO: connect to POST /auth/login API endpoint.
 * TODO: add OAuth buttons (Google, Apple) when feature flags enable them.
 */
export default function LoginPage() {
  return (
    <main>
      <h1>Sign in to EK Marketplace</h1>
      {/* TODO: replace with real LoginForm component */}
      <p>Login form placeholder – not yet implemented.</p>
    </main>
  );
}
