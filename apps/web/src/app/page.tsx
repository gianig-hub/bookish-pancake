import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EK Marketplace – HVAC-R Equipment & Services",
};

export default function HomePage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h1>EK Marketplace</h1>
      <p>
        AI-first UK marketplace for air conditioning, refrigeration, cold rooms,
        freezer rooms, parts, tools, wanted ads, businesses, and services.
      </p>

      {/* TODO: Replace with real homepage hero/search once public shell is built */}
      <nav style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/account">My Account</Link>
        <Link href="/business">Business Dashboard</Link>
      </nav>
    </main>
  );
}
