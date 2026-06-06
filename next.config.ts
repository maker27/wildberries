import type { NextConfig } from 'next';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  basePath: BASE_PATH || undefined,
  output: 'standalone',
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
