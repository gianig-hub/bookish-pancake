import styles from "./page.module.css";

const categories = [
  { name: "Air Conditioning", icon: "❄️", count: 0 },
  { name: "Refrigeration", icon: "🧊", count: 0 },
  { name: "Heat Pumps", icon: "🔥", count: 0 },
  { name: "Chiller Units", icon: "💧", count: 0 },
  { name: "Cold Rooms", icon: "🏭", count: 0 },
  { name: "Parts & Spares", icon: "🔧", count: 0 },
];

const navLinks = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Services", href: "/services" },
  { label: "Businesses", href: "/businesses" },
  { label: "Wanted Ads", href: "/wanted" },
  { label: "Pricing", href: "/pricing" },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoIcon}>❄️</span>
            <span>EK Marketplace</span>
          </a>
          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className={styles.headerActions}>
            <a href="/post-ad" className={styles.btnPrimary}>
              Post an Ad
            </a>
            <a href="/login" className={styles.btnSecondary}>
              Sign In
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            The UK&apos;s Niche Marketplace for{" "}
            <span className={styles.heroHighlight}>
              Cooling &amp; Refrigeration
            </span>
          </h1>
          <p className={styles.heroSubtitle}>
            Buy, sell and find AC equipment, refrigeration units, cold rooms,
            heat pumps, and cooling services across the UK.
          </p>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search for equipment, services, businesses..."
              className={styles.searchInput}
            />
            <button className={styles.searchBtn}>Search</button>
          </div>
          <div className={styles.heroBadges}>
            <span className={styles.badge}>🤖 AI-Powered Search</span>
            <span className={styles.badge}>🇬🇧 UK-Based</span>
            <span className={styles.badge}>✅ Verified Traders</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Browse by Category</h2>
          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={`/marketplace/${cat.name.toLowerCase().replace(/ /g, "-")}`}
                className={styles.categoryCard}
              >
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <span className={styles.categoryName}>{cat.name}</span>
                <span className={styles.categoryCount}>
                  {cat.count} listings
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3>Post Your Ad</h3>
              <p>
                List your cooling equipment or service in minutes with
                AI-assisted descriptions.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3>Get Found</h3>
              <p>
                Buyers discover your listing via search, category pages, and
                AI-powered recommendations.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3>Connect &amp; Trade</h3>
              <p>
                Message buyers, arrange collection or delivery, and complete
                your trade safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Ready to list your equipment?</h2>
          <p>Free listings for private sellers. Paid plans for traders and businesses.</p>
          <a href="/post-ad" className={styles.btnPrimaryLg}>
            Post a Free Ad
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>
            &copy; {new Date().getFullYear()} EK Marketplace. All rights
            reserved.
          </p>
          <nav className={styles.footerNav}>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
