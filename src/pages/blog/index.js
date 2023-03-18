import { useEffect } from 'react';
import Head from 'next/head'

// Components
import BlogCard from '../../components/BlogCard';
import trackClick from '../../utils/trackClick';

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
    const posts = await res.json();
  
    return {
        props: {
            posts: posts.data,
        },
    };
}

export default function Blog({ posts }) {
    // UseEffects
    useEffect(() => {
        trackClick('blogs-view')
    }, [])
    
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <Head>
                <title>Travel Inspiration and Tips | Wanderlust App Blogs</title>
                <meta name="description" content="Get travel inspiration and tips from Wanderlust App Blogs. Our blog section features articles on a wide range of travel-related topics, including destination guides, travel tips, and cultural experiences. Read our expert advice and stay up-to-date on the latest travel trends. Let Wanderlust App Blogs inspire you to explore new destinations and make the most of your travels." />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`$Travel Inspiration and Tips | Wanderlust App Blogs`} />
                <meta property="og:url" content="https://www.wanderlustapp.io/blog" />
                <meta property="og:description" content="Get travel inspiration and tips from Wanderlust App Blogs. Our blog section features articles on a wide range of travel-related topics, including destination guides, travel tips, and cultural experiences. Read our expert advice and stay up-to-date on the latest travel trends. Let Wanderlust App Blogs inspire you to explore new destinations and make the most of your travels." />
                {/* <meta property="og:image" content={blog?.image_url} /> */}

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content={`$Travel Inspiration and Tips | Wanderlust App Blogs`} />
                <meta property="twitter:url" content="https://www.wanderlustapp.io/blog" />
                <meta property="twitter:description" content="Get travel inspiration and tips from Wanderlust App Blogs. Our blog section features articles on a wide range of travel-related topics, including destination guides, travel tips, and cultural experiences. Read our expert advice and stay up-to-date on the latest travel trends. Let Wanderlust App Blogs inspire you to explore new destinations and make the most of your travels." />
                {/* <meta property="twitter:image" content={blog?.image_url} /> */}
            </Head>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Digital Nomad Blog</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Learn about the best places around the world, the most beautiful places to see, and everything you'd need as a nomad.</p>
                </div> 
                <div className="grid gap-8 lg:grid-cols-2">
                    {posts.map(post => (
                        <div key={`blogsPage-${post.id}`}>
                            <BlogCard post={post} />
                        </div>
                    ))} 
                </div>  
            </div>
        </section>
    )
}