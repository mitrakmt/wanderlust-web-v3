// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://www.wanderlustapp.io',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: true
};

module.exports = config;