import Profile from '../../shared_pages/profile';
import Head from 'next/head';

// export async function getStaticProps({ params: { slug } }) {
//     if (!slug) {
//         return;
//     }

//     const response = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/blog/${slug}`)
//     const blog = await response.json()

//     return {
//         props: {
//             blog: blog.data
//         },
//         revalidate: 320,
//     };
// }

// export async function getStaticPaths() {
//     const response = await fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/blogs')
//     const blogs = await response.json()
//     const paths = blogs.data.map((blog) => (
//         {
//             params: {
//                 slug: blog.slug,
//             },
//         }
//     ))

//     return {
//         paths,
//         fallback: true,
//     }
// }

export async function getStaticProps({ params: { username }, paths }) {
    const recommendationsResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/locations/recommendations`)
    const recommendedLocations = await recommendationsResponse.json()

    console.log('username', username)

    const profileResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/users/public/username/${username}`)
    const profileUser = await profileResponse.json()
    console.log('profileUser', profileUser)

    const reviewsResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/reviews/user/${profileUser.data.id}`)
    const reviewsData = await reviewsResponse.json()
    console.log('reviewsData', reviewsData)

    return {
        props: {
            recommendedLocations: recommendedLocations.data,
            profileUser: profileUser.data,
            reviewsData: reviewsData.data
        },
        revalidate: 30
    };
}

export async function getStaticPaths() {
    const response = await fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/users')
    const users = await response.json()
    const paths = users.data.map((user) => (
        {
            params: {
                username: user.username
            },
        }
    ))

    return {
        paths,
        fallback: true
    }
}

export default function PublicProfile({ recommendedLocations, profileUser, reviewsData }) {
    console.log('reviewsData', reviewsData)
    console.log('profileUser', profileUser)

    return (
        <>
            <Head>
                <title>{`${profileUser?.username}'s Wanderlust Profile | ${profileUser?.username}'s Travel Adventures`}</title>
                <meta name="description" content={`Follow ${profileUser?.username}'s travel adventures on Wanderlust App. Discover ${profileUser?.username}'s favorite destinations, travel tips, and local experiences. Join the community of digital nomads and travel enthusiasts.`} />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`${profileUser?.username}'s Wanderlust Profile | ${profileUser?.username}'s Travel Adventures`} />
                <meta property="og:url" content={`https://www.wanderlustapp.io/profile/${profileUser?.username}`} />
                <meta property="og:description" content={`Follow ${profileUser?.username}'s travel adventures on Wanderlust App. Discover ${profileUser?.username}'s favorite destinations, travel tips, and local experiences. Join the community of digital nomads and travel enthusiasts.`} />
                <meta property="og:image" content={profileUser?.profile_image} />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={`${profileUser?.username}'s Wanderlust Profile | ${profileUser?.username}'s Travel Adventures`} />
                <meta property="twitter:url" content={`https://www.wanderlustapp.io/profile/${profileUser?.username}`} />
                <meta property="twitter:description" content={`Follow ${profileUser?.username}'s travel adventures on Wanderlust App. Discover ${profileUser?.username}'s favorite destinations, travel tips, and local experiences. Join the community of digital nomads and travel enthusiasts.`} />
                <meta property="twitter:image" content={profileUser?.profile_image} />

                {/* Schema JSON ID  */}
                {/* <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={addJsonLd()}
                    key="city-jsonld"
                /> */}
            </Head>

            <h3>hi</h3>
               
            {/* <Profile publicUser={true} recommendedLocations={recommendedLocations} profileUser={profileUser} reviewsData={reviewsData} /> */}
        </>
    )
}