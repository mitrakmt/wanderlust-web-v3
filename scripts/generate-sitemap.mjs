import { writeFileSync } from 'fs'
import {globby} from 'globby'
import prettier from 'prettier'

async function generateSitemap() {
	const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
    
	const pages = await globby([
    'pages/*.(j)s',
    '!pages/_*.(j)s',
    '!pages/[*.(j)s',
    '!pages/api',
    '!pages/404.(j)s',
    '!pages/500.(j)s',
  ])

  let blogPages;
  let cityPages;
  let profilePages;
    
  fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/blogs')
    .then((response) => response.json())
    .then((blogsData) => {
      // console.log('blogs', blogsData)

      blogPages = blogsData.data.map((blog) => `/blog/${blog.slug}`);

      fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/users')
        .then((response) => response.json())
        .then((usersData) => {
          // console.log('users', usersData)

          profilePages = usersData.data.map((profile) => `/profile/${profile.username}`);
    
          fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/cities')
            .then((response) => response.json())
            .then((citiesData) => {
              console.log('cities', citiesData)
        
              cityPages = citiesData.map((city) => `/city/${city.slug}`);

              const sitemap = `
                <?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    ${pages
                        .concat(blogPages)
                        .concat(cityPages)
                        .concat(profilePages)
                      .map((page) => {
                        const path = page
                          .replace('pages/', '/')
                          .replace('public/', '/')
                          .replace('.tsx', '')
                          .replace('.jsx', '')
                          .replace('.mdx', '')
                          .replace('.md', '')
                          .replace('/rss.xml', '')
                        const route = path === '/index' ? '' : path
                        return `
                                <url>
                                    <loc>https://wanderlustapp.io${route}</loc>
                                </url>
                            `
                      })
                      .join('')}
                </urlset>
            `

            const formatted = prettier.format(sitemap, {
              ...prettierConfig,
              parser: 'html',
            })

            writeFileSync('public/sitemap.xml', formatted)
            });
        });
    });

    // const blogPages = await allBlogs.map((blog) => `https://wanderlustapp.io/blog/${blog.slug}`);
    // const cityPages = await allCities.map((city) => `https://wanderlustapp.io/city/${city.slug}`);
    // const profilePages = await allProfiles.map((profile) => `https://wanderlustapp.io/profile/${profile.username}`);
}

// Will call the function whenever the file is run
generateSitemap();