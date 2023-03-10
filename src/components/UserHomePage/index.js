import { useState } from "react";

export default function UserHomePage({ router, user, userLoading }) {
    // State
    const [searchLocationsSearchTerm, setSearchLocationsSearchTerm] = useState("");
    const [searchLocationsLoading, setSearchLocationsLoading] = useState(false);
    
    // Functions
    const searchLocations = async (e) => {
            setSearchLocationsLoading(true);
            const response = await request(`/locations/search?search=${searchLocationsSearchTerm}`);
            setSearchLocationsLoading(false);
            console.log(response);
    }

    if (userLoading) return null;

    return(
        <section className="w-full absolute overflow-scroll top-0 left-0 ml-0 sm:ml-16 md:ml-16 lg:ml-0 flex flex-col justify-center items-center min-h-screen bg-gray-200/70 dark:bg-gray-900/70" style={{ zIndex: 99 }}>
            <div className="w-full sm:w-3/4 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto mt-56 mb-44 max-w-screen-md sm:text-center">
                    <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">Let's Get Traveling</h2>
                    <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                        <div className="relative w-full">
                            <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">City</label>
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-900 dark:text-gray-200 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                                </svg>
                            </div>

                            <input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for a city" type="text" required="" />
                        </div>
                        <div>
                            <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Search</button>
                        </div>
                    </div>
                </div>
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    {/* <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Digital Nomad Blog</h2>
                        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We help you to learn about the best places around the world, the most beautiful places to see, and everything you'd need as a nomad.</p>
                    </div>  */}
                    <div className="grid gap-8 lg:grid-cols-2">
                        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-5 text-gray-500">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                    Article
                                </span>
                                <span className="text-sm">14 days ago</span>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a onClick={() => router.push('/blog/blogPost1')}>The best of XYZ</a></h2>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Here's some random text for where the blog post summary will go! blah blah blah, yeah yeah. Here's some random text for where the blog post summary will go! blah blah blah, yeah yeah.</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img className="w-7 h-7 relative rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                                    <span className="font-medium dark:text-white">
                                        Wanderlust
                                    </span>
                                </div>
                                <a onClick={() => router.push('/blog/blogPost1')} className="cursor-pointer inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Read more
                                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </a>
                            </div>
                        </article> 
                        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-5 text-gray-500">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                    Article
                                </span>
                                <span className="text-sm">14 days ago</span>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a onClick={() => router.push('/blog/blogPost1')}>The best of XYZ</a></h2>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Here's some random text for where the blog post summary will go! blah blah blah, yeah yeah. Here's some random text for where the blog post summary will go! blah blah blah, yeah yeah.</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img className="w-7 h-7 relative rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                                    <span className="font-medium dark:text-white">
                                        Wanderlust
                                    </span>
                                </div>
                                <a onClick={() => router.push('/blog/blogPost1')} className="cursor-pointer inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Read more
                                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </a>
                            </div>
                        </article> 
                        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-5 text-gray-500">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                    Article
                                </span>
                                <span className="text-sm">14 days ago</span>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a onClick={() => router.push('/blog/blogPost1')}>The best of XYZ</a></h2>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Here's some random text for where the blog post summary will go! blah blah blah, yeah yeah. Here's some random text for where the blog post summary will go! blah blah blah, yeah yeah.</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img className="w-7 h-7 relative rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                                    <span className="font-medium dark:text-white">
                                        Wanderlust
                                    </span>
                                </div>
                                <a onClick={() => router.push('/blog/blogPost1')} className="cursor-pointer inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Read more
                                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </a>
                            </div>
                        </article> 
                        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-5 text-gray-500">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                    Article
                                </span>
                                <span className="text-sm">14 days ago</span>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a onClick={() => router.push('/blog/blogPost1')}>The best of XYZ</a></h2>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Here's some random text for where the blog post summary will go! blah blah blah, yeah yeah. Here's some random text for where the blog post summary will go! blah blah blah, yeah yeah.</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img className="w-7 h-7 relative rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                                    <span className="font-medium dark:text-white">
                                        Wanderlust
                                    </span>
                                </div>
                                <a onClick={() => router.push('/blog/blogPost1')} className="cursor-pointer inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Read more
                                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </a>
                            </div>
                        </article> 
                        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-5 text-gray-500">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                    Article
                                </span>
                                <span className="text-sm">14 days ago</span>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a onClick={() => router.push('/blog/blogPost1')}>The best of XYZ</a></h2>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Here's some random text for where the blog post summary will go! blah blah blah, yeah yeah. Here's some random text for where the blog post summary will go! blah blah blah, yeah yeah.</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img className="w-7 h-7 relative rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                                    <span className="font-medium dark:text-white">
                                        Wanderlust
                                    </span>
                                </div>
                                <a onClick={() => router.push('/blog/blogPost1')} className="cursor-pointer inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Read more
                                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </a>
                            </div>
                        </article> 
                        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-5 text-gray-500">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                    Article
                                </span>
                                <span className="text-sm">14 days ago</span>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a onClick={() => router.push('/blog/blogPost1')}>The best of XYZ</a></h2>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">Here's some random text for where the blog post summary will go! blah blah blah, yeah yeah. Here's some random text for where the blog post summary will go! blah blah blah, yeah yeah.</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img className="w-7 h-7 relative rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                                    <span className="font-medium dark:text-white">
                                        Wanderlust
                                    </span>
                                </div>
                                <a onClick={() => router.push('/blog/blogPost1')} className="cursor-pointer inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Read more
                                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </a>
                            </div>
                        </article>               
                    </div>  
                    <div className="w-full flex justify-center items-center mt-6">
                        <button onClick={() => router.push('/blog')} className="py-3 px-5 w-30 text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Explore More of our Articles</button>
                    </div>
                </div>
            </div>
        </section>
    )
}