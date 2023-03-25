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
        <>
            {/* <NextSeo
                title={`${blog.title} | Wanderlust App Blogs`}
                description={`${blog?.summary}. Read ${blog?.title} and discover what you need to know. Get travel inspiration and tips from Wanderlust App Blogs, and stay up-to-date on the latest travel trends. Let Wanderlust App inspire you to explore new destinations and make the most of your travels.`}
                canonical={`https://www.wanderlustapp.io/blog/${blog?.slug}`}
                openGraph={{
                    url: `https://www.wanderlustapp.io/blog/${blog?.slug}`,
                    title: `${blog.title} | Wanderlust App Blogs`,
                    description: `${blog?.summary}. Read ${blog?.title} and discover what you need to know. Get travel inspiration and tips from Wanderlust App Blogs, and stay up-to-date on the latest travel trends. Let Wanderlust App inspire you to explore new destinations and make the most of your travels.`,
                    images: [
                        {
                            url: blog?.image_url,
                            width: 800,
                            height: 600,
                            alt: `${blog?.title} | Wanderlust App Blogs`,
                            type: 'image/jpeg',
                        },
                    ],
                    siteName: 'Wanderlust App Blogs',
                }}
                twitter={{
                    handle: '@mike_mitrakos',
                    site: '@wanderlustext',
                    cardType: 'summary_large_image',
                }}
            /> */}
            <CustomHead 
                title="Your Personal Wanderlust App Profile | Edit Your Information"
                description="Your Wanderlust App Profile is your personal space to save and access your travel information. Edit your profile to include your travel preferences and destinations, and view your saved trips and favorite places. Customize your experience and make the most of your travels with Wanderlust App Profile."
                url="https://www.wanderlustapp.io/profile"
                image="https://uploads-ssl.webflow.com/62893f6b6c73c80d757c8d0d/629378f07e3c95055ebae0ca_Screen%20Shot%202022-05-29%20at%204.38.07%20PM%20(1).jpg"
                alt="Wanderlust App"
            />

            <Profile publicUser={true} recommendedLocations={recommendedLocations} />
        </>
    )
}