/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  }
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  images: {
        unoptimized: true,
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
