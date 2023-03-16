import Profile from '../../shared_pages/profile';

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
        <Profile publicUser={true} recommendedLocations={recommendedLocations} />
    )
}