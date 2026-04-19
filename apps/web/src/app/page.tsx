export default function HomePage() {
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ borderBottom: '2px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#111827' }}>EK Marketplace</h1>
        <p style={{ color: '#6b7280' }}>
          AI-first UK marketplace for AC, refrigeration &amp; cold room equipment
        </p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { title: 'Equipment', desc: 'Browse AC units, fridges, freezers & more' },
          { title: 'Services', desc: 'Find installation, servicing & repair' },
          { title: 'Businesses', desc: 'Discover dealers & trade suppliers' },
          { title: 'Wanted Ads', desc: 'Post what you are looking for' },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1.25rem',
              background: '#f9fafb',
            }}
          >
            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{card.title}</h2>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{card.desc}</p>
          </div>
        ))}
      </section>

      <footer style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', color: '#9ca3af', fontSize: '0.85rem' }}>
        EK Marketplace — MVP shell · Phase 2 implementation
      </footer>
    </main>
  );
}
