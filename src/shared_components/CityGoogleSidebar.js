import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import request from '../utils/request';

export default function CityGoogleSidebar({ placesToTry = false, showSidebar, setShowSidebar, geocodeByPlaceId, GooglePlacesAutocomplete, setPlaces, places }) {
    // STATE
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [, setAddPlaceLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [newPlaceNotes, setNewPlaceNotes] = useState('');
    const [searchCitiesText, setSearchCitiesText] = useState('');
    const [cities, setCities] = useState([]);
    const [citiesSearchDropdownOpen, setCitiesSearchDropdownOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [citySearching, setCitySearching] = useState(false);

    // FUNCTIONS
    const addPlace = async () => {
        setAddPlaceLoading(true);
        const geo = await geocodeByPlaceId(selectedPlace.value.place_id, {
            language: 'en'
        })

        let countryName;
        let cityName;
        
        for (let i = 0; i < geo[0].address_components.length; i++) {
            // find the country name
            if (geo[0].address_components[i].types.find(element => element === 'country')) {
                // set country name
                countryName = geo[0].address_components[i].long_name;
            }
            // set city name
            if (geo[0].address_components[i].types.find(element => element === 'locality')) {
                // set city name
                cityName = geo[0].address_components[i].long_name;
            }
        }

        request(`/place`, {
            method: 'POST',
            body: JSON.stringify({
                google_id: selectedPlace.value.place_id,
                name: selectedPlace.label,
                tags: selectedPlace.value.types,
                note: newPlaceNotes,
                city: selectedCity?.id || null,
                cityName,
                countryName,
                latitude: geo[0].geometry.location.lat(),
                longitude: geo[0].geometry.location.lng(),
                address: geo[0]?.formatted_address
            })
        })
            .then(res => {
                if (res.error) {
                    setErrorMessage(res.error);
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3000)
                } else {
                    setPlaces([...places, ...[res.data]]);
                    setSuccessMessage('Place added successfully');
                    setSelectedPlace('');
                    setNewPlaceNotes('')
                    setSelectedCity(null);
                    setSearchCitiesText('');
                    setCities([]);
                    setCitiesSearchDropdownOpen(false);
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000)
                } 
                setAddPlaceLoading(false);
            })
    }

    const addPlaceToTry = async () => {
        setAddPlaceLoading(true);
        const geo = await geocodeByPlaceId(selectedPlace.value.place_id, {
            language: 'en'
        })

        let countryName;
        let cityName;
        
        for (let i = 0; i < geo[0].address_components.length; i++) {
            // find the country name
            if (geo[0].address_components[i].types.find(element => element === 'country')) {
                // set country name
                countryName = geo[0].address_components[i].long_name;
            }
            // set city name
            if (geo[0].address_components[i].types.find(element => element === 'locality')) {
                // set city name
                cityName = geo[0].address_components[i].long_name;
            }
        }

        request(`/placesToTry`, {
            method: 'POST',
            body: JSON.stringify({
                google_id: selectedPlace.value.place_id,
                name: selectedPlace.label,
                tags: selectedPlace.value.types,
                note: newPlaceNotes,
                city: selectedCity?.id || null,
                cityName,
                countryName,
                latitude: geo[0].geometry.location.lat(),
                longitude: geo[0].geometry.location.lng(),
                address: geo[0]?.formatted_address
            })
        })
            .then(res => {
                if (res.error) {
                    setErrorMessage(res.error);
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 3000)
                } else {
                    setPlaces([...places, ...[res.data]]);
                    setSuccessMessage('Place added successfully');
                    setSelectedPlace('');
                    setNewPlaceNotes('')
                    setSelectedCity(null);
                    setSearchCitiesText('');
                    setCities([]);
                    setCitiesSearchDropdownOpen(false);
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000)
                } 
                setAddPlaceLoading(false);
            })
    }

    const debouncedCitySearch = useDebouncedCallback(
        (text) => {
            if (text.length < 3) {
                return;
            }

            request(`/cities/search?name=${text}`)
                .then(res => {
                    setCities(res.data || []);
                    setCitySearching(false);
                })
        },
        300
    );

    const searchCities = (text) => {
        if (text.length === 0) {
            setSearchCitiesText(text);
            debouncedCitySearch(text)
            setCitySearching(false);
            setCities([]);
            setCitiesSearchDropdownOpen(false);
            return;
        }

        setCitySearching(true);
        setCitiesSearchDropdownOpen(true)
        setSearchCitiesText(text);
        debouncedCitySearch(text)
    }

    const clearAddPlaceInfo = () => {
        setSelectedPlace(null);
        setNewPlaceNotes('');
        setSelectedCity(null);
        setSearchCitiesText('');
        setCities([]);
        setCitiesSearchDropdownOpen(false);
        setShowSidebar(false);
    }

    return (
        <div className={`fixed z-50 top-0 ${showSidebar ? "right-0" : "-right-96"} w-80 h-screen p-4 transition-all bg-white dark:bg-gray-800`} tabIndex="-1">
            <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">New Place</h5>
            <button type="button" onClick={clearAddPlaceInfo} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close menu</span>
            </button>
            <div className="w-full">
                <div className="pointer-events-auto">
                    <GooglePlacesAutocomplete
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                        minLengthAutocomplete={3}
                        apiOptions={{
                            language: 'en'
                        }}
                        selectProps={{
                            selectedPlace,
                            onChange: setSelectedPlace,
                        }}
                    />
                </div>
                {
                    selectedPlace && (
                        <div className="relative">
                            {
                                citySearching && (
                                    <div className="absolute z-10 top-16 left-0 right-0 bg-white rounded-lg shadow-lg">
                                        <div className="p-2.5">
                                            <div className="flex items-center">
                                                <div className="w-4 h-4 mr-2 bg-gray-300 rounded-full animate-pulse"></div>
                                                <div className="w-4 h-4 mr-2 bg-gray-300 rounded-full animate-pulse"></div>
                                                <div className="w-4 h-4 mr-2 bg-gray-300 rounded-full animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            
                            <input onChange={(e) => searchCities(e.target.value)} value={searchCitiesText} className="relative z-1 mt-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Search for a city..." />
                            {
                                cities.length > 0 && citiesSearchDropdownOpen && (
                                    <div className="absolute z-10 top-16 left-0 right-0 bg-white rounded-lg shadow-lg">
                                        {
                                            cities.map((city) => {
                                                return (
                                                    <div key={`places-citySearch-${city.id}`} className="p-2.5 cursor-pointer hover:bg-gray-100" onClick={() => {
                                                        setSelectedCity(city)
                                                        setCitiesSearchDropdownOpen(false);
                                                        setSearchCitiesText(`${city.name}, ${city.country_name}`)
                                                    }}>{city.name}, {city.country_name}</div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                {
                    selectedPlace && (
                        <textarea onChange={(e) => setNewPlaceNotes(e.target.value)} value={newPlaceNotes} rows="2" className="relative z-1 mt-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Write your notes here..."></textarea>
                    )
                }
                {
                    successMessage && (
                        <div className="mt-2 relative text-green-500">{successMessage}</div>
                    )
                }
                {
                    errorMessage && (
                        <div className="mt-2 relative text-red-500">{errorMessage}</div>
                    )
                }
                
                <div className="flex justify-center w-full pb-4 space-x-4 md:px-4 mt-4"> 
                    {
                        placesToTry ? <button type="submit" onClick={addPlaceToTry} className="text-white w-full justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Add place
                        </button> : <button type="submit" onClick={addPlace} className="text-white w-full justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Add place
                        </button>
                    }
                    <button type="button" onClick={clearAddPlaceInfo} className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        <svg aria-hidden="true" className="w-5 h-5 -ml-1 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}