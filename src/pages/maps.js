import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';

// Utils
import request from '../utils/request';
import trackStat from '../utils/trackStat';

// Hooks
import { useAuth } from '../hooks/useAuth';

// Components
import PlacesTab from '../components/MapsPage/Places';
import CitiesTab from '../components/MapsPage/Cities';
import CountriesTab from '../components/MapsPage/Countries';

export default function Maps() {
    // Hooks
    const { user, userLoading } = useAuth();
    
    // State
    const [currentTab, setCurrentTab] = useState('places')
    const [places, setPlaces] = useState([]);

    // UseEffects
    useEffect(() => {
        if (!user?.premium) {
            router.push('/pro')
        }
    }, [user])

    useEffect(() => {
        trackStat({ type: 'maps', property: 'map' })
    }, [])

    useEffect(() => {
        request(`/place`)
            .then(res => {
                setPlaces(res.data || []);
            })
    }, [])

    // Functions
    const changeTab = (tab) => {
        setCurrentTab(tab)
    }

    if (userLoading) return null;

    return (
        <section className="relative pt-4 h-full max-h-screen max-w-full min-h-screen w-full overflow-hidden">
            <ul className="px-4 ml-0 sm:ml-16 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="mr-2">
                    <a onClick={() => changeTab('places')} className={`cursor-pointer inline-block p-4 ${currentTab === 'places' ? "text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>Places</a>
                </li>
                <li className="mr-2">
                    <a onClick={() => changeTab('cities')} className={`cursor-pointer inline-block p-4 ${currentTab === 'cities' ? "text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>Cities</a>
                </li>
                <li className="mr-2">
                    <a onClick={() => changeTab('countries')} className={`cursor-pointer inline-block p-4 ${currentTab === 'countries' ? "text-primary-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"}`}>Countries</a>
                </li>
            </ul>
            <div className="relative">
                {
                    currentTab === 'places' && (
                        <PlacesTab places={places} setPlaces={setPlaces} GooglePlacesAutocomplete={GooglePlacesAutocomplete} geocodeByPlaceId={geocodeByPlaceId} />
                    )
                }
                {
                    currentTab === 'cities' && (
                        <CitiesTab />
                    )
                }
                {
                    currentTab === 'countries' && (
                        <CountriesTab />
                    )
                }
            </div>
        </section>
    )
}

