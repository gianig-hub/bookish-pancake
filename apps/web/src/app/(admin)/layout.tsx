import Link from "next/link";

/**
 * Admin route group layout – wraps all /admin/* pages.
 * Requires role === 'admin' or 'moderator'.
 * TODO: Replace placeholder auth check with real session validation.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // TODO: check session role is 'admin' or 'moderator', redirect to / if not
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>
      <header
        style={{
          background: "#1e293b",
          color: "#f1f5f9",
          padding: "0.75rem 1.5rem",
          borderRadius: 6,
          marginBottom: "2rem",
        }}
      >
        <strong>Admin Panel</strong>
      </header>
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/moderation">Moderation</Link>
      </nav>
      {children}
    </div>
  );
}
