import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wpcms.sahaytrust.com",
      },
    ],
    qualities: [75],
  },
};

export default nextConfig;