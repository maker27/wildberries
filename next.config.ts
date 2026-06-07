import type { NextConfig } from 'next';

const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/\/+$/, '');

const productionRules = {
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const nextConfig: NextConfig = {
  basePath: BASE_PATH || undefined,
  trailingSlash: true,
  output: 'standalone',
  serverExternalPackages: ['better-sqlite3'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  ...(process.env.NODE_ENV === 'production' ? productionRules : null),
};

export default nextConfig;
