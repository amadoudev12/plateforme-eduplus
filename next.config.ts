import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // important pour rendre le site exportable
  images: {
    unoptimized: true, // obligatoire si tu utilises <Image />
  },
  basePath: "/nom-du-repo", // ⚠️ remplace par le nom de ton repo GitHub
  trailingSlash: true,
};
// next.config.js
module.exports = {
  images: {
    domains: ['img.icons8.com'],
  },
}

export default nextConfig;
