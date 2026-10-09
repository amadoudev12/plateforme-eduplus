import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Autoriser les icônes de la page « About »
    remotePatterns: [{ protocol: "https", hostname: "img.icons8.com" }],
  },
};

export default nextConfig;
