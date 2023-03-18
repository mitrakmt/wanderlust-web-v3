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
                {/* <meta property="og:title" content={`${blog.title} | Wanderlust App Blogs`} />
                <meta
                    property="og:description"
                    content={`${blog.summary}. Read ${blog.title} and discover what you need to know. Get travel inspiration and tips from Wanderlust App Blogs, and stay up-to-date on the latest travel trends. Let Wanderlust App inspire you to explore new destinations and make the most of your travels.`}
                />
                {
                    blog.image_url && (
                        <meta
                            property="og:image"
                            content={blog?.image_url}
                        />
                    )
                } */}
            
            {/* Apples   */}

            {/* <!-- Primary Meta Tags -->
<title>MacBook Pro - Apple</title>
<meta name="title" content="MacBook Pro - Apple">
<meta name="description" content="Our most powerful laptops, supercharged by M1 and M2 chips. Featuring Magic Keyboard, Touch Bar, Touch ID, and brilliant Retina display.">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.apple.com/macbook-pro/">
<meta property="og:title" content="MacBook Pro - Apple">
<meta property="og:description" content="Our most powerful laptops, supercharged by M1 and M2 chips. Featuring Magic Keyboard, Touch Bar, Touch ID, and brilliant Retina display.">
<meta property="og:image" content="https://www.apple.com/v/macbook-pro/ah/images/meta/macbook-pro__fwqxvqrbd36u_og.png?202302020957">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://www.apple.com/macbook-pro/">
<meta property="twitter:title" content="MacBook Pro - Apple">
<meta property="twitter:description" content="Our most powerful laptops, supercharged by M1 and M2 chips. Featuring Magic Keyboard, Touch Bar, Touch ID, and brilliant Retina display.">
 <meta property="twitter:image" content="https://www.apple.com/v/macbook-pro/ah/images/meta/macbook-pro__fwqxvqrbd36u_og.png?202302020957"></meta> */}
            
            <Profile publicUser={true} recommendedLocations={recommendedLocations} />
        </>
    )
}