/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// Components
import CustomHead from '../shared_components/CustomHead';
import Footer from '../components/Footer';

export default function WanderlustCommunityFeaturePage() {
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
            <CustomHead
                title="Connect with Travelers and Discover the Best Places with Wanderlust App"
                description="Wanderlust App's Wanderlust Community is the perfect place to connect with other travelers and discover new places. See other traveler's favorite places and get insider information from experienced digital nomads."
                image={'/communityDark1.png'}
                alt="Wanderlust Community - Wanderlust App"
                url="https://www.wanderlustapp.io/wanderlust-community"
            />
            
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6" id="top">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <div className="flex items-center justify-center w-12 px-2 py-1 mr-2 text-xs font-medium leading-4 text-white uppercase bg-red-500 rounded-full hover:bg-primary-800 transition-colors cursor-pointer">
                            <Link href="/pro" className="w-full flex items-center justify-center">
                                <span className="text-white">PRO</span>
                            </Link>
                        </div>
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">The Wanderlust Community for Digital Nomads & Travelers</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">At Wanderlust App, we believe that the best travel advice comes from fellow travelers who have been there and done that. That&apos;s why we&apos;ve created the Wanderlust Community feature, where you can connect with like-minded digital nomads and travelers from around the world. Discover new destinations, share your travel tips and insights, and connect with a community of adventurers just like you.</p>
                        <Link href="/pro" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Get started
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </Link>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <Image width={800} height={600} className="object-contain dark:hidden" src="/communityLight1.png" alt="Wanderlust Community" />
                        <Image width={800} height={600} className="object-contain hidden dark:block" src="/communityDark1.png" alt="Wanderlust Community" />
                    </div>                
                </div>
                <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <Image width={800} height={600} className="object-contain w-full dark:hidden" src="/communityLight2.png" alt="Wanderlust Community" />
                    <Image width={800} height={600} className="object-contain w-full hidden dark:block" src="/communityDark2.png" alt="Wanderlust Community" />
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">A Global Network of Travelers</h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Our Wanderlust Community feature is designed to help you connect with other travelers and discover new destinations, insider tips, and advice from those who have been there before. With a community of digital nomads and travelers from around the world, you&apos;ll have access to a wealth of knowledge and experience that will make your travel adventures even more memorable.</p>
                        <Link href="/pro" className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                            Get started
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </Link>
                    </div>
                </div>
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Your Traveler Profile</h2>
                        <p>&quot;The Wanderlust App profile is the hub for all of your travel-related information. You can see favorite places around the world and and bucket list destinations, as well as travel statistics and reviews of the places visited. Share your profile with friends and fellow travelers to inspire their next adventure or connect with others who share your passion for exploration. With Wanderlust App, your travel experiences are not only saved, but shared with the world.&quot;</p>
                    </div>
                    <div className="mt-8">
                        <Image width={800} height={600} className="object-contain w-full rounded-lg dark:hidden" src="/communityLight3.png" alt="office content 1" />
                        <Image width={800} height={600} className="object-contain w-full rounded-lg  hidden dark:block" src="/communityDark3.png" alt="office content 1" />
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Wanderlust Community Benefits
                        </h2>
                        <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
                            At Wanderlust App, we know that the best travel experiences come from insider knowledge and recommendations. That&apos;s why we created the Wanderlust Community, which lets you connect with other digital nomads and travelers who have been across the world and know all the best places. Here are just a few of the many benefits of using our Wanderlust Community feature:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 mt-12 text-center sm:mt-16 gap-x-20 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Insider Tips
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Get insider tips from fellow travelers who have been there before, including the best places to stay, eat, and explore.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Personalized Recommendations
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Discover personalized recommendations based on your travel interests and preferences, from fellow travelers who share your passions.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Connect with Like-Minded Adventurers
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Connect with a community of like-minded digital nomads and travelers who share your passion for adventure and exploration.
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
                            <p className="text-2xl font-medium text-gray-900 dark:text-white">&quot;I can&apos;t imagine traveling without Wanderlust App&apos;s Wanderlust Community feature. It&apos;s amazing to connect with other travelers who share my passion for adventure and to get insider tips and advice from those who have been there before. Plus, being able to see other traveler&apos;s favorite places has led me to discover some hidden gems that I never would have found on my own. It&apos;s like having a personal travel advisor wherever I go!&quot;</p>
                        </blockquote>
                        <figcaption className="flex items-center justify-center mt-6 space-x-3">
                            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                <div className="pr-3 font-medium text-gray-900 dark:text-white">Micheal S.</div>
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