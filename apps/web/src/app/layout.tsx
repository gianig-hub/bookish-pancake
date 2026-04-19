import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'KoldMarket — UK Marketplace for AC & Refrigeration',
    template: '%s | KoldMarket',
  },
  description:
    'Find and list AC units, refrigeration equipment, cold room gear, parts, and services across the UK.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
