import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EK Marketplace — UK Air Conditioning & Refrigeration Marketplace",
  description:
    "Find AC installation, refrigeration services, equipment listings, and businesses across the UK.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-200 bg-white">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <a href="/" className="text-xl font-bold text-blue-700">
              EK Marketplace
            </a>
            <ul className="flex gap-6 text-sm font-medium text-gray-600">
              <li>
                <a href="/marketplace" className="hover:text-blue-700">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-blue-700">
                  Services
                </a>
              </li>
              <li>
                <a href="/businesses" className="hover:text-blue-700">
                  Businesses
                </a>
              </li>
              <li>
                <a href="/help" className="hover:text-blue-700">
                  Help
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-700">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-700">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/account"
                  className="rounded-md bg-blue-700 px-3 py-1 text-white hover:bg-blue-800"
                >
                  My Account
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t border-gray-200 py-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} EK Marketplace. All rights reserved.</p>
          <p className="mt-1">
            <a href="/about" className="hover:underline">
              About
            </a>{" "}
            ·{" "}
            <a href="/contact" className="hover:underline">
              Contact
            </a>{" "}
            ·{" "}
            <a href="/help" className="hover:underline">
              Help
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
