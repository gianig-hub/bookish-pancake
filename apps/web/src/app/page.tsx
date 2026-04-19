export default function HomePage() {
  return (
    <main
      style={{
        fontFamily: "sans-serif",
        maxWidth: 800,
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
        🧊 EK Marketplace
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#555", marginBottom: "2rem" }}>
        The UK specialist marketplace for air conditioning, refrigeration, cold
        rooms &amp; freezer rooms.
      </p>

      <section style={{ marginBottom: "2rem" }}>
        <h2>What we offer</h2>
        <ul>
          <li>🔧 AC &amp; Refrigeration Services</li>
          <li>🛒 Equipment Marketplace — buy, sell, trade</li>
          <li>🏢 Business &amp; Dealer Directory</li>
          <li>📋 Wanted Ads</li>
          <li>📚 Guides &amp; Industry News</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2>Coming Soon</h2>
        <p>
          We&apos;re building a modern, AI-assisted UK marketplace for the
          cooling industry. Register your interest and be first to know when we
          launch.
        </p>
      </section>

      <footer style={{ marginTop: "4rem", color: "#999", fontSize: "0.875rem" }}>
        &copy; {new Date().getFullYear()} EK Marketplace. All rights reserved.
      </footer>
    </main>
  );
}
