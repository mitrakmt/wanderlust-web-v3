import { useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// Components
import Footer from '../components/Footer';

export default function WantToTravelListFeaturePage() {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            if (document.getElementById('top')) {
                document.getElementById('top').scrollIntoView();
            }
        }
        router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            window.removeEventListener("routeChangeComplete", handleRouteChange) // this event listener is removed after the new route loads
        }
    }, []);

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <Head>
                <title>Meet the Wanderlust App Team | Our Digital Nomads and Travel Experts</title>
                <meta name="description" content="Get to know the Wanderlust App team behind the scenes - a group of passionate digital nomads and travel experts who are dedicated to helping you find and explore the best places around the world. Learn about their backgrounds, expertise, and unique perspectives that shape the vision and mission of Wanderlust App." />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Meet the Wanderlust App Team | Our Digital Nomads and Travel Experts" />
                <meta property="og:url" content="https://www.wanderlustapp.io/team" />
                <meta property="og:description" content="Get to know the Wanderlust App team behind the scenes - a group of passionate digital nomads and travel experts who are dedicated to helping you find and explore the best places around the world. Learn about their backgrounds, expertise, and unique perspectives that shape the vision and mission of Wanderlust App." />
                {/* <meta property="og:image" content={blog?.image_url} /> */}

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Meet the Wanderlust App Team | Our Digital Nomads and Travel Experts" />
                <meta property="twitter:url" content="https://www.wanderlustapp.io/team" />
                <meta property="twitter:description" content="Get to know the Wanderlust App team behind the scenes - a group of passionate digital nomads and travel experts who are dedicated to helping you find and explore the best places around the world. Learn about their backgrounds, expertise, and unique perspectives that shape the vision and mission of Wanderlust App." />
                {/* <meta property="twitter:image" content={blog?.image_url} /> */}
            </Head>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6" id="top">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Track the Places You Want To Travel To</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Have you ever heard about a must-see restaurant in a city or a secret beach that you just have to visit, only to forget about it later? With Wanderlust App's Want to Travel To List feature, you'll never miss out on your dream destinations again. Keep track of all the amazing places you want to visit in the future, from hidden gems to iconic landmarks, and never forget a travel goal again.</p>
                        <a href="#" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Get started
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                        <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                            Speak to Sales
                        </a> 
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <Image width={800} height={600} className="object-contain dark:hidden" src="/travelListLight.png" alt="dashboard image" />
                        <Image width={800} height={600} className="object-contain hidden dark:block" src="/travelListDark.png" alt="dashboard image" />
                    </div>                
                </div>
                <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <Image width={800} height={600} className="object-contain w-full dark:hidden" src="/travelListLight2.png" alt="dashboard image" />
                    <Image width={800} height={600} className="object-contain w-full hidden dark:block" src="/travelListDark2.png" alt="dashboard image" />
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Making the Most of Your Travel Experiences</h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Our Want to Travel To List feature is the perfect tool for digital nomads and travelers who want to make the most of their travel experiences. Whether you're planning an upcoming vacation or simply looking for inspiration for your next adventure, this feature lets you keep track of all the places you want to visit in one convenient location. From restaurants and bars to museums and attractions, you can add any travel goal to your list and easily check them off as you go.</p>
                        <a href="#" className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                            Get started
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Our work
                        </h2>
                        <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
                            Crafted with skill and care to help our clients grow their business!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 mt-12 text-center sm:mt-16 gap-x-20 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <span
                                className="bg-gray-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                Alphabet Inc.
                            </span>
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Stay Organized
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Keep all of your travel goals and bucket list items in one place, so you never forget a must-see destination again.
                            </p>
                            <a href="#" title=""
                                className="text-white bg-primary-700 justify-center hover:bg-primary-800 inline-flex items-center  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                role="button">
                                View case study
                                <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fillRule="evenodd"
                                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>

                        <div className="space-y-4">
                            <span
                                className="bg-gray-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                Microsoft Corp.
                            </span>
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Easily Share
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                            Share your Want to Travel To List with friends and fellow travelers to inspire their next adventure or plan your next trip together.
                            </p>
                            <a href="#" title=""
                                className="text-white bg-primary-700 justify-center hover:bg-primary-800 inline-flex items-center  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                role="button">
                                View case study
                                <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fillRule="evenodd"
                                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>

                        <div className="space-y-4">
                            <span
                            className="bg-gray-100 text-gray-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            Adobe Inc.
                            </span>
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Discover New Destinations
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Get inspired by new and exciting destinations from other traveler's lists, and add them to your own list for future travel goals.
                            </p>
                            <a href="#" title=""
                            className="text-white bg-primary-700 justify-center hover:bg-primary-800 inline-flex items-center  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            role="button">
                            View case study
                            <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"
                                />
                            </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                    <figure className="max-w-screen-md mx-auto">
                        <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
                        </svg> 
                        <blockquote>
                            <p className="text-2xl font-medium text-gray-900 dark:text-white">"I love Wanderlust App's Want to Travel To List feature. I'm always hearing about amazing places to visit from friends or online, and this feature lets me keep track of them all in one place. Plus, it's so easy to share my list with friends and plan our next adventure together. I highly recommend this feature to anyone who loves to travel and wants to make the most of their experiences"</p>
                        </blockquote>
                        <figcaption className="flex items-center justify-center mt-6 space-x-3">
                            <img className="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture" />
                            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                <div className="pr-3 font-medium text-gray-900 dark:text-white">Jason R.</div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
                {/* CTA  */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="max-w-screen-xl px-4 py-8 mx-auto text-center sm:py-12 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            <span className="block">Ready to dive in?</span>
                            <span className="block">Start exploring today!</span>
                        </h2>
                        <div className="mt-8 flex justify-center">
                            <div className="inline-flex rounded-md shadow">
                                <Link href="/signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500" role="button">
                                    Get started
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}