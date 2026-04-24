import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['karswap2754.builtwithrocket.new'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pictures-nigeria.jijistatic.net',
      },
      {
        protocol: 'https',
        hostname: 'storage.alpha-analytics.cz',
      },
      {
        protocol: 'https',
        hostname: 'listings-prod.tcimg.net',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
