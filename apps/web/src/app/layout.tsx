import type { Metadata } from 'next';
import { AuthProvider } from '../contexts/AuthContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'EK Marketplace — UK HVAC & Refrigeration',
  description: 'Buy, sell, and find services for AC, refrigeration, cold rooms, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
