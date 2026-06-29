import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wpcms.sahaytrust.com',
      },
      {
        protocol: 'https',
        hostname: 'wpcms.sahaytrust.com',
      },
    ],
  },
};

export default nextConfig;
