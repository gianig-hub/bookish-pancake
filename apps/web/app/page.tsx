export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      {/* Hero */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-blue-700">
          EK Marketplace
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
          The UK&apos;s specialist marketplace for air conditioning, refrigeration,
          cold rooms, and related equipment &amp; services.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/marketplace"
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Browse Equipment
          </a>
          <a
            href="/services"
            className="rounded-lg border border-blue-700 px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50"
          >
            Find a Service
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Browse by Category</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "AC Units", href: "/marketplace", emoji: "❄️" },
            { label: "Refrigeration", href: "/marketplace", emoji: "🧊" },
            { label: "Cold Rooms", href: "/marketplace", emoji: "🏠" },
            { label: "Parts & Tools", href: "/marketplace", emoji: "🔧" },
          ].map(({ label, href, emoji }) => (
            <a
              key={label}
              href={href}
              className="flex flex-col items-center rounded-xl border border-gray-200 p-6 text-center hover:border-blue-300 hover:shadow-md"
            >
              <span className="mb-3 text-4xl">{emoji}</span>
              <span className="font-semibold">{label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="mb-8 text-center text-2xl font-bold">Quick Links</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Find a Business", href: "/businesses", desc: "Search verified traders and dealers" },
            { label: "Services", href: "/services", desc: "Get quotes for installation and repair" },
            { label: "Help Centre", href: "/help", desc: "FAQs, guides and support" },
          ].map(({ label, href, desc }) => (
            <a
              key={label}
              href={href}
              className="rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md"
            >
              <h3 className="mb-1 font-bold">{label}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
