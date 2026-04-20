import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EK Marketplace',
  description: 'UK marketplace for air conditioning, refrigeration, cold rooms, and more',
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
