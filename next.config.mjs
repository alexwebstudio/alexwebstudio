import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: path.dirname(fileURLToPath(import.meta.url)) },
  images: {
    qualities: [75, 85],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
