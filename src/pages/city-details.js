import { useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// Components
import Footer from '../components/Footer';

export default function CityDetailsFeaturePage() {
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
                <title>Explore Cities Like a Local with Wanderlust App's City Details</title>
                <meta name="description" content="Wanderlust App's City Details feature gives you an in-depth look into each city with insider information, reviews, and more. Discover the best places to visit and local favorites like a true local." />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Explore Cities Like a Local with Wanderlust App's City Details" />
                <meta property="og:url" content="https://www.wanderlustapp.io/team" />
                <meta property="og:description" content="Wanderlust App's City Details feature gives you an in-depth look into each city with insider information, reviews, and more. Discover the best places to visit and local favorites like a true local." />
                <meta property="og:image" content={'/cityDetailsDark2.png'} />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Explore Cities Like a Local with Wanderlust App's City Details" />
                <meta property="twitter:url" content="https://www.wanderlustapp.io/team" />
                <meta property="twitter:description" content="Wanderlust App's City Details feature gives you an in-depth look into each city with insider information, reviews, and more. Discover the best places to visit and local favorites like a true local." />
                <meta property="twitter:image" content={'/cityDetailsDark2.png'} />
            </Head>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6" id="top">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">City Information from the Best Places Around the World</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Discover the world like never before with Wanderlust App's City Details feature. With detailed information on the best places to visit, local favorites, insider information, and reviews, you'll have everything you need to make the most of your trip. Whether you're a digital nomad, traveler, or simply looking for your next adventure, our City Details feature has got you covered.</p>
                        <Link href="/search" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Get started
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </Link>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <Image width={800} height={600} className="object-contain dark:hidden" src="/cityDetailsLight3.png" alt="dashboard image" />
                        <Image width={800} height={600} className="object-contain hidden dark:block" src="/cityDetailsDark3.png" alt="dashboard image" />
                    </div>                
                </div>
                <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <Image width={800} height={600} className="object-contain w-full dark:hidden" src="/cityDetailsLight2.png" alt="dashboard image" />
                    <Image width={800} height={600} className="object-contain w-full hidden dark:block" src="/cityDetailsDark2.png" alt="dashboard image" />
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Everything You Need to Know</h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Our City Details feature is designed to give you an in-depth view of each city, so you can make informed decisions on where to go and what to do. From popular tourist attractions to hidden gems, our comprehensive guide covers it all. Plus, with insider information and local favorites, you'll get a unique perspective on each city that you won't find anywhere else.</p>
                        <Link href="/search" className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                            Get started
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </Link>
                    </div>
                </div>
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Curated Content & User Reviews</h2>
                        <p className="mb-4">At Wanderlust App, we value our community of digital nomads and travelers, and we understand that their experiences and recommendations are invaluable. That's why we've created a space for user-generated content and reviews, where you can share your travel stories, tips, and advice with fellow users.</p>
                        <p className="mb-4">Our User Content & User Reviews section is designed to be a platform for users to share their experiences and insights. Whether you want to write a review of a restaurant, hotel, or tourist attraction, or share your travel itinerary and tips, our community is eager to hear from you.</p>
                        <p className="mb-4">Not only is our User Content & User Reviews section a great way to connect with fellow travelers and share your experiences, but it's also a valuable resource for planning your own trips. Get insider information from other travelers, find hidden gems, and get recommendations for the best places to visit and things to do. Together, we can create a network of informed and empowered travelers, making the most out of every adventure.</p>
                    </div>
                    <div className="mt-8">
                        <Image width={800} height={600} className="object-contain w-full rounded-lg dark:hidden" src="/cityDetailsLight1.png" alt="office content 1" />
                        <Image width={800} height={600} className="object-contain mt-4 w-full lg:mt-10 rounded-lg hidden dark:block" src="/cityDetailsDark1.png" alt="office content 2" />
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            City Details for Nomads Benefits
                        </h2>
                        <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
                            At Wanderlust App, we know that every traveler wants to experience the true essence of a city. That's why we created City Details, which gives you an in-depth view into each city, with insider information, reviews, and more. Here are just a few of the many benefits of using our City Details feature:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 mt-12 text-center sm:mt-16 gap-x-20 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Insider Information
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Get a local's perspective on each city with our insider information, giving you an authentic travel experience.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Comprehensive Guide
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Our City Details feature covers everything you need to know about each city, from the best places to visit to the local cuisine and culture
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Personalized Recommendations
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Whether you're looking for the best restaurants, museums, or outdoor activities, our City Details feature provides personalized recommendations based on your preferences and interests.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                    <figure className="max-w-screen-md mx-auto">
                        <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
                        </svg> 
                        <blockquote>
                            <p className="text-2xl font-medium text-gray-900 dark:text-white">"Wanderlust App's City Details feature is a must-have for any traveler. I loved how it provided a comprehensive guide to each city, with insider information and local favorites that you won't find anywhere else. It was like having a local guide with me every step of the way. Highly recommended!"</p>
                        </blockquote>
                        <figcaption className="flex items-center justify-center mt-6 space-x-3">
                            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                <div className="pr-3 font-medium text-gray-900 dark:text-white">Micheal T.</div>
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