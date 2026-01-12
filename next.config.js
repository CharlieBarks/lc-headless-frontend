/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dir.lascrucesdirectory.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/image-proxy',
        search: '?url=*',
      },
      {
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_WORDPRESS_API_URL: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  allowedDevOrigins: ['*.replit.dev', '*.worf.replit.dev', '127.0.0.1'],
};

module.exports = nextConfig;
