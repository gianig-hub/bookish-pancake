import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | EK Marketplace",
    default: "EK Marketplace – UK HVAC/R Equipment & Services",
  },
  description:
    "AI-first UK marketplace for air conditioning, refrigeration, cold rooms, freezer rooms, parts, tools, and services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* TODO: wrap with AuthProvider once session management is implemented */}
        {children}
      </body>
    </html>
  );
}
