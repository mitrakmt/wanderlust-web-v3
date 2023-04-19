const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
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
      },
      {
        source: '/best-places-to-live-as-a-digital-nomad-139431ca7569',
        destination: '/blog/best-places-to-live-as-a-digital-nomad',
        permanent: true,
      },
      {
        source: '/best-places-to-live-as-a-digital-nomad',
        destination: '/blog/best-places-to-live-as-a-digital-nomad',
        permanent: true,
      },
      {
        source: '/best-places-to-live-in-portugal-8deaf55ddb6b',
        destination: '/blog/best-places-to-live-portugal',
        permanent: true,
      },
      {
        source: '/best-places-to-live-in-portugal',
        destination: '/blog/best-places-to-live-portugal',
        permanent: true,
      },
      {
        source: '/best-places-to-live-in-france-821d33071cbe',
        destination: '/blog/best-places-to-live-france',
        permanent: true,
      },
      {
        source: '/best-places-to-live-in-france',
        destination: '/blog/best-places-to-live-france',
        permanent: true,
      },
      {
        
        source: '/the-best-places-to-live-in-spain-c54b259def4e',
        destination: '/blog/best-places-to-live-spain',
        permanent: true,
      },
      {
        source: '/the-best-places-to-live-in-spain',
        destination: '/blog/best-places-to-live-spain',
        permanent: true,
      },
      {
        source: '/version-2-of-wanderlust-our-web-app-cc7cd0a21136',
        destination: '/blog/version-2',
        permanent: true,
      },
      {
        source: '/version-2-of-wanderlust-our-web-app',
        destination: '/blog/version-2',
        permanent: true,
      },
      {
        source: '/the-best-places-to-live-in-bali-5fe6706c80da',
        destination: '/blog/best-places-to-live-bali',
        permanent: true,
      },
      {
        source: '/the-best-places-to-live-in-bali',
        destination: '/blog/best-places-to-live-bali',
        permanent: true,
      },
      {
        source: '/the-top-5-most-beautiful-beaches-in-the-world-d1d441508cd',
        destination: '/blog/top-5-beautiful-beaches',
        permanent: true,
      },
      {
        source: '/the-top-5-most-beautiful-beaches-in-the-world',
        destination: '/blog/top-5-beautiful-beaches',
        permanent: true,
      },
      {
        source: '/5-most-beautiful-cities-in-the-world-2b92482b2777',
        destination: '/blog/top-5-beautiful-beaches',
        permanent: true,
      },
      {
        source: '/5-most-beautiful-cities-in-the-world',
        destination: '/blog/top-5-beautiful-beaches',
        permanent: true,
      },
      {
        source: '/the-5-best-restaurants-in-bali-5ef9576f248a',
        destination: '/blog/5-best-restaurants-bali',
        permanent: true,
      },
      {
        source: '/the-5-best-restaurants-in-bali',
        destination: '/blog/5-best-restaurants-bali',
        permanent: true,
      },
      {
        source: '/top-5-most-interesting-places-to-visit-in-the-world-990819413af1',
        destination: '/blog/top-5-interesting-places-to-visit',
        permanent: true,
      },
      {
        source: '/top-5-most-interesting-places-to-visit-in-the-world',
        destination: '/blog/top-5-interesting-places-to-visit',
        permanent: true,
      },
      {
        source: '/bucharest-cost-of-living-719d139d539e',
        destination: '/blog/bucharest-cost-of-living',
        permanent: true,
      },
      {
        source: '/bucharest-cost-of-living',
        destination: '/blog/bucharest-cost-of-living',
        permanent: true,
      },
      {
        source: '/cost-of-living-in-canggu-bali-8a1cba59ca1b',
        destination: '/blog/cost-of-living-canggu-bali',
        permanent: true,
      },
      {
        source: '/cost-of-living-in-canggu-bali',
        destination: '/blog/cost-of-living-canggu-bali',
        permanent: true,
      },
      {
        source: '/tagged/top-5-best',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/categories/ultimate-guides',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tagged/cost-of-living',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/feed/tagged/luxury-travel',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/feed/tagged/trains',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tagged/berlin',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/categories/top-5',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tagged/living-abroad',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/feed/tagged/best-travel-destinations',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/feed/tagged/wanderlusting',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/categories/digital-nomad',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/best-places-to-live-in-germany-558a32906c44',
        destination: '/blog/best-places-to-live-germany',
        permanent: true
      },
      {
        source: '/best-places-to-live-in-germany',
        destination: '/blog/best-places-to-live-germany',
        permanent: true
      },
      {
        source: '/feed/tagged/foodies', 
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/categories/best-of', 
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/feed/tagged/barcelona', 
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/feed/tagged/living-abroad', 
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/followers', 
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tagged/food', 
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/feed/tagged/bali', 
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tagged/wanderlusting', 
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/feed/tagged/germany', 
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tagged/bucharest', 
        destination: '/blog',
        permanent: true,
      },
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

module.exports = nextConfig
