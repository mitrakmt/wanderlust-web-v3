import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';

// Utils
import request from '../utils/request';

// Hooks
import { useAuth } from '../hooks/useAuth';

// Components
import CustomHead from '../shared_components/CustomHead';
import PlacesTab from '../components/MapsPage/Places';
import PlacesToTryTab from '../components/MapsPage/PlacesToTry';
import CitiesTab from '../components/MapsPage/Cities';
import CountriesTab from '../components/MapsPage/Countries';

export default function Maps() {
    // Hooks
    const { user, userLoading } = useAuth();
    
    // State
    const [currentTab, setCurrentTab] = useState('favorites')
    const [places, setPlaces] = useState([]);
    const [placesToTry, setPlacesToTry] = useState([]);

    // UseEffects
    useEffect(() => {
        if (!user?.premium) {
            router.push('/pro')
        }
    }, [user])

    useEffect(() => {
        request(`/place`)
            .then(res => {
                setPlaces(res.data || []);
            })
    }, [])

    useEffect(() => {
        request(`/placesToTry`)
            .then(res => {
                setPlacesToTry(res.data || []);
            })
    }, [])

    // Functions
    const changeTab = (tab) => {
        setCurrentTab(tab)
    }

    if (userLoading) return null;

    return (
        <section className="relative pt-4 h-full max-h-screen max-w-full min-h-screen w-full overflow-hidden">
            <CustomHead
                title="Map Your Adventures | Save and Explore Your Favorite Places | Wanderlust App Maps"
                description="Keep track of your travel adventures with Wanderlust App Maps. Save your favorite places around the world, track the countries you've visited, and plan your future travels with ease. Our interactive maps allow you to explore the world and discover new places to add to your travel bucket list. Map your adventures with Wanderlust App and never forget a moment of your journey."
                url="https://www.wanderlustapp.io/maps"
                image="/favoritePlacesDark1.png"
                alt="Maps - Wanderlust App"
            />
            
            <div className="flex flex-col lg:flex-row">
                <ul className="px-2 sm:px-4 ml-0 sm:ml-16 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mr-1 sm:mr-2">
                        <a onClick={() => changeTab('favorites')} className={`text-xs sm:text-sm cursor-pointer inline-block p-4 ${currentTab === 'favorites' ? "text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>Favorites</a>
                    </li>
                    <li className="mr-1 sm:mr-2">
                        <a onClick={() => changeTab('placesToTry')} className={`text-xs sm:text-sm cursor-pointer inline-block p-4 ${currentTab === 'placesToTry' ? "text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>Places to Try</a>
                    </li>
                    <li className="mr-1 sm:mr-2">
                        <a onClick={() => changeTab('bucketList')} className={`text-xs sm:text-sm cursor-pointer inline-block p-4 ${currentTab === 'bucketList' ? "text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>Bucket List</a>
                    </li>
                    <li className="mr-1 sm:mr-2">
                        <a onClick={() => changeTab('passport')} className={`text-xs sm:text-sm cursor-pointer inline-block p-4 ${currentTab === 'passport' ? "text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>Passport</a>
                    </li>
                </ul>

                <div className="ml-auto">
                    {
                        currentTab === 'favorites' && (
                            <div className="hidden sm:flex items-center justify-center px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400">
                                <span className="mr-1 sm:mr-2">Favorites - Add your favorite places from around the world!</span>
                            </div>
                        )
                    }
                    {
                        currentTab === 'placesToTry' && (
                            <div className="hidden sm:flex items-center justify-center px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400">
                                <span className="mr-1 sm:mr-2">Places to Try - Add places you want to try in the future.</span>
                            </div>
                        )
                    }
                    {
                        currentTab === 'bucketList' && (
                            <div className="hidden sm:flex items-center justify-center px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400">
                                <span className="mr-1 sm:mr-2">Travel Bucket List - Add cities you want to visit around the world!</span>
                            </div>
                        )
                    }
                    {
                        currentTab === 'passport' && (
                            <div className="hidden sm:flex items-center justify-center px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400">
                                <span className="mr-1 sm:mr-2">Digital Passport - Keep track of the countries you have been to.</span>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="relative">
                {
                    currentTab === 'favorites' && (
                        <PlacesTab places={places} setPlaces={setPlaces} GooglePlacesAutocomplete={GooglePlacesAutocomplete} geocodeByPlaceId={geocodeByPlaceId} />
                    )
                }
                {
                    currentTab === 'placesToTry' && (
                        <PlacesToTryTab places={placesToTry} setPlaces={setPlacesToTry} updateFavoritesList={setPlaces} currentFavorites={places} GooglePlacesAutocomplete={GooglePlacesAutocomplete} geocodeByPlaceId={geocodeByPlaceId} />
                    )
                }
                {
                    currentTab === 'bucketList' && (
                        <CitiesTab />
                    )
                }
                {
                    currentTab === 'passport' && (
                        <CountriesTab />
                    )
                }
            </div>
        </section>
    )
}

