import Head from "next/head";

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

// Styles
import '@/styles/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css';

export { reportWebVitals } from 'next-axiom';

export default function MyApp({ Component, pageProps }) {
    return (
        <div className="overflow-scroll h-full scroll-smooth">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="keywords" content="titla, meta, nextjs" />
                <meta name="author" content="Syamlal CM" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
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
                                                                <Component {...pageProps} />
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