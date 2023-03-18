import { useRouter } from 'next/router'
import Head from 'next/head'

export default function four0four() {
    // Hooks
    const router = useRouter();

    return (
        <section className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-900">
            <Head>
                <title>Oops! Page Not Found | Wanderlust App 404 Error</title>
                <meta name="description" content="Uh oh, looks like you've reached a dead end. Don't worry, our team is on it. The Wanderlust App 404 error page lets you know that the page you're looking for is not available. We apologize for the inconvenience and encourage you to check out our other pages for travel inspiration and planning. Let Wanderlust App help you plan your next adventure." />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Oops! Page Not Found | Wanderlust App 404 Error" />
                <meta property="og:url" content="https://www.wanderlustapp.io/404" />
                <meta property="og:description" content="Uh oh, looks like you've reached a dead end. Don't worry, our team is on it. The Wanderlust App 404 error page lets you know that the page you're looking for is not available. We apologize for the inconvenience and encourage you to check out our other pages for travel inspiration and planning. Let Wanderlust App help you plan your next adventure." />
                {/* <meta property="og:image" content={blog?.image_url} /> */}

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Oops! Page Not Found | Wanderlust App 404 Error" />
                <meta property="twitter:url" content="https://www.wanderlustapp.io/404" />
                <meta property="twitter:description" content="Uh oh, looks like you've reached a dead end. Don't worry, our team is on it. The Wanderlust App 404 error page lets you know that the page you're looking for is not available. We apologize for the inconvenience and encourage you to check out our other pages for travel inspiration and planning. Let Wanderlust App help you plan your next adventure." />
                {/* <meta property="twitter:image" content={blog?.image_url} /> */}
            </Head>
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">404</h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                    <a onClick={() => router.push('/')} className="cursor-pointer inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</a>
                </div>   
            </div>
        </section>
    )
}