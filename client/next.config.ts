import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'image.tmdb.org' }],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
