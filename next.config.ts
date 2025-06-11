import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      loaders: {
        '.woff2': ['file-loader'],
      },
    },
  },
};

export default nextConfig;
