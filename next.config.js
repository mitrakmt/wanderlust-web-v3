const { withAxiom } = require('next-axiom');

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true
  },
  basePath: '',
  async redirects() {
    return [
      {
        source: '/blog-post-dark-option/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/categories-dark/wanderlust',
        destination: '/blog',
        permanent: true,
      }
    ]
  },
  rewrites: async () => [
    {
      source: '/dynamic-sitemap.xml',
      destination: '/dynamic-sitemap',
    },
    {
      source: '/dynamic-sitemap-:page.xml',
      destination: '/dynamic-sitemap/:page',
    },
  ],
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
      {
        protocol: 'https',
        hostname: '**.flowbite.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.skiplagged.com',
      },
      {
        protocol: 'https',
        hostname: '**.brandfetch.io',
      },
    ],
  },
}

module.exports = withAxiom(nextConfig)
