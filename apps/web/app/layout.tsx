import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EK Marketplace",
  description: "UK niche marketplace for cooling equipment, AC/refrigeration services, and trade listings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 0 }}>
        <header style={{ background: "#1a1a2e", color: "#fff", padding: "1rem 2rem" }}>
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <strong style={{ fontSize: "1.25rem" }}>⚡ EK Marketplace</strong>
            <a href="/" style={{ color: "#ccc", textDecoration: "none" }}>Home</a>
            <a href="/marketplace" style={{ color: "#ccc", textDecoration: "none" }}>Marketplace</a>
            <a href="/services" style={{ color: "#ccc", textDecoration: "none" }}>Services</a>
            <a href="/contact" style={{ color: "#ccc", textDecoration: "none" }}>Contact</a>
          </nav>
        </header>
        <main style={{ minHeight: "calc(100vh - 120px)", padding: "2rem" }}>
          {children}
        </main>
        <footer style={{ background: "#f5f5f5", padding: "1rem 2rem", textAlign: "center", color: "#666" }}>
          © {new Date().getFullYear()} EK Marketplace — MVP Shell
        </footer>
      </body>
    </html>
  );
}
