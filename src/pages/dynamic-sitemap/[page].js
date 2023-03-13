// dynamic-sitemap/[page].ts
// route rewritten from /dynamic-sitemap-[page].xml

const URLS_PER_SITEMAP = 10000;

export const getServerSideProps = async ctx => {
  if (!ctx.params?.page || isNaN(Number(ctx.params?.page))) {
    return { notFound: true };
  }
  const page = Number(ctx.params?.page);

  // this would load the items that make dynamic pages
  const response = await fetchDynamicPagesForSitemap({
    page,
    pageSize: URLS_PER_SITEMAP,
  });

  const total = response.data.pageData.total;
  const totalSitemaps = Math.ceil(total / URLS_PER_SITEMAP);

  if (response.data.items.length === 0) {
    return { notFound: true };
  }

  const fields = response.data.items.map(items => ({
    loc: `${getSiteUrl()}/${memorial.slug}`,
    lastmod: items.created_at,
  }));
    
  const cacheMaxAgeUntilStaleSeconds =  60 * 60; // 1 minute
  const cacheMaxAgeStaleDataReturnSeconds =  15 * 60 * 60; // 15 minutes
  
  ctx.res.setHeader(
    'Cache-Control',
    `public, s-maxage=${cacheMaxAgeUntilStaleSeconds}, stale-while-revalidate=${cacheMaxAgeStaleDataReturnSeconds}`
  );

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function MemorialSitemapPage() {}