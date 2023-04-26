import Profile from '../../shared_pages/profile';

import CustomHead from '@/shared_components/CustomHead';

// useEffect(() => {
//     async function fetchData(userId) {
//         const response = await request(`/reviews/count/${userId}`, {
//             method: 'GET'
//         })
//         setReviewCount(response.data)
//         setLoadingReviewCount(false)
//     }

//     if (publicUser && profileUser) {
//         fetchData(profileUser.id);
//     }
// }, [profileUser]);

// useEffect(() => {
//     async function fetchData(userId) {
//         const response = await request(`/follows/count/${userId}`, {
//             method: 'GET'
//         })

//         setFollowCount(response.data)
//         setLoadingFollowCount(false)
//     }

//     if (publicUser && profileUser) {
//         fetchData(profileUser.id);
//     } else if (!publicUser) {
//         fetchData(user?.id);
//     }
//   }, [profileUser]);

// useEffect(() => {
//     async function fetchData(userId) {
//         const response = await request(`/place/user/${userId}`, {
//             method: 'GET'
//         })

//         setPlaces(response.data)
//     }

//     if (publicUser && profileUser) {
//         fetchData(profileUser.id);
//     } else if (!publicUser) {
//         fetchData(user?.id);
//     }
// }, [profileUser]); 

// useEffect(() => {
//     async function fetchData() {
//         const response = await request(`/place`, {
//             method: 'GET'
//         })

//         setUserPlaces(response.data)
//     }

//     if (user) {
//         fetchData();
//     }
// }, []); 

// useEffect(() => {
//     async function fetchData() {
//         const response = await request(`/placesToTry`, {
//             method: 'GET'
//         })

//         setUserPlacesToTry(response.data)
//     }

//     if (user) {
//         fetchData();
//     }
// }, []); 

// Fetch user's content
// useEffect(() => {
//     async function fetchData(username) {
//         const response = await request(`/blog/user/${username}`, {
//             method: 'GET'
//         })

//         setContent(response.data.slice(0, 3))
//     }

//     if (publicUser && profileUser) {
//         fetchData(profileUser.username);
//     } else if (!publicUser) {
//         fetchData(user?.username);
//     }
// }, [profileUser]); 

export async function getStaticProps({ params: { username } }) {
    const response = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/users/public/username/${username}`)
    const profileUser = await response.json()

    const recsResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/locations/recommendations`)
    const recommendedLocations = await recsResponse.json()

    const reviewsResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/reviews/user/${profileUser.data.id}`)
    const reviews = await reviewsResponse.json()

    const blogsResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/blog/user/${username}`);
    const blogs = await blogsResponse.json()

    const placesResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/place/user/${profileUser.data.id}`);
    const places = await placesResponse.json()

    const followCountResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/follows/count/${profileUser.data.id}`);
    const followCount = await followCountResponse.json()
    
    // const reviewCountResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/reviews/count/${profileUser.data.id}`);
    // const reviewCount = await reviewCountResponse.json()

    // const places = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/place`, {
    //     method: 'GET'
    // })

    // const placesToTry = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/placesToTry`, {
    //     method: 'GET'
    // })

    return {
        props: {
            recommendedLocations: recommendedLocations.data,
            profileUser: profileUser.data,
            reviews: reviews.data,
            blogs: blogs,
            // .data.slice(3, 0)
            placesCount: places.data.length,
            places: places.data,
            followCount: followCount.data,
            reviewCount: reviews.data.length,
            username
        },
        revalidate: 300
    };
}

export async function getStaticPaths() {
    const sitemapResponse = await fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/users')
    const users = await sitemapResponse.json()
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

export default function PublicProfile({ recommendedLocations, profileUser, username, reviews, blogs, places, reviewCount, followCount }) {
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

            <Profile
                publicUser={true}
                providedUser={profileUser}
                username={username}
                recommendedLocations={recommendedLocations}
                reviews={reviews}
                blogs={blogs}
                places={places}
                reviewCount={reviewCount}
                followCount={followCount}
            />
        </>
    )
}