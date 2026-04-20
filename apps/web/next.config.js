/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: enable React strict mode once auth wiring is complete
  reactStrictMode: true,
  transpilePackages: ['@ek/types', '@ek/config'],
};

module.exports = nextConfig;
