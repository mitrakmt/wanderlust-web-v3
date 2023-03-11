const { withAxiom } = require('next-axiom');

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: '',
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.wanderlust-extension.s3.us-west-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
    ],
  },
}

module.exports = withAxiom(nextConfig)
