/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@heroicons/react']
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable static exports for better performance
  output: 'standalone',
  // Optimize for Vercel deployment
  poweredByHeader: false,
  compress: true,
  // Enable SWC minification
  swcMinify: true,
}

module.exports = nextConfig
