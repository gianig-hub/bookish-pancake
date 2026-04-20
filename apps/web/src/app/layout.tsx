import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "EK Marketplace",
    template: "%s | EK Marketplace",
  },
  description:
    "AI-first UK marketplace for air conditioning, refrigeration, cold rooms, freezer rooms, parts, tools, and services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
