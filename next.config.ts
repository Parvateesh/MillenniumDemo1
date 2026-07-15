import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  serverExternalPackages: ['firebase-admin', 'jwks-rsa', 'jose'],

  async headers() {
    return [
      {
        source: '/:path*.(webp|png|jpg|jpeg|svg|ico|woff2|woff)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },

  async redirects() {
    return [
      // Old Hostinger template URLs → new pages (301 permanent)
      { source: '/about-us',          destination: '/about',   permanent: true },
      { source: '/about-us/',         destination: '/about',   permanent: true },
      { source: '/contact/',          destination: '/contact', permanent: true },
      { source: '/privacy-policy',    destination: '/privacy', permanent: true },
      { source: '/privacy-policy/',   destination: '/privacy', permanent: true },
      { source: '/terms-of-service',  destination: '/terms',   permanent: true },
      { source: '/terms-of-service/', destination: '/terms',   permanent: true },
      { source: '/services',          destination: '/',        permanent: true },
      { source: '/services/',         destination: '/',        permanent: true },
      { source: '/home',              destination: '/',        permanent: true },
      { source: '/home/',             destination: '/',        permanent: true },
      { source: '/bowling',           destination: '/',        permanent: true },
      { source: '/bowling/',          destination: '/',        permanent: true },
    ];
  },
};

export default nextConfig;
