import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';

// Utils
import request from '../utils/request';
import trackClick from "../utils/trackClick";

// Hooks
import { useAuth } from '../hooks/useAuth';

// Components
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
        trackClick('map-view')
    }, [])

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
            <div className="flex flex-col lg:flex-row">
                <ul className="px-4 ml-0 sm:ml-16 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mr-2">
                        <a onClick={() => changeTab('favorites')} className={`cursor-pointer inline-block p-4 ${currentTab === 'favorites' ? "text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>Favorites</a>
                    </li>
                    <li className="mr-2">
                        <a onClick={() => changeTab('placesToTry')} className={`cursor-pointer inline-block p-4 ${currentTab === 'placesToTry' ? "text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>Places to Try</a>
                    </li>
                    <li className="mr-2">
                        <a onClick={() => changeTab('bucketList')} className={`cursor-pointer inline-block p-4 ${currentTab === 'bucketList' ? "text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>Bucket List</a>
                    </li>
                    <li className="mr-2">
                        <a onClick={() => changeTab('passport')} className={`cursor-pointer inline-block p-4 ${currentTab === 'passport' ? "text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>Passport</a>
                    </li>
                </ul>

                <div className="ml-auto">
                    {
                        currentTab === 'favorites' && (
                            <div className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400">
                                <span className="mr-2">Favorites - Add your favorite places from around the world!</span>
                            </div>
                        )
                    }
                    {
                        currentTab === 'placesToTry' && (
                            <div className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400">
                                <span className="mr-2">Places to Try - Add places you want to try in the future.</span>
                            </div>
                        )
                    }
                    {
                        currentTab === 'bucketList' && (
                            <div className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400">
                                <span className="mr-2">Travel Bucket List - Add cities you want to visit around the world!</span>
                            </div>
                        )
                    }
                    {
                        currentTab === 'passport' && (
                            <div className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-400">
                                <span className="mr-2">Digital Passport - Keep track of the countries you have been to.</span>
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
                        <PlacesToTryTab places={placesToTry} setPlaces={setPlacesToTry} GooglePlacesAutocomplete={GooglePlacesAutocomplete} geocodeByPlaceId={geocodeByPlaceId} />
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

