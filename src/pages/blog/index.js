import { useEffect, useState } from 'react';
import request from '../../utils/request';

// Components
import BlogCard from '../../components/BlogCard';
import trackClick from '../../utils/trackClick';
import CustomHead from '@/shared_components/CustomHead';

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
    // State
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [newBlogPosts, setNewBlogPosts] = useState(null);

    // UseEffects
    useEffect(() => {
        trackClick('blogs-view')
    }, [])

    useEffect(() => {
        if (category || searchTerm) {
            searchBlogPosts()
        }
    }, [category]);

    const searchBlogPosts = () => {
        // Reset blog posts
        if (!searchTerm && !category) {
            setNewBlogPosts(null)
        };

        let convertedSearchTerm = searchTerm?.replace(/\ /g, '+')
        let convertedCategory = category?.replace(/\ /g, '+')

        console.log('convertedCategory', convertedCategory);

        request(`/blog/search?${searchTerm ? `searchText=${convertedSearchTerm}` : ""}${searchTerm && category ? "&" : ""}${category ? `category=${convertedCategory}` : ""}`, {
            method: 'GET',
        })
            .then((res) => {
                console.log('res', res)
                if (res.data) {
                    setNewBlogPosts(res.data);
                }
            })
    };

    const updateSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <CustomHead
                title="Travel Inspiration and Tips | Wanderlust App Blogs"
                description="Get travel inspiration and tips from Wanderlust App Blogs. Our blog section features articles on a wide range of travel-related topics, including destination guides, travel tips, and cultural experiences. Read our expert advice and stay up-to-date on the latest travel trends. Let Wanderlust App Blogs inspire you to explore new destinations and make the most of your travels."
                url="https://www.wanderlustapp.io/blog"
                image="/cityDetailsDark1.png"
                alt="Cities - Wanderlust App"
            />

            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Digital Nomad Blog</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Learn about the best places around the world, the most beautiful places to see, and everything you'd need as a nomad.</p>
                </div> 
                <div className="mx-auto lg:px-12 w-full mb-4">
                    <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-lg ">
                        <div className="flex flex-col items-center justify-between p-4 space-y-3 md:space-y-0 md:space-x-4">
                            <div className="w-full mb-4 flex">
                                <div className="w-full flex items-center">
                                    <label className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input type="text" onChange={updateSearch} onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                searchBlogPosts()
                                            }
                                        }} className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for a city, country or anything!" />
                                    </div>
                                </div>
                                {/* Apply button  */}
                                <button type="button" onClick={searchBlogPosts} className="ml-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Apply</button>
                            </div>
                            <div className="flex flex-wrap">
                                <button type="button" onClick={() => setCategory("")} className={`text-gray-900 ${category === "" ? "bg-primary-700 dark:bg-gray-600 text-white " : "bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 hover:bg-gray-100"} border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:text-white dark:border-gray-600`}>All</button>
                                <button type="button" onClick={() => setCategory("Top 5")} className={`text-gray-900 ${category === "Top 5" ? "bg-primary-700 dark:bg-gray-600 text-white" : "bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 hover:bg-gray-100"} border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>Top 5</button>
                                <button type="button" onClick={() => setCategory("Best of")} className={`text-gray-900 ${category === "Best of" ? "bg-primary-700 dark:bg-gray-600 text-white" : "bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 hover:bg-gray-100"} border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>Best of</button>
                                <button type="button" onClick={() => setCategory("Travel Guide")} className={`text-gray-900 ${category === "Travel Guide" ? "bg-primary-700 dark:bg-gray-600 text-white" : "bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 hover:bg-gray-100"} border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>Travel Guide</button>
                                <button type="button" onClick={() => setCategory("Cost of Living")} className={`text-gray-900 ${category === "Cost of Living" ? "bg-primary-700 dark:bg-gray-600 text-white" : "bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 hover:bg-gray-100"} border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>Cost of Living</button>
                                <button type="button" onClick={() => setCategory("Digital Nomad")} className={`text-gray-900 ${category === "Digital Nomad" ? "bg-primary-700 dark:bg-gray-600 text-white" : "bg-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 hover:bg-gray-100"} border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>Digital Nomad</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid gap-8 lg:grid-cols-2">
                    {!newBlogPosts && posts.map(post => (
                        <div key={`blogsPage-${post.id}`}>
                            <BlogCard post={post} />
                        </div>
                    ))} 
                    {newBlogPosts && newBlogPosts.map(post => (
                        <div key={`blogsPage-${post.id}`}>
                            <BlogCard post={post} />
                        </div>
                    ))} 
                </div>  
            </div>
        </section>
    )
}