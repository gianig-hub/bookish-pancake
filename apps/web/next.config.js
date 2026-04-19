/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Transpile shared packages from the monorepo
  transpilePackages: ['@ek/ui', '@ek/config', '@ek/types'],

  // Image domains (add S3/CDN domains in production)
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },

  // Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_APP_NAME: 'EK Marketplace',
    NEXT_PUBLIC_APP_URL: process.env.APP_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig
