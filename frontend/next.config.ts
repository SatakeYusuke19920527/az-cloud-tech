import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'qiita-image-store.s3.ap-northeast-1.amazonaws.com',
      's3-ap-northeast-1.amazonaws.com',
      'www.kentsu.website',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/zenn/**',
      },
    ],
  },
};

export default nextConfig;
