import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EK Marketplace — AC, Refrigeration & Cold Room Equipment UK",
  description:
    "The UK specialist marketplace for air conditioning, refrigeration, cold rooms, freezer rooms, equipment, parts and services.",
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
