import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.sahaytrust.com',
      },
      {
        protocol: 'https',
        hostname: 'sahaytrust.com',
      },
    ],
  },
};

export default nextConfig;
