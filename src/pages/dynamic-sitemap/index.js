
const URLS_PER_SITEMAP = 10000;

export const getServerSideProps = async ctx => {
  // obtain the count hitting an API endpoint or checking the DB
  const count = await fetchCountOfDynamicPages();
  const amountOfSitemapFiles = Math.ceil(count / URLS_PER_SITEMAP);

  const sitemaps = Array(totalSitemaps)
    .fill('')
    .map((v, index) => `${getBaseUrl()}/dynamic-sitemap-${index}.xml`);

  return getServerSideSitemapIndex(ctx, sitemaps);
};

// Default export to prevent Next.js errors
export default function MemorialSitemapIndexPage() {}