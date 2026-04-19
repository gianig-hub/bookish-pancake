export default function HomePage() {
  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>EK Marketplace</h1>
      <p>
        UK specialist marketplace for AC, refrigeration, cold rooms, freezer rooms,
        parts, tools, and services.
      </p>
      <nav style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/account">My Account</a>
      </nav>
      {/* TODO: Add hero section, category browsing, and search bar */}
    </main>
  );
}
