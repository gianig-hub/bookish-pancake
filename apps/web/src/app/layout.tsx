import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EK Marketplace — AC, Refrigeration & Cold Room Equipment',
  description:
    'UK marketplace for AC, refrigeration, cold rooms, freezer rooms, parts, tools, wanted ads, businesses, and services.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
