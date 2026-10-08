/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Vercel Free Tier için serverless function timeout
  serverRuntimeConfig: {
    maxDuration: 60,
  },
  // WebSocket desteği
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
  // API route compression
  compress: true,
  // Optimized images
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
