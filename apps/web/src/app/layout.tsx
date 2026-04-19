import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EK Marketplace — Cooling & Refrigeration Equipment",
  description:
    "The UK niche marketplace for cooling equipment, AC services, refrigeration trade listings, and business directory.",
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
