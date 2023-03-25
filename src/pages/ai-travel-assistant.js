import { useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// Components
import Footer from '../components/Footer';

export default function TravelAssistantFeaturePage() {
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
                <title>Plan Your Next Adventure with Wanderlust App's AI Travel Assistant</title>
                <meta key="description" name="description" content="Wanderlust App's AI Travel Assistant makes trip planning a breeze. Talk to our custom trained travel AI to get personalized recommendations for your next adventure." />

                {/* <!-- Open Graph / Facebook --> */}
                <meta key="type" property="og:type" content="website" />
                <meta key="title" property="og:title" content="Plan Your Next Adventure with Wanderlust App's AI Travel Assistant" />
                <meta key="url" property="og:url" content="https://www.wanderlustapp.io/team" />
                <meta key="description" property="og:description" content="Wanderlust App's AI Travel Assistant makes trip planning a breeze. Talk to our custom trained travel AI to get personalized recommendations for your next adventure." />
                <meta key="image" property="og:image" content={'/assistantDark1.png'} />

                {/* <!-- Twitter --> */}
                <meta key="card" property="twitter:card" content="summary_large_image" />
                <meta key="title" property="twitter:title" content="Plan Your Next Adventure with Wanderlust App's AI Travel Assistant" />
                <meta key="url" property="twitter:url" content="https://www.wanderlustapp.io/team" />
                <meta key="description" property="twitter:description" content="Wanderlust App's AI Travel Assistant makes trip planning a breeze. Talk to our custom trained travel AI to get personalized recommendations for your next adventure." />
                <meta key="image" property="twitter:image" content={'/assistantDark1.png'} />
            </Head>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6" id="top">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <div className="flex items-center justify-center w-12 px-2 py-1 mr-2 text-xs font-medium leading-4 text-white uppercase bg-red-500 rounded-full hover:bg-primary-800 transition-colors cursor-pointer">
                            <Link href="/pro" className="w-full flex items-center justify-center">
                                <span className="text-white">PRO</span>
                            </Link>
                        </div>
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">The Ultimate Travel List for Digital Nomads</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Welcome to Wanderlust App - your ultimate travel assistant for digital nomads and travelers! Our AI-powered travel assistant is designed to make planning your trips effortless and enjoyable. With Wanderlust App, you can easily plan your next adventure with the help of a custom trained travel AI, providing personalized travel recommendations for destinations, activities, and accommodations worldwide.</p>
                        <Link href="/pro" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Get started
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </Link>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <Image width={800} height={600} className="object-contain dark:hidden" src="/assistantLight1.png" alt="Wanderlust AI Travel Assistant" />
                        <Image width={800} height={600} className="object-contain hidden dark:block" src="/assistantDark1.png" alt="Wanderlust AI Travel Assistant" />
                    </div>                
                </div>
                <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <Image width={800} height={600} className="object-contain w-full dark:hidden" src="/assistantLight2.png" alt="Wanderlust AI Travel Assistant" />
                    <Image width={800} height={600} className="object-contain w-full hidden dark:block" src="/assistantDark2.png" alt="Wanderlust AI Travel Assistant" />
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Personalized</h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Our AI Travel Assistant is the perfect tool for digital nomads and travelers who are constantly on the go. With our custom trained travel AI, you can easily get personalized recommendations for your next trip. Whether you're looking for the best place to stay, eat, or explore, our travel AI can help you find the perfect match for your travel preferences.</p>
                        <Link href="/pro" className="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                            Get started
                            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </Link>
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            AI Travel Assistant Benefits
                        </h2>
                        <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
                            As long-time digital nomads and travelers, we know that planning a trip can be a daunting task. That's why we created Wanderlust App with the AI Travel Assistant feature. With our custom trained travel AI, you can easily plan any trip around the world with ease. Here are just a few of the many benefits of using our AI Travel Assistant:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 mt-12 text-center sm:mt-16 gap-x-20 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Personalized Recommendations
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Our AI Travel Assistant takes into account your preferences and travel style to provide personalized recommendations that match your interests and budget.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Save Time and Effort
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Say goodbye to hours of researching and planning, our AI Travel Assistant makes planning your trip fast and easy.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Never Miss a Beat
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Wanderlust App's AI Travel Assistant ensures you never miss out on the best experiences, hidden gems, and must-see attractions.
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
                            <p className="text-2xl font-medium text-gray-900 dark:text-white">"Using Wanderlust App's AI Travel Assistant was a game-changer for my trip planning. I loved how it took my preferences and budget into consideration, making personalized recommendations that were spot on. It saved me so much time and effort, and I never felt like I was missing out on the best experiences. I highly recommend it to any digital nomad or traveler out there!"</p>
                        </blockquote>
                        <figcaption className="flex items-center justify-center mt-6 space-x-3">
                            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                <div className="pr-3 font-medium text-gray-900 dark:text-white">Sarah D.</div>
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