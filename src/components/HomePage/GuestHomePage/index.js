import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Context
import { themeContext } from '../../../context/ThemeProvider';

// Components
import Features from './components/Features';
import PopularTravelers from '../components/PopularTravelers';
import PopularCities from '../components/PopularCities';
import BlogCard from '../../BlogCard';

export default function GuestHomePage({ router, posts }) {
    const [theme] = useContext(themeContext);

    return (
        <div className=" px-2 sm:pl-16 pr-0 flex flex-col items-center w-10/12">
            <div className="mx-auto mt-56 mb-44 sm:text-center sm:flex sm:flex-col sm:items-center sm:justify-center">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Helping you to explore the world</h1>
                <p className="mb-8 text-lg font-bold text-gray-800 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300">Wanderlust App let&#39;s you to find, explore and share the best places around the world, and gives you the tools to plan everything you&#39;d need.</p>
                <div className="flex flex-col mt-4 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <Link href={'/signup'} className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Signup for free
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                    <Link href={'/search'} className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Search for a place
                    </Link> 
                </div>
                <div className="px-4 mx-auto flex mt-4 flex-col items-center justify-center text-center lg:px-36">
                    <span className="font-semibold text-gray-700 uppercase dark:text-gray-300">FEATURED IN</span>
                    <div className="flex flex-wrap justify-center items-center mt-8 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 sm:justify-between bg-gray-100 dark:bg-gray-700">
                        <svg className="h-11" viewBox="0 0 208 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.7714 20.729C42.7714 31.9343 33.6867 41.019 22.4814 41.019C11.2747 41.019 2.19141 31.9343 2.19141 20.729C2.19141 9.52228 11.2754 0.438965 22.4814 0.438965C33.6867 0.438965 42.7714 9.52297 42.7714 20.729Z" fill="currentColor"/>
                            <path d="M25.1775 21.3312H20.1389V15.9959H25.1775C25.5278 15.9959 25.8747 16.0649 26.1983 16.1989C26.522 16.333 26.8161 16.5295 27.0638 16.7772C27.3115 17.0249 27.508 17.319 27.6421 17.6427C27.7761 17.9663 27.8451 18.3132 27.8451 18.6635C27.8451 19.0139 27.7761 19.3608 27.6421 19.6844C27.508 20.0081 27.3115 20.3021 27.0638 20.5499C26.8161 20.7976 26.522 20.9941 26.1983 21.1281C25.8747 21.2622 25.5278 21.3312 25.1775 21.3312ZM25.1775 12.439H16.582V30.2234H20.1389V24.8881H25.1775C28.6151 24.8881 31.402 22.1012 31.402 18.6635C31.402 15.2258 28.6151 12.439 25.1775 12.439Z" fill="white" />
                            <path d="M74.9361 17.4611C74.9361 16.1521 73.9305 15.3588 72.6239 15.3588H69.1216V19.5389H72.6248C73.9313 19.5389 74.9369 18.7457 74.9369 17.4611H74.9361ZM65.8047 28.2977V12.439H73.0901C76.4778 12.439 78.3213 14.7283 78.3213 17.4611C78.3213 20.1702 76.4542 22.4588 73.0901 22.4588H69.1216V28.2977H65.8055H65.8047ZM80.3406 28.2977V16.7362H83.3044V18.2543C84.122 17.2731 85.501 16.4563 86.9027 16.4563V19.3518C86.6912 19.3054 86.4349 19.2826 86.0851 19.2826C85.1039 19.2826 83.7949 19.8424 83.3044 20.5681V28.2977H80.3397H80.3406ZM96.8802 22.3652C96.8802 20.6136 95.8503 19.0955 93.9823 19.0955C92.1364 19.0955 91.1105 20.6136 91.1105 22.366C91.1105 24.1404 92.1364 25.6585 93.9823 25.6585C95.8503 25.6585 96.8794 24.1404 96.8794 22.3652H96.8802ZM88.0263 22.3652C88.0263 19.1663 90.2684 16.4563 93.9823 16.4563C97.7198 16.4563 99.962 19.1655 99.962 22.3652C99.962 25.5649 97.7198 28.2977 93.9823 28.2977C90.2684 28.2977 88.0263 25.5649 88.0263 22.3652ZM109.943 24.3739V20.3801C109.452 19.6316 108.378 19.0955 107.396 19.0955C105.693 19.0955 104.524 20.4265 104.524 22.366C104.524 24.3267 105.693 25.6585 107.396 25.6585C108.378 25.6585 109.452 25.1215 109.943 24.3731V24.3739ZM109.943 28.2977V26.5697C109.054 27.6899 107.841 28.2977 106.462 28.2977C103.637 28.2977 101.465 26.1499 101.465 22.3652C101.465 18.6993 103.59 16.4563 106.462 16.4563C107.793 16.4563 109.054 17.0177 109.943 18.1843V12.439H112.932V28.2977H109.943ZM123.497 28.2977V26.5925C122.727 27.4337 121.372 28.2977 119.526 28.2977C117.052 28.2977 115.884 26.9431 115.884 24.7473V16.7362H118.849V23.5798C118.849 25.1451 119.666 25.6585 120.927 25.6585C122.071 25.6585 122.983 25.028 123.497 24.3731V16.7362H126.463V28.2977H123.497ZM128.69 22.3652C128.69 18.9092 131.212 16.4563 134.67 16.4563C136.982 16.4563 138.383 17.4611 139.131 18.4886L137.191 20.3093C136.655 19.5153 135.838 19.0955 134.81 19.0955C133.011 19.0955 131.751 20.4037 131.751 22.366C131.751 24.3267 133.011 25.6585 134.81 25.6585C135.838 25.6585 136.655 25.1915 137.191 24.4203L139.131 26.2426C138.383 27.2702 136.982 28.2977 134.67 28.2977C131.212 28.2977 128.69 25.8456 128.69 22.3652ZM141.681 25.1915V19.329H139.813V16.7362H141.681V13.6528H144.648V16.7362H146.935V19.329H144.648V24.3975C144.648 25.1215 145.02 25.6585 145.675 25.6585C146.118 25.6585 146.541 25.495 146.702 25.3087L147.334 27.5728C146.891 27.9714 146.096 28.2977 144.857 28.2977C142.779 28.2977 141.681 27.2238 141.681 25.1915ZM165.935 28.2977V21.454H158.577V28.2977H155.263V12.439H158.577V18.5577H165.935V12.4398H169.275V28.2977H165.935ZM179.889 28.2977V26.5925C179.119 27.4337 177.764 28.2977 175.919 28.2977C173.443 28.2977 172.276 26.9431 172.276 24.7473V16.7362H175.241V23.5798C175.241 25.1451 176.058 25.6585 177.32 25.6585C178.464 25.6585 179.376 25.028 179.889 24.3731V16.7362H182.856V28.2977H179.889ZM193.417 28.2977V21.1986C193.417 19.6333 192.602 19.0963 191.339 19.0963C190.172 19.0963 189.285 19.7504 188.77 20.4045V28.2985H185.806V16.7362H188.77V18.1843C189.495 17.3439 190.896 16.4563 192.718 16.4563C195.217 16.4563 196.408 17.8573 196.408 20.0523V28.2977H193.418H193.417ZM199.942 25.1915V19.329H198.076V16.7362H199.943V13.6528H202.91V16.7362H205.198V19.329H202.91V24.3975C202.91 25.1215 203.282 25.6585 203.936 25.6585C204.38 25.6585 204.802 25.495 204.965 25.3087L205.595 27.5728C205.152 27.9714 204.356 28.2977 203.119 28.2977C201.04 28.2977 199.943 27.2238 199.943 25.1915" fill="currentColor"/>
                        </svg>
                    </div>
                </div> 
            </div>
            <Features />
            {/* CONTENT */}
            <div className="w-full gap-16 items-center py-8 px-4 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 bg-white/90 dark:bg-gray-800/90 rounded-lg">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Your Personal Travel Assistant</h2>
                    <p className="mb-4 text-gray-700 dark:text-white">Welcome to Wanderlust App - your digital travel companion! As a digital nomad, I created this web application to help travelers find the best places around the world and track their travels. I wanted to make the travel experience easier, more enjoyable, and more fulfilling. With Wanderlust App, I created a platform that connects travelers and fosters positivity and support in the travel community. </p>
                    <p className="mb-4 text-gray-700 dark:text-white">I&#39;ve always been fascinated by the idea of travel and exploring new places. As a digital nomad myself, I know firsthand the joys and challenges that come with constantly being on the move. While travel can be incredibly rewarding, it can also be overwhelming and stressful at times - especially when you&#39;re in a new and unfamiliar place.</p>
                    <p className="mb-4 text-gray-700 dark:text-white">If you&#39;re ready to embark on your next adventure, join the Wanderlust App community today and let&#39;s start exploring the world together!</p>
                </div>
                <div className="hidden sm:grid grid-cols-2 gap-4 mt-8 ">
                    <div className="rounded-lg border h-80 overflow-hidden -mt-10 border-gray-300 dark:border-gray-700">
                        <Image className="relative w-full h-full object-cover rounded-lg" height={340} quality={80} width={230} src={'/guestHomeImage1.png'} alt="Wanderlust App" />
                    </div>
                    <div className="rounded-lg border mt-10 h-80 overflow-hidden border-gray-300 dark:border-gray-700">
                        <Image className="relative w-full h-full object-cover rounded-lg" height={340} quality={80} width={230} src={'/guestHomeImage2.png'} alt="Wanderlust App" />
                    </div>
                </div>
            </div>

            {/* EXTENSION  */}
            <section className="bg-white dark:bg-gray-900 rounded-lg my-12">
                <div className="grid px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7 mb-4">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Beautiful places on your new tab page</h1>
                        <p className="mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Transform your new tab page into a beautiful location from around the world with our travel extension. Our extension is perfect for digital nomads who want to explore the world from their browser. Our extension is SEO optimized to help you find the best travel destinations. Install our extension today and start exploring the world from your browser!</p>
                        <div className="flex flex-col gap-x-4 sm:flex-row">
                            <p className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-extrabold text-center text-primary-700 rounded-lg">
                                Get the extension free
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </p>
                            <div className="flex gap-x-4 justify-center sm:justify-start">
                                {/* Chrome icon */}
                                <a href="https://chrome.google.com/webstore/detail/flowbite-new-tab-page/ndjgjgjgjgjgjgjgjgjgjgjgjgjgjgjg" target="_blank" rel="noopener noreferrer">
                                    <Image src="/chrome_logo.png" alt="chrome logo" width={150} height={50} className="h-12 w-12 rounded-lg" />
                                </a>
                                {/* Firefox icon */}
                                <a href="https://addons.mozilla.org/en-US/firefox/addon/flowbite-new-tab-page/" target="_blank" rel="noopener noreferrer">
                                    <Image src="/edge_logo.webp" alt="Edge logo" width={150} height={50} className="h-12 w-12 rounded-lg" />
                                </a>
                                {/* Edge icon */}
                                <a href="https://microsoftedge.microsoft.com/addons/detail/flowbite-new-tab-page/ndjgjgjgjgjgjgjgjgjgjgjgjgjgjgjg" target="_blank" rel="noopener noreferrer">
                                    <Image src="/firefox_logo.webp" alt="Firefox logo" width={150} height={50} className="h-12 w-12 rounded-lg" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex mt-4 sm:mt-auto sm:mb-auto h-60 flex-col lg:col-span-5 lg:flex-row">
                        {
                            theme === 'dark' ? (
                                <Image src="/extension_dark.png" className="rounded-lg object-contain xl:object-cover" fill alt="Wanderlust Extension" />
                            ): (
                                <Image src="/extension_light.png" className="rounded-lg object-contain xl:object-cover" fill alt="Wanderlust Extension" />
                            )
                        }
                    </div>                
                </div>
            </section>

            {/* CTA  */}
            <div className="px-4 py-8 mx-auto text-center my-32 bg-white/90 dark:bg-gray-800/90 rounded-lg">
                <h2 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Start Exploring</h2>
                <p className="mb-8 text-lg font-normal text-gray-700 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-300 my-8">Wanderlust App let&#39;s you to find, explore and share the best places around the world, and gives you the tools to plan everything you&apos;d need.</p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <Link href="/signup" className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Signup for free
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                    <Link href="/search" className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Search for a place
                    </Link>  
                </div>
            </div>
            {/* POPULAR TRAVELERS  */}
            <PopularTravelers />

            {/* QUOTE  */}
            <div className="px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 my-20">
                <figure className="mx-auto">
                    <svg className="h-12 mx-auto mb-3 text-gray-600 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/>
                    </svg> 
                    <blockquote>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">&quot;Wanderlust App is the ultimate travel companion you&#39;ve been waiting for! This app is a game changer for anyone who loves to travel and explore new places. With Wanderlust App, you&apos;ll have access to a wealth of information at your fingertips, including travel guides, recommendations for top attractions, and local insider tips.&quot;</p>
                    </blockquote>
                    <figcaption className="flex items-center justify-center mt-6 space-x-3">
                        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                            <div className="pr-3 font-medium text-gray-900 dark:text-white">Joey Y.</div>
                            <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">Digital Nomad</div>
                        </div>
                    </figcaption>
                </figure>
            </div>
            {/* FEATURED CITIES */}
            <PopularCities />


            {/* BLOG  */}
            <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
                <div className="mx-auto text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Digital Nomad Blog</h2>
                    <p className="font-normal text-gray-900 sm:text-xl dark:text-gray-100">We help you to learn about the best places around the world, the most beautiful places to see, and everything you&apos;d need as a nomad.</p>
                </div> 
                <div className="grid gap-8 lg:grid-cols-2">
                    {
                        posts.map(post => (
                            <div key={`guestHomePage-${post.id}-${post.slug}`}>
                                <BlogCard post={post} fullHeight={true} />
                            </div>
                        ))
                    }
                </div>  
                <div className="w-full flex justify-center items-center mt-6">
                    <button onClick={() => router.push('/blog')} className="py-3 px-5 w-30 text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Explore More of our Articles</button>
                </div>
            </div>
            {/* NEWSLETTER  */}
            {/* <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6 my-20">
                <div className="mx-auto sm:text-center">
                    <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">Sign up for our newsletter</h2>
                    <p className="mx-auto mb-8 font-light text-gray-600 md:mb-12 sm:text-xl dark:text-gray-300">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
                    <form action="#">
                        <div className="items-center mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
                            <div className="relative w-full">
                                <label htmlFor="email" className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                </div>
                                <input className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" required="" />
                            </div>
                            <div>
                                <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
                            </div>
                        </div>
                        <div className="mx-auto text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="#" className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
                    </form>
                </div>
            </div> */}
            {/* TESTIMONIALS  */}
            {/* <Testimonials /> */}
        </div>
    )
}