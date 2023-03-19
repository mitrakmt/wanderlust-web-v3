import Head from "next/head";
import { Analytics } from '@vercel/analytics/react';
import {DefaultSeo} from 'next-seo';

// Hooks
import { AuthProvider } from "../hooks/useAuth";

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
    return (
        <div className={`overflow-scroll h-full max-h-screen scroll-smooth ${roboto.variable} font-sans`}>
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
                                                                    <DefaultSeo
                                                                        title="Plan Your Dream Trip | Wanderlust App - Your Travel Companion"
                                                                        description="Wanderlust App is your ultimate travel companion, helping you plan and organize every aspect of your trip. From finding the best flights and accommodations to creating custom itineraries based on your interests, our app makes travel planning easy and stress-free. Browse our city guides and blog for travel inspiration, connect with fellow digital nomads, and let our AI Assistant optimize your travel plans. Download Wanderlust App and start planning your dream trip today."
                                                                        openGraph={{
                                                                            type: 'website',
                                                                            locale: 'en_IE',
                                                                            url: 'https://www.wanderlustapp.io/',
                                                                            siteName: 'Wanderlust App',
                                                                        }}
                                                                        twitter={{
                                                                            handle: '@wanderlustext',
                                                                            site: '@wanderlustext',
                                                                            cardType: 'summary_large_image',
                                                                        }}
                                                                    />
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