import { useState } from 'react';

// Utils
import request from '../../../utils/request';

// Components
import Map from './Map';
import CityGoogleSidebar from '../../../shared_components/CityGoogleSidebar';

export default function PlacesToTryTab({ places, setPlaces, geocodeByPlaceId, GooglePlacesAutocomplete }) {
    // State
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    // Functions
    const removePlace = (placeId) => {
        setPlaces(places?.filter((place) => place.id !== placeId))

        request(`/placesToTry/${placeId}`, {
            method: 'DELETE'
        })
    }

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    return (
        <div className="relative">
            <Map isPublicMap={false} defaultZoom={2.5} coordinates={[17.1317479, 41.6531344]} places={selectedFilter ? places.filter(place => { return place.tags.find(element => element === selectedFilter) }) : places} removePlace={removePlace} />
            
            {/* SIDEBAR  */}
            <div className="text-center flex flex-col m-5 fixed top-32 sm:top-16 right-0 z-50">
                <button onClick={toggleSidebar} className="cursor-pointer text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm p-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                {/* NAVIGATE ON MAP  */}
                {/* <div className="flex items-center relative w-full">
                    <div className={`absolute transition-all ${searchActive ? "z-10 w-80 right-20": "w-0 right-10"}`}>
                        <input type="text" className={`${searchActive ? "p-2.5" : "px-0 py-2.5"} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Navigate on the map" />
                    </div>
                    <button onClick={toggleSearchActive} className="z-20 cursor-pointer text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm p-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            {
                                searchActive ? 
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            }
                        </svg>
                    </button>
                </div> */}
            </div>

            <CityGoogleSidebar GooglePlacesAutocomplete={GooglePlacesAutocomplete} geocodeByPlaceId={geocodeByPlaceId} showSidebar={showSidebar} setShowSidebar={setShowSidebar} setPlaces={setPlaces} places={places} />

            <div className="fixed bottom-8 md:bottom-4 w-auto right-0 left-0 justify-center flex flex-wrap mt-4 ml-0 sm:ml-16">
                <div className="flex items-center mr-4 mb-2">
                    <input checked={!selectedFilter} onChange={() => setSelectedFilter(null)} type="radio" value="" className="cursor-pointer w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                </div>
                <div className="flex items-center mr-4 mb-2">
                    <input checked={selectedFilter === 'point_of_interest'} onChange={() => setSelectedFilter('point_of_interest')} type="radio" value="" className="cursor-pointer w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Point of Interest</label>
                </div>
                <div className="flex items-center mr-4 mb-2">
                    <input checked={selectedFilter === 'food'} onChange={() => setSelectedFilter('food')} type="radio" value="" className="cursor-pointer w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Food</label>
                </div>
                <div className="flex items-center mr-4 mb-2">
                    <input checked={selectedFilter === 'cafe'} onChange={() => setSelectedFilter('cafe')} type="radio" value="" className="cursor-pointer w-4 h-4 text-teal-500 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cafe</label>
                </div>
                <div className="flex items-center mr-4 mb-2">
                    <input checked={selectedFilter === 'bar'} onChange={() => setSelectedFilter('bar')} type="radio" value="" className="cursor-pointer w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bar</label>
                </div>
                <div className="flex items-center mr-4 mb-2">
                    <input checked={selectedFilter === 'tourist_attraction'} onChange={() => setSelectedFilter('tourist_attraction')} type="radio" value="" className="cursor-pointer w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tourist Attraction</label>
                </div>
                <div className="flex items-center mr-4 mb-2">
                    <input checked={selectedFilter === 'museum'} onChange={() => setSelectedFilter('museum')} type="radio" value="" className="cursor-pointer w-4 h-4 text-brown-600 bg-gray-100 border-gray-300 focus:ring-brown-500 dark:focus:ring-brown-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Museum</label>
                </div>
            </div>
        </div>
    )
}

