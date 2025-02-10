import { useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

// Components
import CustomHead from '../shared_components/CustomHead';
import Footer from '../components/Footer';

export default function ExtensionPage() {
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
                title="Wanderlust App Browser Extension | Chrome, Edge & Firefox"
                description="Wanderlust App is your ultimate browser new tab page showing you beautiful places around the world and helping you track your travel list."
                image="/extension_dark.png"
                url="https://www.wanderlustapp.io/favorite-places"
                alt="Favorite Places - Wanderlust App"
            />
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6" id="top">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl text-black font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Wanderlust App Browser Extension</h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Embark on a journey to the far corners of the earth with every new tab you open. Our Wanderlust extension transforms your browser into a gateway to the world&apos;s most breathtaking landscapes, vibrant cities, and hidden gems. With over 1,000+ users on Chrome, Firefox, and Edge, join a community of explorers and daydreamers who are discovering the planet one tab at a time. Experience the thrill of travel from the comfort of your home, office, or anywhere your day takes you. Let each new tab inspire your next adventure, fuel your curiosity, and bring a touch of beauty to your daily digital experience. Install now and let every click be a step into the extraordinary!</p>
                        <div className="flex gap-x-4">
                            <Link href="https://chromewebstore.google.com/detail/wanderlust-new-tab/eengninahgaajcfgddamfpbjhcoghdbj" target="_blank" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                Get Chrome Extension
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </Link>
                            <Link href="https://microsoftedge.microsoft.com/addons/detail/wanderlust-new-tab/phoiidojckakdofhhddiodioomhopdil" target="_blank" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                Get Edge Extension
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </Link>
                            <Link href="https://addons.mozilla.org/en-US/firefox/addon/wanderlust-new-tab/" target="_blank" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                Get Firefox Extension
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <Image width={800} height={600} className="object-contain dark:hidden" src="/extension_light.png" alt="Wanderlust Favorite Places" />
                        <Image width={800} height={600} className="object-contain hidden dark:block" src="/extension_dark.png" alt="Wanderlust Favorite Places" />
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            Unleash the Explorer Within
                        </h2>
                        <p className="mt-4 text-base font-normal text-gray-500 sm:text-xl dark:text-gray-400">
                            Transform your browsing experience into an endless expedition with our Wanderlust app browser extension. Every new tab opens a door to the vast, vibrant, and varied landscapes of our planet, inviting you to explore the wonders of the world without leaving your desk. From the serenity of untouched nature to the pulsating rhythms of global cities, our carefully curated images not only decorate your digital space but also inspire and rejuvenate your spirit. Discover, learn, and be amazed as you embark on a new journey with every click. Below are features designed to enhance your exploration and bring the world closer to you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 mt-12 text-center sm:mt-16 gap-x-20 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Daily Dose of Wonder
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Wake up to a world of wonder with a new, awe-inspiring image from a different corner of the globe every day. Each image is carefully selected to spark your curiosity and offer a brief escape from the ordinary. Let the stunning visuals of natural wonders, architectural marvels, and cultural festivities inspire your day and fuel your wanderlust.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Personalized Discovery
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Tailor your journey by selecting your preferred types of landscapes and destinations. Whether you&apos;re drawn to serene beaches, bustling cities, or mystical forests, our extension brings your favorite parts of the world directly to your new tab page. Dive deeper with each image&apos;s story and details, bringing the world closer to you, one tab at a time.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                                Seamless Integration
                            </h3>
                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400">
                                Our extension is designed to blend seamlessly into your daily browsing experience. With compatibility across Chrome, Firefox, and Edge, it&apos;s easy to install and use, no matter where you roam online. Plus, our lightweight design ensures your browsing speed stays swift, making every new tab a hassle-free gateway to adventure.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 mb-16 lg:mt-0 lg:flex w-full">
                    <Image width={800} height={600} className="object-contain dark:hidden ml-auto mr-auto" src="/haveTraveledToLight.png" alt="Wanderlust traveled to list" />
                    <Image width={800} height={600} className="object-contain hidden ml-auto mr-auto dark:block" src="/haveTraveledToDark.png" alt="Wanderlust traveled to list" />
                </div>     
                <div className="flex gap-x-4 gap-y-4 w-full justify-center">
                    <Link href="https://chromewebstore.google.com/detail/wanderlust-new-tab/eengninahgaajcfgddamfpbjhcoghdbj" target="_blank" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Get Chrome Extension
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                    <Link href="https://microsoftedge.microsoft.com/addons/detail/wanderlust-new-tab/phoiidojckakdofhhddiodioomhopdil" target="_blank" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Get Edge Extension
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                    <Link href="https://addons.mozilla.org/en-US/firefox/addon/wanderlust-new-tab/" target="_blank" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Get Firefox Extension
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                </div>
                <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                    <figure className="max-w-screen-md mx-auto">
                        <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
                        </svg> 
                        <blockquote>
                            <p className="text-2xl font-medium text-gray-900 dark:text-white">&quot;Every time I open a new tab, it&apos;s like unwrapping a gift from a friend who knows exactly what I love. The Wanderlust extension has turned my routine browsing into a thrilling adventure, making me look forward to each new discovery. It&apos;s more than just an extension; it&apos;s my daily ticket to the world.&quot;</p>
                        </blockquote>
                        <figcaption className="flex items-center justify-center mt-6 space-x-3">
                            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                <div className="pr-3 font-medium text-gray-900 dark:text-white">Shan Q.</div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
                {/* CTA  */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="max-w-screen-xl px-4 py-8 mx-auto text-center sm:py-12 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            <span className="block">Want to check out the web app?</span>
                            <span className="block">Start exploring today!</span>
                        </h2>
                        <div className="mt-8 flex justify-center">
                            <div className="inline-flex rounded-md shadow">
                                <Link href="/" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500" role="button">
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