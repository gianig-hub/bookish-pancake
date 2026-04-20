import Link from "next/link";

/**
 * Account route group layout – wraps all /account/* pages.
 * TODO: Replace placeholder auth check with real session validation.
 */
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  // TODO: check session here via getServerSession / auth() and redirect to /login if unauthenticated
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
        <Link href="/account">Overview</Link>
        <Link href="/account/listings">Listings</Link>
        <Link href="/account/favourites">Favourites</Link>
        <Link href="/account/alerts">Alerts</Link>
      </nav>
      {children}
    </div>
  );
}
