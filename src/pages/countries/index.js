// Hooks
import CustomHead from '@/shared_components/CustomHead';

// Components
import CountryCard from '../../components/CountryCard';

export async function getStaticProps() {
    const response = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/countries`)
    const countries = await response.json()

    return {
        props: {
            countries: countries.data
        },
    };
}

// export async function getStaticPaths() {
//     const response = await fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/countries')
//     const countries = await response.json()
//     const paths = countries.map((country) => (
//         {
//             params: {
//                 slug: country.slug || country.country_code,
//             },
//         }
//     ))

//     return {
//         paths,
//         fallback: false,
//     }
// }

export default function CountriesPage({ countries }) {
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <CustomHead
                title="Explore Countries Around the World | Wanderlust App Countries"
                description="Wanderlust App Countries lets you explore countries around the world, from popular tourist destinations to hidden gems. Our curated list of cities in each country offers in-depth information on local culture, attractions, and experiences. Browse our city guides to discover new destinations and plan your next adventure. Wanderlust App Countries is your go-to resource for travel inspiration and planning."
                url="https://www.wanderlustapp.io/countries"
                image="/cityDetailsDark1.png"
                alt="Countries - Wanderlust App"
            />
            <h1 className="text-2xl mb-4 text-gray-700 dark:text-white">Countries</h1>
            <div className="w-full flex flex-wrap gap-x-8 md:gap-x-4 gap-y-8 md:gap-y-4">
                {
                    countries && countries?.map(country => (
                        <div className="relative w-52 h-52" key={`countryCard-${country?.slug}`}>
                            <CountryCard country={country} />
                        </div>
                    ))
                }
            </div>
        </section>
    )
}