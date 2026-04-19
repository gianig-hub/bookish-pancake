import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EK Marketplace — AC & Refrigeration Equipment UK',
  description:
    'Find and post AC, refrigeration, and cold room equipment listings. Connect with UK businesses, dealers, and service providers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
