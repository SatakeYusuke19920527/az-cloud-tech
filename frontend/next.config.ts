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
      'images.pexels.com',
      'picsum.photos',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/zenn/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: 'dashboard/note/**',
      },
    ],
  },
};

export default nextConfig;
