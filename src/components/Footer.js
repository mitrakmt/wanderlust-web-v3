import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900/90 w-full">
            <div className="grid grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
                <div>
                    <p className="mb-6 text-sm font-bold text-gray-500 uppercase dark:text-gray-400">About</p>
                    <ul className="text-gray-500 dark:text-gray-400">
                        <Link href="/extension"><li className="mb-4">
                            <p className="hover:underline">Extensions</p>
                        </li></Link>
                        <Link href="/blog"><li className="mb-4">
                            <p className="hover:underline">Blog</p>
                        </li></Link>
                        {/* <Link href="/countries"><li className="mb-4">
                            <p className="hover:underline">Countries</p>
                        </li></Link> */}
                        <Link href="/faq"><li className="mb-4">
                            <p className="hover:underline">FAQ</p>
                        </li></Link>
                        <Link href="/pro"><li className="mb-4">
                            <p className="hover:underline">Go Pro</p>
                        </li></Link>
                    </ul>
                </div>
                <div>
                    <p className="mb-6 text-sm font-bold text-gray-500 uppercase dark:text-gray-400">Help center</p>
                    <ul className="text-gray-500 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="https://twitter.com/WanderlustExt" target="_blank" className="hover:underline" aria-label="Read more from Wanderlust on Twitter">Twitter</a>
                        </li>
                        <Link href="/contact"><li className="mb-4">
                            <p className="hover:underline">Contact Us</p>
                        </li></Link>
                        <Link href="/privacy"><li className="mb-4">
                            <p className="hover:underline">Privacy Policy</p>
                        </li></Link>
                        <Link href="/terms-of-service"><li className="mb-4">
                            <p className="hover:underline">Terms of Service</p>
                        </li></Link>
                    </ul>
                </div>
                <div>
                    <p className="mb-6 text-sm font-bold text-gray-500 uppercase dark:text-gray-400">Browser Extension</p>
                    <ul className="text-gray-500 dark:text-gray-400">
                        <li className="mb-4">
                            <a href="https://chrome.google.com/webstore/detail/wanderlust-new-tab/eengninahgaajcfgddamfpbjhcoghdbj" target="_blank" className="hover:underline" aria-label="Wanderlust's Chrome Extension">Chrome</a>
                        </li>
                        <li className="mb-4">
                            <a href="https://addons.mozilla.org/en-US/firefox/addon/wanderlust-new-tab/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search" target="_blank" className="hover:underline" aria-label="Wanderlust's Firefox Extension">Firefox</a>
                        </li>
                        <li className="mb-4">
                            <a href="https://microsoftedge.microsoft.com/addons/detail/wanderlust-new-tab/phoiidojckakdofhhddiodioomhopdil" target="_blank" className="hover:underline" aria-label="Wanderlust's Edge Extension">Edge</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="mb-6 text-sm font-bold text-gray-500 uppercase dark:text-gray-400">Features</p>
                    <ul className="text-gray-500 dark:text-gray-400">
                        <Link href="/ai-travel-assistant"><li className="mb-4">
                            <p className="hover:underline">AI Travel Assistant</p>
                        </li></Link>
                        <Link href="/travel-bucket-list"><li className="mb-4">
                            <p className="hover:underline">Travel Bucket List</p>
                        </li></Link>
                        <Link href="/want-to-travel-list"><li className="mb-4">
                            <p className="hover:underline">Want to Travel List</p>
                        </li></Link>
                        <Link href="/favorite-places"><li className="mb-4">
                            <p className="hover:underline">Favorite Places</p>
                        </li></Link>
                        <Link href="/have-traveled-to"><li className="mb-4">
                            <p className="hover:underline">Traveled To List</p>
                        </li></Link>
                        <Link href="/wanderlust-community"><li className="mb-4">
                            <p className="hover:underline">Wanderlust Community</p>
                        </li></Link>
                        <Link href="/city-details"><li className="mb-4">
                            <p className="hover:underline">City Details</p>
                        </li></Link>
                    </ul>
                </div>
            </div>
            <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-between rounded-lg">
                <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2023 <a href="https://wanderlustapp.io" aria-label="Wanderlust App">WanderlustApp™</a>. All Rights Reserved.</span>
                <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
                    <a href="https://www.facebook.com/wanderlustappio" target="_blank" className="text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Read more from Wanderlust on Facebook">
                        <svg aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5">
                            <path d="M379 22v75h-44c-36 0-42 17-42 41v54h84l-12 85h-72v217h-88V277h-72v-85h72v-62c0-72 45-112 109-112 31 0 58 3 65 4z"></path>
                        </svg>
                        <span className="sr-only">Facebook page</span>
                    </a>
                    <a href="https://www.instagram.com/wanderlustapp/" target="_blank" className="text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Read more from Wanderlust on Instagram">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                        <span className="sr-only">Instagram page</span>
                    </a>
                    <a href="https://twitter.com/WanderlustExt" target="_blank" className="text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Read more from Wanderlust on Twitter">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        <span className="sr-only">Twitter page</span>
                    </a>
                </div>
            </div>
        </footer>
    )
}
