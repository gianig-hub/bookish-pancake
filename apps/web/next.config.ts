import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: add image domain allowlist when CDN is configured
  transpilePackages: ["@ek/ui", "@ek/config", "@ek/types"],
};

export default nextConfig;
