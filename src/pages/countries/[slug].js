import Image from "next/image";

// Components
import BlogCard from "@/components/BlogCard";

// Hooks
import CustomHead from '@/shared_components/CustomHead';

export async function getStaticProps({ params: { slug } }) {
    const response = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/countries/slug/${slug}`)
    const countrySelected = await response.json()

    // Get blogs for city
    const countryResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/blog/country/${countrySelected?.data?.id}`)
    const blogs = await countryResponse.json()

    return {
        props: {
            countrySelected: countrySelected?.data,
            blogs: blogs.data
        },
    };
}

export async function getStaticPaths() {
    const response = await fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/countries')
    const countries = await response.json()
    const paths = countries.map((country) => (
        {
            params: {
                slug: country.slug,
            },
        }
    ))

    return {
        paths,
        fallback: true,
    }
}

export default function CountryPage({ countrySelected, blogs }) {
    console.log('countrySelected: ', countrySelected)
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <CustomHead
                title={`Explore New Countries Around the World | Wanderlust App Countries`}
                description={`Wanderlust App Countries lets you explore countries around the world, from popular tourist destinations to hidden gems. Our curated list of cities in each country offers in-depth information on local culture, attractions, and experiences. Browse our city guides to discover new destinations and plan your next adventure. Wanderlust App Countries is your go-to resource for travel inspiration and planning.`}
                url={`https://www.wanderlustapp.io/country/${countrySelected?.name}`}
                image="/cityDetailsDark1.png"
                alt={`${countrySelected?.name} Country Page`}
            />

            {
                countrySelected?.image_url_medium && 
                    <Image
                        src={countrySelected?.image_url_medium}
                        alt={`${countrySelected?.name} Country Page`}
                        width={1200}
                        height={600}
                        className="w-full rounded-lg"
                        style={{ height: '140px' }}
                        quality={100}
                    />
            }

            <h1 className="text-3xl my-4 text-gray-700 dark:text-white">{countrySelected?.name}</h1>

            {
                blogs && blogs.length > 0 && <div className="w-full">
                    <h2 className="text-xl my-4 text-gray-700 dark:text-white">Blogs on {countrySelected?.name}</h2>
                    <div className="flex flex-wrap">
                        {
                            blogs.map(post => (
                                <BlogCard key={`countriesPage-blogs-${post.slug}`} post={post} />
                            ))
                        }
                    </div>
                </div>
            }

        </section>
    )
}