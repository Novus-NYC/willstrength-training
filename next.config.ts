import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json sits above this folder on the build machine.
  // Pin both roots to the repo so Next does not pick the wrong workspace.
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: __dirname,
  // No earlier website exists for the business, so there are no redirects.
};

export default nextConfig;
