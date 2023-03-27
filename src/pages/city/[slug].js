import { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

// Utils 
import trackStat from "../../utils/trackStat";
import request from '../../utils/request';
import baseRequest from '../../utils/baseRequest';
import removeFavorite from '../../utils/removeFavorite';
import addFavorite from '../../utils/addFavorite';

// Components
import InstagramPost from './instaEmbed';
import CustomHead from '../../shared_components/CustomHead';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import ScoreRating from '../../components/ScoreRating/ScoreRating';
import TextH2 from '../../components/Text/TextH2';
import TextH3 from '../../components/Text/TextH3';
import TextH5 from '../../components/Text/TextH5';
import TextP from '../../components/Text/TextP';
import Button from '../../components/Button/Button';
import Timeline from '../../components/Timeline/Timeline';
import Input from '../../components/Input/Input';
import TextArea from '../../components/TextArea/TextArea';
import FavoriteControl from '../../icons/likeIcon';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import ProBanner from '../../components/ProBanner/ProBanner';
import PlacesMap from '../../components/cityComponents/Map';
import BlogCard from '../../components/BlogCard';

// Utils
import trackClick from '../../utils/trackClick';

// Hooks
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router'

// Context
import { favoritesContext } from '../../context/FavoritesProvider';

export async function getStaticProps({ params: { slug } }) {
    const response = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/cities/slug/${slug}`)
    const citySelected = await response.json()

    // Get blogs for city
    const blogsResponse = await fetch(`https://wanderlust-api-production.up.railway.app/api/v1/blog/city/${citySelected?.data.id}`)
    const blogs = await blogsResponse.json()

    return {
        props: {
            citySelected: citySelected?.data,
            blogs: blogs.data
        },
    };
}

export async function getStaticPaths() {
    const response = await fetch('https://wanderlust-api-production.up.railway.app/api/v1/sitemap/cities')
    const cities = await response.json()
    const paths = cities.map((city) => (
        {
            params: {
                slug: city.slug,
            },
        }
    ))

    return {
        paths,
        fallback: true,
    }
}

export default function CityPage({ citySelected, blogs }) {
    // Hooks
    const { user } = useAuth();
    const router = useRouter()
    const { breadcrumb = "", slug } = router.query

    // Context
    const [favorites, setFavorites] = useContext(favoritesContext);

    // State
    const [cityId, setCityId] = useState(null);
    const [holidays, setHolidays] = useState([]);
    const [locations, setLocations] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewsAverage, setReviewsAverage] = useState(null);
    const [showWriteAReview, setShowWriteAReview] = useState(false);
    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewDescription, setReviewDescription] = useState("");
    const [reviewRating, setReviewRating] = useState(null);
    const [reviewError, setReviewError] = useState(null);
    const [favorited, setFavorited] = useState(false);
    const [weatherCurrent, setWeatherCurrent] = useState(null);
    const [weatherForecast, setWeatherForecast] = useState(null);
    const [weatherLocation, setWeatherLocation] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [places, setPlaces] = useState([]);
    const [userPlacesToTry, setUserPlacesToTry] = useState([]);

    // Loading states
    const [imagesLoading, setImagesLoading] = useState(true);
    const [, setFavoritesLoading] = useState(true);
    const [, setReviewsLoading] = useState(true);
    const [, setPlacesLoading] = useState(true);
    
    const structuredDataText = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "City",
        "name": citySelected?.name,
        "image": citySelected?.image_url_large,
        "description": `${citySelected?.name} is located in ${citySelected?.country_name} (${citySelected?.region}) with a population of around ${citySelected?.population}. Discover ${citySelected?.name} with Wanderlust App. Find out what to do, the best places to stay, and the top places to eat in ${citySelected?.name} all curated by real people and no ads.`,
        "url": `https://wanderlustapp.io/city/${citySelected?.slug}`,
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": citySelected?.latitude,
            "longitude": citySelected?.longitude
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": citySelected?.name,
            "addressRegion": citySelected?.region,
            "addressCountry": citySelected?.country_name
        },
        "containedInPlace": {
            "@type": "Country",
            "name": citySelected?.country_name
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://wanderlustapp.io/city/${citySelected?.slug}`
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": `https://wanderlustapp.io/city/${citySelected?.slug}`
        }
    });

    // UseEffects
    useEffect(() => {
        if (citySelected) {
            setCityId(citySelected?.id)
        }
    }, [citySelected]);
    
    useEffect(() => {
        if (citySelected) {
            baseRequest(`https://api.weatherapi.com/v1/forecast.json`, {
                query: {
                    "key": process.env.NEXT_PUBLIC_WEATHER_API,
                    "q": `${citySelected?.latitude},${citySelected?.longitude}`,
                    "days": 5
                }
            })
                .then(res => {
                    setWeatherCurrent(res.current)
                    setWeatherForecast(res.forecast)
                    setWeatherLocation(res.location)
                })
                .catch(err => {
                    // Show some error state or something
                })
        }
    }, [citySelected])

    useEffect(() => {
        async function fetchData() {
            const response = await request(`/placesToTry`, {
                method: 'GET'
            })
    
            setUserPlacesToTry(response.data)
        }

        if (user) {
            fetchData();
        }
    }, []); 

    useEffect(() => {
        trackStat({ type: 'tabViews', property: 'cityView' })
    }, [])

    useEffect(() => {
        trackClick('city-view')
    }, [])

    useEffect(() => {
        if (citySelected?.country) {
            request(`/holiday/country/${citySelected?.country_code}`)
                .then(res => {
                    setHolidays(getNotUnique(res.data));
                })
        }
    }, [citySelected, slug])

    // Fetch places by city
    useEffect(() => {
        if (user?.premium && cityId) {
            request(`/place/city/${cityId}`)
                .then(res => {
                    setPlaces(res.data || []);
                    setPlacesLoading(false);
                })
        }
    }, [cityId]);

    // Fetch locations for current city
    useEffect(() => {
        if (cityId) {
            request(`/locations/city/${cityId}`)
                .then(res => {
                    setLocations(res.data || []);
                    setImagesLoading(false);
                })
        }
    }, [cityId]);

    useEffect(() => {
        if (cityId) {
            request(`/reviews/${cityId}`)
                .then(res => {
                    setReviews(res.data || []);

                    // Calculate average
                    if (res?.data?.length === 0) {
                        setReviewsAverage(null)
                    } else if (res?.data?.length === 1) {
                        setReviewsAverage(res.data[0].rating);
                    } else {
                        const average = res.data?.reduce((a, b) => a.rating + b.rating, 0) / res.data?.length;
                        setReviewsAverage(average.toFixed(2));
                    }
                    
                    setReviewsLoading(false);
                })
        }
    }, [cityId]);

    useEffect(() => {
        if (cityId && user) {
            request(`/favorites/city/${cityId}`)
                .then(res => {
                    setFavorited(res.data?.favorited);
                    setFavoritesLoading(false);
                })
        }
    }, [cityId])

    // useEffect(() => {
    //     fetchAirbnbData();
    // }, [])

    // Functions
    function getNotUnique(a) {
        var seen = {};
        return a?.filter(function(item) {
            return seen.hasOwnProperty(item.urlid) ? false : (seen[item.urlid] = true);
        });
    }

    const toggleFavorite = () => {
        if (favorited) {
            removeFavorite(cityId, favorites, setFavorites)
            setFavorited(false)
        } else {
            setFavorited(true)
            addFavorite(cityId, favorites, setFavorites, citySelected)
        }
    }

    const resetReviewSubmit = () => {
        setShowWriteAReview(false);
        setReviewTitle("");
        setReviewDescription("");
        setReviewRating(null);
    }

    const submitAReview = () => {
        if (!reviewTitle) {
            setReviewError("A review title is required");
            return;
        }

        if (!reviewDescription) {
            setReviewError("A review description is required");
            return;
        }

        if (!reviewRating) {
            setReviewError("A review rating is required");
            return;
        }

        setReviewError(null);
        trackStat({ type: 'general', property: 'reviews' })

        // Send review submit request
        request(`/reviews/${cityId}`, {
            method: "POST",
            body: {
                body: reviewDescription,
                title: reviewTitle,
                rating: reviewRating,
                city: cityId
            }
        })
            .then(res => {
                if (res?.data) {
                    // Cleanup reviews
                    setReviews([
                        ...[{
                            title: reviewTitle,
                            body: reviewDescription,
                            rating: reviewRating,
                            city: citySelected,
                            user: {
                                name: user?.username,
                            }
                        }],
                        ...reviews,
                    ])
                    resetReviewSubmit();
                }
            })
            
        }
        
    const updateReviewRating = (val) => {
        setReviewRating(val)
    }

    const calculateCostOfLiving = (cost, max) => {
        const calculation = (cost / max) * 100;
        if (calculation > 100) {
            return 100;
        } else {
            return calculation
        }
    }

    const fetchAirbnbData = async () => {
        const url = `https://airbnb-listings.p.rapidapi.com/v2/avgPricesByLatLng?lat=${citySelected.latitude}&lng=${citySelected.longitude}&year=2023&month=5&range=500&bedrooms=1&maxGuestCapacity=2`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c5a7cd5a76msh6c1a923c75df3d3p11ef07jsn9b9ab712ca44',
		        'X-RapidAPI-Host': 'airbnb-listings.p.rapidapi.com'
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error('error:' + err));
    }
        

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <CustomHead 
                title={`${citySelected?.name} ${citySelected?.country_name} | Wanderlust App City Guide`}
                description={`Discover ${citySelected?.name} ${citySelected?.country_name} with Wanderlust App City Guide. Our comprehensive guide offers in-depth information on local culture, attractions, and experiences. From iconic landmarks to hidden gems, Wanderlust App has everything you need to plan your trip to ${citySelected?.name}. Browse our recommendations for the best hotels, restaurants, and activities, and create a custom itinerary based on your interests. Let Wanderlust App help you make the most of your visit to ${citySelected?.name}.`}
                image={citySelected?.image_url_medium}
                url={`https://www.wanderlustapp.co/city/${citySelected?.slug}`}
                alt={`${citySelected?.name} - City Guide`}
            />

            <Head>
                {/* Schema JSON ID  */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: structuredDataText }}
                    key="city-jsonld"
                />
            </Head>

            <div>
                {
                    breadcrumb && <BreadCrumb breadCrumbHome={breadcrumb} goToHome={() => router.push(`/${breadcrumb}`)} secondName={citySelected?.name} />
                }
                <div className={`relative flex items-center w-full mt-12 sm:mt-4 mb-8 h-28`}>
                    <div className={`sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between w-full`}> 
                        <TextH2 classes="z-10">{citySelected?.name}, {citySelected?.country_name}</TextH2>
                        <div className="flex items-center sm:ml-auto">
                            {
                                user && <FavoriteControl
                                    toggleFavorite={toggleFavorite}
                                    hideTooltip={true}
                                    currentImageFavoriteStatus={favorited}
                                    style={{ height: 20, width: 20, marginRight: 0, wrapperWidth: 45 }}
                                />
                            }
                            <TextH5 classes="ml-2 z-20">{citySelected?.favorite_count} favorites</TextH5>
                        </div>
                    </div>
                </div>
                
                <div className="grid-cols-2 gap-4 sm:grid">
                    <ScoreRating citySelected={citySelected} />
                    {
                        weatherCurrent && <WeatherCard current={weatherCurrent} forecast={weatherForecast} location={weatherLocation} />
                    }
                </div>
            </div>
            
            <div className="w-full my-12">
                <TextH3>Cost of Living</TextH3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center">
                            <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white" style={{ margin: 0 }}>for a Local</h5>
                        </div>
                        <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2 mt-6">
                            <div className={`h-2.5 rounded ${citySelected?.cost_for_local_in_usd < 1750 ? 'bg-green-500' : citySelected?.cost_for_local_in_usd < 2750 ? 'bg-yellow-300' : 'bg-red-500'}`} style={{ width: `${calculateCostOfLiving(citySelected?.cost_for_local_in_usd, 3750)}%` }}></div>
                        </div>
                        <h5 className="mt-6 mb-2 text-xl tracking-tight text-gray-900 dark:text-white">${citySelected?.cost_for_local_in_usd?.toFixed(0)}</h5>
                    </div>
                    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center">
                            <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white" style={{ margin: 0 }}>for an Expat</h5>
                        </div>
                        <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2 mt-6">
                            <div className={`h-2.5 rounded ${citySelected?.cost_for_expat_in_usd < 2000 ? 'bg-green-500' : citySelected?.cost_for_expat_in_usd < 3000 ? 'bg-yellow-300' : 'bg-red-500'}`} style={{ width: `${calculateCostOfLiving(citySelected?.cost_for_expat_in_usd, 4000)}%` }}></div>
                        </div>
                        <h5 className="mt-6 mb-2 text-xl tracking-tight text-gray-900 dark:text-white">${citySelected?.cost_for_expat_in_usd?.toFixed(0)}</h5>
                    </div>
                    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center">
                            <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white" style={{ margin: 0 }}>for a Nomad</h5>
                        </div>
                        <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2 mt-6">
                            <div className={`h-2.5 rounded ${citySelected?.cost_for_nomad_in_usd < 2500 ? 'bg-green-500' : citySelected?.cost_for_nomad_in_usd < 3500 ? 'bg-yellow-300' : 'bg-red-500'}`} style={{ width: `${calculateCostOfLiving(citySelected?.cost_for_family_in_usd, 4500)}%` }}></div>
                        </div>
                        <h5 className="mt-6 mb-2 text-xl tracking-tight text-gray-900 dark:text-white">${citySelected?.cost_for_nomad_in_usd?.toFixed(0)}</h5>
                    </div>
                    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center">
                            <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white" style={{ margin: 0 }}>for a Family</h5>
                        </div>
                        <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2 mt-6">
                            <div className={`h-2.5 rounded ${citySelected?.cost_for_family_in_usd < 3500 ? 'bg-green-500' : citySelected?.cost_for_family_in_usd < 5000 ? 'bg-yellow-300' : 'bg-red-500'}`} style={{ width: `${calculateCostOfLiving(citySelected?.cost_for_family_in_usd, 5000)}%` }}></div>
                        </div>
                        <h5 className="mt-6 mb-2 text-xl tracking-tight text-gray-900 dark:text-white">${citySelected?.cost_for_family_in_usd?.toFixed(0)}</h5>
                    </div>
                </div>
            </div>
            <div className="w-full my-12 relative h-full">
                <TextH3>Local Favorites</TextH3>
                {
                    user?.premium ?
                        citySelected?.longitude && <PlacesMap userPlacesToTry={userPlacesToTry} setUserPlacesToTry={setUserPlacesToTry} user={user} zoom={2.5} coordinates={[citySelected?.longitude, citySelected?.latitude]}  places={selectedFilter ? places.filter(place => { return place?.tags?.find(element => element === selectedFilter) }) : places} />
                        : <div className="w-full h-96 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Unlock this feature</h3>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">with a pro account</h3>
                                <Link href="/pro">
                                    <p className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">Get Pro</p>
                                </Link>
                            </div>
                        </div>
                }
                {/* filters  */}
                {
                    user?.premium && <div className="w-full justify-center flex flex-wrap z-0 mt-4">
                        <div className="flex items-center mr-4">
                            <input checked={!selectedFilter} onChange={() => setSelectedFilter(null)} type="radio" value="" className="cursor-pointer w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                        </div>
                        <div className="flex items-center mr-4">
                            <input checked={selectedFilter === 'point_of_interest'} onChange={() => setSelectedFilter('point_of_interest')} type="radio" value="" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Point of Interest</label>
                        </div>
                        <div className="flex items-center mr-4">
                            <input checked={selectedFilter === 'food'} onChange={() => setSelectedFilter('food')} type="radio" value="" className="cursor-pointer w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Food</label>
                        </div>
                        <div className="flex items-center mr-4">
                            <input checked={selectedFilter === 'cafe'} onChange={() => setSelectedFilter('cafe')} type="radio" value="" className="cursor-pointer w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cafe</label>
                        </div>
                        <div className="flex items-center mr-4">
                            <input checked={selectedFilter === 'bar'} onChange={() => setSelectedFilter('bar')} type="radio" value="" className="cursor-pointer w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bar</label>
                        </div>
                        <div className="flex items-center mr-4">
                            <input checked={selectedFilter === 'tourist_attraction'} onChange={() => setSelectedFilter('tourist_attraction')} type="radio" value="" className="cursor-pointer w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tourist Attraction</label>
                        </div>
                        <div className="flex items-center mr-4">
                            <input checked={selectedFilter === 'museum'} onChange={() => setSelectedFilter('museum')} type="radio" value="" className="cursor-pointer w-4 h-4 text-brown-600 bg-gray-100 border-gray-300 focus:ring-brown-500 dark:focus:ring-brown-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Museum</label>
                        </div>
                    </div>
                }
            </div>

            <div className="w-full my-12">
                <TextH3>Views</TextH3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-scroll" style={{ maxHeight: '480px' }}>
                    {
                        locations?.length === 0 ? <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            {
                                imagesLoading ? <svg role="status" className="inline w-10 h-10 ml-auto mr-auto text-gray-200 animate-spin dark:text-gray-600 fill-slate-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg> : <p className="text-md font-medium text-gray-500 dark:text-gray-400">None to see here, yet!</p>
                            }
                            </div> : locations?.map((location, index) => (
                                    <div key={`cityPage-locations-${location.name}-${index}`}>
                                        <Image src={location.image_url_small} className="h-full object-cover max-w-full rounded-lg" alt={`${location.city_name} ${location.country_name}}`} width={500} height={500} />
                                    </div>
                                ))
                            }
                </div>

                {
                    citySelected?.instagram_posts && citySelected?.instagram_posts.length > 0 && <InstagramPost links={citySelected?.instagram_posts} />
                }
            </div>

            <div className="w-full my-12">
                <TextH3>Blogs & Guides</TextH3>
                <div className={blogs?.length > 0 ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" : ""}>
                    {
                        blogs && blogs?.length > 0 ? blogs.map((blog) => <BlogCard key={`city-blogCard-${blog.title}`} post={blog} />) 
                            : <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                {/* Guides coming soon text  */}
                                <p className="text-md font-medium text-gray-500 dark:text-gray-400">Guides coming soon!</p>
                            </div>
                    }
                </div>
            </div>

            <div className="w-full my-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <TextH3 classes="mr-4">Reviews</TextH3>
                        <div className="flex items-center mb-2">
                            {
                                reviewsAverage && <div className="flex">
                                    <svg aria-hidden="true" className={`w-5 h-5 ${reviewsAverage >= 1 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className={`w-5 h-5 ${reviewsAverage >= 2 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className={`w-5 h-5 ${reviewsAverage >= 3 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className={`w-5 h-5 ${reviewsAverage >= 4 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" className={`w-5 h-5 ${reviewsAverage >= 5 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                </div>
                            }
                            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                            <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{reviews?.length} review{reviews?.length === 1 ? "" : "s"}</p>
                        </div>
                    </div>
                    {
                        user && <Button text="Write a review now!" onClick={() => setShowWriteAReview(true)} />
                    }
                </div>
                {
                    showWriteAReview && <div className="block w-full p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                <div className="flex">
                                    <svg aria-hidden="true" onClick={() => updateReviewRating(1)} className={`cursor-pointer w-5 h-5 ${reviewRating >= 1 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" onClick={() => updateReviewRating(2)} className={`cursor-pointer w-5 h-5 ${reviewRating >= 2 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" onClick={() => updateReviewRating(3)} className={`cursor-pointer w-5 h-5 ${reviewRating >= 3 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" onClick={() => updateReviewRating(4)} className={`cursor-pointer w-5 h-5 ${reviewRating >= 4 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg aria-hidden="true" onClick={() => updateReviewRating(5)} className={`cursor-pointer w-5 h-5 mr-4 ${reviewRating >= 5 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                </div>
                                <Input value={reviewTitle} placeholder="Title" onChange={e => setReviewTitle(e.target.value)} classes="w-full" />
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={resetReviewSubmit} className="w-5 h-5 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <TextArea label="Description" placeholder="Write a description of the location" value={reviewDescription} onChange={e => setReviewDescription(e.target.value)} />
                        {
                            reviewError && <TextP classes="my-4" styles={{ color: 'red' }}>{reviewError}</TextP>
                        }
                        <Button text="Submit" onClick={submitAReview} classes="mt-4" />
                    </div>
                }
                {
                    reviews?.length > 0 ?
                        <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            {
                                reviews.map((review) => (
                                    <article key={`reviews-${review?.id}`}>
                                        <div className="flex items-center mb-4 space-x-4">
                                            <Image height={30} width={30} className="w-10 h-10 rounded-full" src={review?.user?.profile_image} alt="" />
                                            <div className="space-y-1 font-medium dark:text-white">
                                                <p>{review?.user?.username} <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Joined on {moment(review?.user?.createdAt).format('MMMM Do YYYY')}</time></p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-1">
                                            <div className="flex">
                                                <svg aria-hidden="true" className={`w-5 h-5 ${review?.rating >= 1 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                <svg aria-hidden="true" className={`w-5 h-5 ${review?.rating >= 2 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                <svg aria-hidden="true" className={`w-5 h-5 ${review?.rating >= 3 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                <svg aria-hidden="true" className={`w-5 h-5 ${review?.rating >= 4 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                <svg aria-hidden="true" className={`w-5 h-5 ${review?.rating >= 5 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                            </div>
                                            <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">{review?.title}</h3>
                                        </div>
                                        <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed on <time dateTime={review?.createdAt}>{moment(review?.createdAt).format('MMMM Do YYYY')}</time></p></footer>
                                        <p className="mb-2 font-light text-gray-500 dark:text-gray-400">{review?.body}</p>
                                        {/* <a href="#" className="block mb-5 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Read more</a> */}
                                        {/* <aside>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
                                            <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                                                <a href="#" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Helpful</a>
                                                <a href="#" className="pl-4 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Report abuse</a>
                                            </div>
                                        </aside> */}
                                    </article>
                                ))
                            }
                        </div> :
                        <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-md font-medium text-gray-500 dark:text-gray-400">No reviews yet</p>
                        </div>
                }
            </div>

            <div className="w-full my-12">
                <TextH3>Airbnbs</TextH3>
                {/* Show general airbnb info like avg price, avg rating, etc for airbnbs in the area */}
                <div className="flex mb-4 flex-col w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-md font-medium text-gray-500 dark:text-gray-400">Coming soon</p>
                </div>

                <div className="flex flex-col items-center w-full h-auto bg-white border rounded-lg shadow-md md:flex-row dark:border-gray-700 dark:bg-gray-800">
                    <Image height={150} width={150} quality={80} className="static object-cover w-full rounded-t-lg h-56 sm:h-96 md:h-auto md:w-96 md:rounded-none md:rounded-l-lg" src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/photo-1591825729269-caeb344f6df2.jpeg" alt={`Airbnbs in ${citySelected?.name}`} />
                    <div className="flex flex-col justify-between w-full p-4 leading-normal">
                        <div className="flex">
                            <h5 className="mb-2 mr-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">COMING SOON</h5>
                            <span className="inline-flex items-center justify-center h-8 px-4 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-200">Premium</span>
                        </div>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">The most beautiful Airbnbs in the best part of every city across the world.</p>
                    </div>
                </div>
            </div>
            {
                !user?.premium && <ProBanner />
            }
            {
                holidays?.length > 0 && (
                    <div className="w-full my-12">
                        <TextH3 classes="mb-4">Holidays</TextH3>
                        <div className="block w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <Timeline data={holidays} />
                        </div>
                    </div>
                )
            }
            <div className="w-full my-8">
                <TextH3 classes="mb-4">Country Information</TextH3>
                <div className="flex flex-col w-full h-auto px-10 pl-0 bg-white border rounded-lg shadow-md md:flex-row dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-col w-full p-8 ml-8 leading-normal">
                        <TextH2>{citySelected?.country_name}</TextH2>
                        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Region: {citySelected?.region}</p>
                        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Capital: {citySelected?.country?.capital}</p>
                        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Currency: {citySelected?.country?.currency}</p>
                    </div>
                    <Image height={400} width={600} className="static object-cover w-full my-8 rounded-md h-96 md:h-auto md:w-96" src={citySelected?.country?.image_url_medium || citySelected?.image_url_medium} alt={`${citySelected?.country_name}`} />

                </div>
            </div>
        </section>
    )
}