import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  serverExternalPackages: ['firebase-admin', 'jwks-rsa', 'jose'],
};

export default nextConfig;
