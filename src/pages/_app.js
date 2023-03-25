import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';
import Script from 'next/script'

// Hooks
import { AuthProvider } from "../hooks/useAuth";
import { useRouter } from "next/router";

// Context
import FeaturedCitiesProvider from '../context/FeaturedCitiesProvider';
import FavoritesProvider from '../context/FavoritesProvider';
import CountriesProvider from '../context/CountriesProvider';
import FollowsProvider from '../context/FollowsProvider';
import ListsProvider from '../context/ListsProvider';
import FollowersProvider from '../context/FollowersProvider';
import FollowingProvider from '../context/FollowingProvider';
import ToastsProvider from '../context/ToastsProvider';
import ThemeProvider from '../context/ThemeProvider';
import CommunityProvider from '../context/CommunityProvider';
import ToVisitProvider from '../context/ToVisitProvider';

// Layouts
import Layout from '../layouts/main';
import ErrorBoundary from '../components/ErrorBoundary';

// Styles
import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/weather.scss';
import '../styles/weatherCard.scss';

export { reportWebVitals } from 'next-axiom';

// Fonts
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700', '900'],
    variable: '--font-roboto',
})

export default function MyApp({ Component, pageProps }) {

    // const { pathname } = useRouter();

    // useEffect(() => {
    //     // some browsers (like safari) may require a timeout to delay calling this
    //     // function after a page has loaded; otherwise, it may not update the position
    //     console.log('changing')
    //      window.scrollTo(0, 0);
    // }, [pathname]);
    
    return (
        <div className={`overflow-scroll h-full max-h-screen scroll-smooth ${roboto.variable} font-sans`}>
            <Script id="show-banner" strategy="afterInteractive">
                {`var script = document.createElement('script');
                script.id = '8acba1dd-2ad0-4759-aae5-8f4949984bd9';
                script.type = 'module';
                script.src = 'https://pageimprove.io';
                document.head.appendChild(script);`}
            </Script>            
            <AuthProvider>
                <ThemeProvider>
                    <ToastsProvider>
                        <FollowsProvider>
                            <FollowersProvider>
                                <FollowingProvider>
                                    <CountriesProvider>
                                        <ToVisitProvider>
                                            <ListsProvider>
                                                <FeaturedCitiesProvider>
                                                    <FavoritesProvider>
                                                        <CommunityProvider>
                                                            <Layout>
                                                                <ErrorBoundary>
                                                                    <Head>
                                                                        <title>Plan Your Dream Trip | Wanderlust App - Your Travel Companion</title>
                                                                        <meta key="viewport" name="viewport" content="initial-scale=1.0, width=device-width" />
                                                                        <meta key="description" name="description" content="Wanderlust App is your ultimate travel companion, helping you plan and organize every aspect of your trip. From finding the best flights and accommodations to creating custom itineraries based on your interests, our app makes travel planning easy and stress-free. Browse our city guides and blog for travel inspiration, connect with fellow digital nomads, and let our AI Assistant optimize your travel plans. Download Wanderlust App and start planning your dream trip today." />
                                                                        <meta key="image" property="og:image" content="https://uploads-ssl.webflow.com/62893f6b6c73c80d757c8d0d/629378f07e3c95055ebae0ca_Screen%20Shot%202022-05-29%20at%204.38.07%20PM%20(1).jpg" />
                                                                        <meta key="width" property="og:image:width" content="800" />
                                                                        <meta key="height" property="og:image:height" content="600" />
                                                                        <meta key="alt" property="og:image:alt" content="Wanderlust App" />
                                                                        <meta key="type" property="og:type" content="website" />
                                                                        <meta key="locale" property="og:locale" content="en_IE" />
                                                                        <meta key="url" property="og:url" content="https://www.wanderlustapp.io/" />
                                                                        <meta key="site_name" property="og:site_name" content="Wanderlust App" />
                                                                        <meta key="card" name="twitter:card" content="summary_large_image" />
                                                                        <meta key="site" name="twitter:site" content="@wanderlustext" />
                                                                        <meta key="creator" name="twitter:creator" content="@wanderlustext" />
                                                                        <meta key="image" property="twitter:image" content="https://uploads-ssl.webflow.com/62893f6b6c73c80d757c8d0d/629378f07e3c95055ebae0ca_Screen%20Shot%202022-05-29%20at%204.38.07%20PM%20(1).jpg" />
                                                                        <meta key="alt" property="twitter:image:alt" content="Wanderlust App" />
                                                                    </Head>
                                                                    <Component {...pageProps} />
                                                                    <Analytics />
                                                                </ErrorBoundary>
                                                            </Layout>
                                                        </CommunityProvider>
                                                    </FavoritesProvider>
                                                </FeaturedCitiesProvider>
                                            </ListsProvider>
                                        </ToVisitProvider>
                                    </CountriesProvider>
                                </FollowingProvider>
                            </FollowersProvider>
                        </FollowsProvider>
                    </ToastsProvider>
                </ThemeProvider>
            </AuthProvider>
        </div>
    )
}