import type { NextConfig } from 'next';

const config: NextConfig = {
  // Allow images from ZeroDB storage and common CDNs
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.ainative.studio' },
      { protocol: 'https', hostname: '*.ainative.studio' },
    ],
  },
};

export default config;
