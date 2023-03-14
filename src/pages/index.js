import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

// Main components
import ControlBar from "../components/ControlBar";
import InfoDialog from "../components/InfoDialog/InfoDialog";
import LoadImage from "../components/LoadImage";
import GuestHomePage from "../components/HomePage/GuestHomePage";
import UserHomePage from "../components/HomePage/UserHomePage";
import Footer from "../components/Footer";

// Styling
import 'mapbox-gl/dist/mapbox-gl.css';

// Utils
import trackClick from "../utils/trackClick";
import request from "../utils/request";
import preloadImages, { getQueuedLocation } from "../shared_components/preloadImages";
import trackStat from "../utils/trackStat";

export async function getStaticProps() {
  // fetch no longer needs to be imported from isomorphic-unfetch
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  const posts = await res.json();

  return {
    props: {
      posts: posts.data,
    },
  };
}

export default function Home({ posts }) {
  // Hooks
  const { user, userLoading } = useAuth();
  const router = useRouter();

  // State
    const [currentImageFavoriteStatus, setCurrentImageFavoriteStatus] = useState(false);
    const [, setLocationId] = useState(null);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [cityId, setCityId] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [fact, setFact] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [smallImageUrl, setSmallImageUrl] = useState("");
    const [countryInfo, setCountryInfo] = useState(null);
    const [cityInfo, setCityInfo] = useState(null);
    const [attribution, setAttribution] = useState({
        name: "",
        links: {
        html: "",
        },
    });

    const imageLoadedRef = useRef(imageLoaded);

    useEffect(() => {
        async function main() {
          // Preload images from API
          await preloadImages();
          refresh();
        }
        main();
    }, []);

    const refresh = async () => {
      const location = getQueuedLocation();

      // Get favorite status if logged in
      if (localStorage.getItem('token')) {
        request(`/favorites/city/${location?.city}`)
          .then(response => {
            if (response?.data?.favorited) {
              setCurrentImageFavoriteStatus(true)
            } else {
              setCurrentImageFavoriteStatus(false)
            }
          })
      }

      setImageLoaded(false);
      imageLoadedRef.current = false;
      setLocationId(location.id);
      setFact(location.fact);
      setCountry(location.countryName);
      setCity(location.cityName);
      setCityId(location.city);
      setImageUrl(location.url);
      setSmallImageUrl(location.smallUrl);
      setAttribution(location.attribution);
      setCountryInfo(location.country);
      setCityInfo(location.cityInfo);

      // Track stats
      trackClick('refresh-image')
      trackStat({ type: 'clicks', property: 'refresh' })
  };

  const openInfoModal = () => {
    const infoDialog = document.getElementById("infodialog");
    infoDialog.showModal();
    trackClick('location-info')
    trackStat({ type: 'clicks', property: 'locationInfo' })
  }

  if (userLoading) return null;

  return (
    <section className="relative min-h-screen overflow-scroll max-w-full">
      <Head>
        <title>Wanderlust App</title>
        <meta name="description" content="Explore the world one place at a time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* NEW USER HOMGEPAGE  */}
      <section className="w-full absolute overflow-hidden pr-0 top-0 left-0 right-0 ml-0 flex flex-col justify-center items-center min-h-screen bg-gray-200/80 dark:bg-gray-900/80" style={{ zIndex: 49 }}>
        {
          !user ? <GuestHomePage router={router} request={request} posts={posts} /> : <UserHomePage router={router} user={user} userLoading={userLoading} request={request} posts={posts} />
        }
        <div className="pl-0 sm:pl-16 w-full">
          <Footer />
        </div>
      </section>
      <ControlBar
          cityId={cityId}
          currentImageFavoriteStatus={currentImageFavoriteStatus}
          setCurrentImageFavoriteStatus={setCurrentImageFavoriteStatus}
          refresh={refresh}
          openInfoModal={openInfoModal}
          countryInfo={countryInfo}
          attribution={attribution}
          city={city}
          country={country}
          setShowAuthModal={() => { }}
      />
      <InfoDialog city={city} fact={fact} country={country} attribution={attribution} countryInfo={countryInfo} cityInfo={cityInfo} />
      <div className="w-full h-full fixed">
        {
          imageUrl && (
            <LoadImage
              city={city}
              country={country}
              alt={`${city} ${country}`}
              largeImageSrc={imageUrl}
              smallImageSrc={smallImageUrl}
            />
          )
        }
      </div>
    </section>
  )
}
