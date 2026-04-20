import Link from "next/link";

/**
 * Business route group layout – wraps all /business/* pages.
 * Requires role === 'business'.
 * TODO: Replace placeholder auth check with real session validation.
 */
export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  // TODO: check session role === 'business' and redirect to /account if insufficient
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Link href="/business">Dashboard</Link>
        <Link href="/business/leads">Leads</Link>
        <Link href="/business/profile">Profile</Link>
      </nav>
      {children}
    </div>
  );
}
