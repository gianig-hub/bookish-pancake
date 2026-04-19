import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
};

/**
 * Registration page – new user sign-up form.
 * TODO: connect to POST /auth/register API endpoint.
 * TODO: add account type selector (personal / business / trade).
 */
export default function RegisterPage() {
  return (
    <main>
      <h1>Create your EK Marketplace account</h1>
      {/* TODO: replace with real RegisterForm component */}
      <p>Registration form placeholder – not yet implemented.</p>
    </main>
  );
}
