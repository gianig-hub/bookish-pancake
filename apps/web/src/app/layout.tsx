import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EK Marketplace',
  description: "UK's specialist marketplace for air conditioning, refrigeration, cold rooms and freezer rooms.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* TODO: Add Header component */}
        <main>{children}</main>
        {/* TODO: Add Footer component */}
      </body>
    </html>
  );
}
