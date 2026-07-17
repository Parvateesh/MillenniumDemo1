import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  serverExternalPackages: ['firebase-admin', 'jwks-rsa', 'jose'],

  async headers() {
    const securityHeaders = [
      { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options',    value: 'nosniff' },
      { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'X-DNS-Prefetch-Control',    value: 'on' },
    ];

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
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
      { source: '/order',             destination: '/menu',    permanent: true },
      { source: '/order/',            destination: '/menu',    permanent: true },
      { source: '/book',              destination: '/contact', permanent: true },
      { source: '/book/',             destination: '/contact', permanent: true },
    ];
  },
};

export default nextConfig;
