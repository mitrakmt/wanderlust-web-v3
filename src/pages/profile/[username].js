import Profile from '../../shared_pages/profile';
import Head from 'next/head';

// Update for reviews 
// Revalidate? or something
// Maybe, i'm not sure. think about it
// export async function getStaticProps({ params: { slug } }) {
//     const response = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/cities/slug/${slug}`)
//     const citySelected = await response.json()

//     return {
//         props: {
//             citySelected: citySelected.data
//         },
//     };
// }

// export async function getStaticPaths() {
//     const response = await fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/cities')
//     const cities = await response.json()
//     const paths = cities.map((city) => (
//         {
//             params: {
//                 slug: city.slug,
//             },
//         }
//     ))

//     return {
//         paths,
//         fallback: true,
//     }
// }

export async function getStaticProps({ paths }) {
    const response = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/locations/recommendations`)
    const recommendedLocations = await response.json()

    return {
        props: {
            recommendedLocations: recommendedLocations.data
        },
        revalidate: 300
    };
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

export default function PublicProfile({ recommendedLocations }) {
    return (
        <>
            {/* <Head>
                <title>{blog.title} | Wanderlust App Blogs</title>
                <meta
                    name="description"
                    content={`${blog.summary}. Read ${blog.title} and discover what you need to know. Get travel inspiration and tips from Wanderlust App Blogs, and stay up-to-date on the latest travel trends. Let Wanderlust App inspire you to explore new destinations and make the most of your travels.`}
                />
            </Head> */}
            <Profile publicUser={true} recommendedLocations={recommendedLocations} />
        </>
    )
}