import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['image.tmdb.org'],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
