/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
  },
  webpack: (config, { buildId, webpack, isServer }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'canvas');
    return config;
  },
};

export default nextConfig;
