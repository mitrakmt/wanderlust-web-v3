import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script'

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
import CustomHead from '@/shared_components/CustomHead';

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
                                                                    <CustomHead
                                                                        title="A Digital Nomad's Ultimate Travel Companion - Wanderlust App"
                                                                        description="Wanderlust App is your ultimate travel companion, helping you plan and organize every aspect of your trip. From finding the best flights and accommodations to creating custom itineraries based on your interests, our app makes travel planning easy and stress-free. Browse our city guides and blog for travel inspiration, connect with fellow digital nomads, and let our AI Assistant optimize your travel plans. Download Wanderlust App and start planning your dream trip today."
                                                                        image="https://uploads-ssl.webflow.com/62893f6b6c73c80d757c8d0d/629378f07e3c95055ebae0ca_Screen%20Shot%202022-05-29%20at%204.38.07%20PM%20(1).jpg"
                                                                        alt="Wanderlust App"
                                                                        url="https://www.wanderlustapp.io"
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