import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { useDebouncedCallback } from 'use-debounce';

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

// Utils
import request from '../utils/request';
import trackStat from '../utils/trackStat';

// New Components
import TextH2 from '../components/Text/TextH2';
import Map from '../components/places/Map';

export default function Places() {
    // Hooks
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.premium) {
            router.push('/pro')
        }
    }, [user])

    // State
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [places, setPlaces] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [addPlaceLoading, setAddPlaceLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [newPlaceNotes, setNewPlaceNotes] = useState('');
    const [searchCitiesText, setSearchCitiesText] = useState('');
    const [cities, setCities] = useState([]);
    const [citiesSearchDropdownOpen, setCitiesSearchDropdownOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [citySearching, setCitySearching] = useState(false);

    // UseEffects
    useEffect(() => {
        trackStat({ type: 'tabViews', property: 'places' })
    }, [])

    useEffect(() => {
        request(`/place`)
            .then(res => {
                setPlaces(res.data || []);
            })
    }, [])

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
                city: selectedCity.id,
                cityName,
                countryName,
                latitude: geo[0].geometry.location.lat(),
                longitude: geo[0].geometry.location.lng(),
                address: geo[0]?.formatted_address
            })
        })
            .then(res => {
                if (res.error) {
                    setErrorMessage('Something went wrong');
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

    const removePlace = (placeId) => {
        setPlaces(places?.filter((place) => place.id !== placeId))

        request(`/place/${placeId}`, {
            method: 'DELETE'
        })
    }

    const searchCities = (text) => {
        if (text.length === 0) {
            setCities([]);
            setCitiesSearchDropdownOpen(false);
            return;
        }

        setCitySearching(true);
        setCitiesSearchDropdownOpen(true)
        setSearchCitiesText(text);
        debouncedCitySearch(text)
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

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <div className="w-auto relative z-50 px-2">
                <div className="pointer-events-none">
                    <TextH2 styles={{ position: 'relative', marginBottom: 0, fontWeight: 800 }}>Places</TextH2>
                    <p className="mt-0 relative font-bold text-sm md:text-md text-black dark:text-white text-wrap mb-2">Add your favorite places to keep track of amazing restaurants and sights in each city.</p>
                </div>
                <div className="pointer-events-auto">
                    <GooglePlacesAutocomplete
                        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                        minLengthAutocomplete={3}
                        apiOptions={{
                            language: 'en'
                        }}
                        selectProps={{
                            selectedPlace,
                            onChange: setSelectedPlace,
                        }}
                        style="w-auto"
                    />
                </div>
                {
                    selectedPlace && (
                        <div className="relative">
                            {/* city searching loading indicator  */}
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
                            
                            <input onChange={(e) => searchCities(e.target.value)} value={searchCitiesText} className="relative z-1 mt-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for a city..." />
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
                        <textarea onChange={(e) => setNewPlaceNotes(e.target.value)} value={newPlaceNotes} rows="2" className="relative z-1 mt-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your notes here..."></textarea>
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
                {
                    selectedPlace && (
                        <button onClick={addPlace} disabled={addPlaceLoading} className="mt-2 cursor-pointer relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                    )
                }
                {/* filters  */}
                <div className="fixed bottom-8 md:bottom-4 right-0 left-0 justify-center flex flex-wrap z-50 mt-4 ml-16">
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
                        <input checked={selectedFilter === 'tourist_attraction'} onChange={() => setSelectedFilter('tourist_attraction')} type="radio" value="" className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tourist Attraction</label>
                    </div>
                    <div className="flex items-center mr-4 mb-2">
                        <input checked={selectedFilter === 'museum'} onChange={() => setSelectedFilter('museum')} type="radio" value="" className="cursor-pointer w-4 h-4 text-brown-600 bg-gray-100 border-gray-300 focus:ring-brown-500 dark:focus:ring-brown-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Museum</label>
                    </div>
                </div>
            </div>
            <Map isPublicMap={false} defaultZoom={2.5} coordinates={[115.1317479, -8.6531344]} places={selectedFilter ? places.filter(place => { return place.tags.find(element => element === selectedFilter) }) : places} removePlace={removePlace} />
        </section>
    )
}