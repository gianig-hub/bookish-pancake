import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: add image domains when media uploads are implemented
  reactStrictMode: true,
  transpilePackages: ["@ek/ui", "@ek/config", "@ek/types"],
};

export default nextConfig;
