// Components
import BlogCard from '../../components/BlogCard';

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
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Digital Nomad Blog</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Learn about the best places around the world, the most beautiful places to see, and everything you'd need as a nomad.</p>
                </div> 
                <div className="grid gap-8 lg:grid-cols-2">
                    {posts.map(post => (
                        <BlogCard post={post} />
                    ))} 
                </div>  
            </div>
        </section>
    )
}