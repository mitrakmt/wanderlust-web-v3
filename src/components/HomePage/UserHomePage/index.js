import { useState, useContext } from "react";
import Image from "next/image";

// Components
import BlogCard from "../../BlogCard";
import PopularTravelers from "../components/PopularTravelers";
import PopularCities from "../components/PopularCities";

// Context
import { themeContext } from "../../../context/ThemeProvider";

export default function UserHomePage({ router, userLoading, request, posts }) {
    // Context
    const [theme] = useContext(themeContext);

    // State
    const [searchLocationsSearchTerm, setSearchLocationsSearchTerm] = useState("");
    const [locations, setLocations] = useState([]);

    // State loading
    const [, setSearchLocationsLoading] = useState(false);
    const [searchRandomCityLoading, setSearchRandomCityLoading] = useState(false);
    const [searchRandomCityByRegionLoading, setSearchRandomCityByRegionLoading] = useState(false);
        
    // Functions
    const clearCitiesSearch = () => {
        setSearchLocationsSearchTerm("");
        setLocations([])
    }

    const searchLocations = () => {
        setSearchLocationsLoading(true);
        request(`/cities/search?name=${searchLocationsSearchTerm}`)
            .then(res => {
                setLocations(res.data);
                setSearchLocationsLoading(false);
            })
    }

    const navigateTo = (slug) => {
        router.push({
            pathname: `/city/${slug}`,
            query: { breadcrumb: 'search' }
        });

        clearCitiesSearch();
    }

    const findRandomLocation = () => {
        setSearchRandomCityLoading(true);
        request(`/cities/random`)
            .then(res => {
                navigateTo(res.data?.slug)
                setSearchRandomCityLoading(false);
            })
    }

    const findRandomLocationByRegion = (region) => {
        setSearchRandomCityByRegionLoading(true);
        request(`/cities/random/region?region=${region}`)
            .then(res => {
                navigateTo(res.data?.slug)
                setSearchRandomCityByRegionLoading(false);
            })
    }
    
    // TODO: how can i remove the below
    if (userLoading) return null;

    return (
        <div className=" px-2 sm:pl-16 pr-0 flex flex-col items-center w-11/12">
            <div className="mx-auto mt-56 mb-44 sm:text-center sm:flex sm:flex-col sm:items-center sm:justify-center">
                <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">Let&#39;s Get Traveling!</h2>
                <div className="items-center mx-auto mb-3 space-y-4 sm:flex sm:space-y-0 w-full">
                    <div className="relative w-full">
                        <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">City</label>
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-gray-900 dark:text-gray-200 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                            </svg>
                        </div>

                        <input
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    searchLocations()
                                }
                            }}
                            onChange={(e) => setSearchLocationsSearchTerm(e.target.value)}
                            value={searchLocationsSearchTerm}
                            className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Search for a city"
                            type="text"
                        />

                        {/* Render list of locations  */}
                        {
                            searchLocationsSearchTerm.length > 0 && locations.length > 0 && (
                                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg dark:bg-gray-700 dark:border-gray-600">
                                    {
                                        locations.map((location) => (
                                            <div key={`userhomepage-searchlocations-${location.id}`} className="flex items-center justify-between px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-500" onClick={() => navigateTo(location.slug)}>
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <Image className="h-10 w-10 rounded-full" height={120} width={120} src={location.image_url_thumb} alt={location.name} />
                                                    </div> 
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{location.name}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{location.country_name}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    {/* TODO: add stars for total_score */}
                                                    {/* <div className="text-sm text-gray-500 dark:text-gray-400">3 listings</div> */}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div>
                        <button onClick={searchLocations} className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Search</button>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center">
                    <div className="inline-flex mr-0 md:mr-4 mb-4 rounded-md shadow-sm w-full md:w-auto" role="group">
                        <button type="button" onClick={findRandomLocation} disabled={searchRandomCityLoading} className="w-full md:w-auto justify-center inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white">
                            {
                                searchRandomCityLoading ?
                                    <>
                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                        </svg>
                                        Loading...
                                    </> :
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                                        </svg>

                                        Take me somewhere
                                    </>
                            }
                        </button>
                    </div>
                    <div className="flex items-center justify-center mr-0 rounded-md w-full md:w-auto" role="group">
                        <div className="flex items-center mb-4 justify-center w-full md:w-auto px-1 py-0.5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white">
                            {
                                searchRandomCityByRegionLoading ?
                                    <>
                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                        </svg>
                                        Loading...
                                    </> :
                                    <div className="flex flex-col md:flex-row justify-center items-center">
                                        <div className="flex flex-wrap justify-center items-center">
                                            <button type="button" onClick={() => findRandomLocationByRegion('Asia')} disabled={searchRandomCityByRegionLoading} className="inline-flex my-1 items-center px-2 py-1 ml-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                Asia
                                            </button>
                                            <button type="button" onClick={() => findRandomLocationByRegion('Europe')} disabled={searchRandomCityByRegionLoading} className="inline-flex my-1 items-center px-2 py-1 ml-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                Europe
                                            </button>
                                            <button type="button" onClick={() => findRandomLocationByRegion('Oceania')} disabled={searchRandomCityByRegionLoading} className="inline-flex my-1 items-center px-2 py-1 ml-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                Oceania
                                            </button>
                                            <button type="button" onClick={() => findRandomLocationByRegion('North America')} disabled={searchRandomCityByRegionLoading} className="inline-flex my-1 items-center px-2 py-1 ml-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                North America
                                            </button>
                                            <button type="button" onClick={() => findRandomLocationByRegion('Latin America')} disabled={searchRandomCityByRegionLoading} className="inline-flex my-1 items-center px-2 py-1 ml-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                Latin America
                                            </button>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <PopularTravelers />

            {/* Promo for our browser extensions */}
            <section className="bg-white dark:bg-gray-900 rounded-lg my-8 mx-6 p-4">
                <div className="grid px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7 mb-4">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Beautiful places on your new tab page</h1>
                        <p className="mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Transform your new tab page into a beautiful location from around the world with our travel extension. Our extension is perfect for digital nomads who want to explore the world from their browser. Our extension is SEO optimized to help you find the best travel destinations. Install our extension today and start exploring the world from your browser!</p>
                        <div className="flex flex-col sm:flex-row gap-x-4 gap-y-4">
                            <p className="inline-flex font-extrabold items-center justify-center px-5 py-3 mr-3 text-base text-center text-primary-700 rounded-l">
                                Get the extension free
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </p>
                            <div className="flex gap-x-4 justify-center sm:justify-start">
                                {/* Chrome icon */}
                                <a href="https://chrome.google.com/webstore/detail/wanderlust-new-tab/eengninahgaajcfgddamfpbjhcoghdbj" target="_blank" rel="noopener noreferrer">
                                    <Image src="/chrome_logo.png" alt="Chrome logo" width={150} height={50} className="h-12 w-12 rounded-lg" />
                                </a>
                                {/* Firefox icon */}
                                <a href="https://addons.mozilla.org/en-US/firefox/addon/wanderlust-new-tab/" target="_blank" rel="noopener noreferrer">
                                    <Image src="/firefox_logo.webp" alt="Firefox logo" width={150} height={50} className="h-12 w-12 rounded-lg" />
                                </a>
                                {/* Edge icon */}
                                <a href="https://microsoftedge.microsoft.com/addons/detail/wanderlust-new-tab/phoiidojckakdofhhddiodioomhopdil" target="_blank" rel="noopener noreferrer">
                                    <Image src="/edge_logo.webp" alt="Microsoft Edge logo" width={150} height={50} className="h-12 w-12 rounded-lg" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex mt-4 sm:mt-auto sm:mb-auto h-60 flex-col lg:col-span-5 lg:flex-row">
                        {
                            theme === 'dark' ? (
                                <Image src="/extension_dark.png" className="rounded-lg object-contain xl:object-cover" fill alt="Wanderlust Extension Web App" />
                            ): (
                                <Image src="/extension_light.png" className="rounded-lg object-contain xl:object-cover" fill alt="Wanderlust Extension Web App" />
                            )
                        }
                    </div>                
                </div>
            </section>

            {/* FEATURED CITIES */}
            <PopularCities />
            
            <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
                <div className="grid gap-8 lg:grid-cols-2">
                {
                    posts.map(post => (
                        <div key={`blogCard-${post.slug}-${post.author.id}`}>
                            <BlogCard post={post} fullHeight={true} />
                        </div>
                    ))
                }  
                </div>
                <div className="w-full flex justify-center items-center mt-6">
                    <button onClick={() => router.push('/blog')} className="py-3 px-5 w-30 text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Explore More of our Articles</button>
                </div>
            </div>
        </div>
    )
}