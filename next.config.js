const withAnalyzer = require('@next/bundle-analyzer');
const { withContentlayer } = require('next-contentlayer');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: getRemotePatterns(),
  }, async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: [
      'puppeteer-core',
      '@sparticuz/chromium'
    ]
  }
};

module.exports = withAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(withContentlayer(nextConfig));

function getRemotePatterns() {
  // add here the remote patterns for your images
  const remotePatterns = [];

  if (SUPABASE_URL) {
    const hostname = new URL(SUPABASE_URL).hostname;
    remotePatterns.push({
      protocol: 'https',
      hostname,
    });
  }

  return IS_PRODUCTION
    ? remotePatterns
    : [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ];
}
