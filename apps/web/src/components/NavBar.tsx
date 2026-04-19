import Link from "next/link";

const navLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/services", label: "Services" },
  { href: "/businesses", label: "Businesses" },
  { href: "/wanted-ads", label: "Wanted Ads" },
  { href: "/guides", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
];

export function NavBar() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-sky-600">EK Marketplace</span>
          </Link>

          {/* Main nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-sky-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth / CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/post-ad"
              className="bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-700 transition-colors"
            >
              Post an Ad
            </Link>
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-sky-600 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
