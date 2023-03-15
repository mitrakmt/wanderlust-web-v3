import { useState, useContext, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import request from '../../../utils/request';

// Context
import { themeContext } from '../../../context/ThemeProvider';

// Mapbox token array
const mapBoxArray = [
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN1,
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN2,
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN3,
    process.env.NEXT_PUBLIC_MAPBOX_TOKEN4
]

const getRandomNumber = () => {
    return Math. floor(Math. random() * (3 - 0 + 1)) + 0;
}

export default function PlacesMap({ coordinates, userPlacesToTry, setUserPlacesToTry, places, user }) {
    // State 
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [randomNumberSelected] = useState(getRandomNumber());
    const [isPlaceInUserPlaces, setIsPlaceInUserPlaces] = useState(false);

    // Context
    const [theme] = useContext(themeContext);

    // UseEffect
    useEffect(() => {
        // Check to see if selectedMarker.id is in userPlaces
        if (selectedMarker) {
            const place = userPlacesToTry?.find(place => place.google_id === selectedMarker.google_id);
            if (place) {
                setIsPlaceInUserPlaces(true);
            } else {
                setIsPlaceInUserPlaces(false);
            }
        }
    }, [selectedMarker])

    // Functions
    const closePlaceOverlay = () => {
        setSelectedMarker(null);
    }

    const viewPlace = () => {
        window.open(`https://www.google.com/maps/place/?q=place_id:${selectedMarker.google_id}`, '_blank');
    }

    const addToMyTravelToList = () => {
        if (!user.premium) {
            router.push('/premium');
            return;
        }

        setIsPlaceInUserPlaces(true)

        const newPlace = {
            google_id: selectedMarker.google_id,
            name: selectedMarker.name,
            tags: selectedMarker.tags,
            note: selectedMarker.note,
            city: selectedMarker.city.id,
            cityName: selectedMarker.city.name,
            countryName: selectedMarker.city.country_name,
            latitude: selectedMarker.latitude,
            longitude: selectedMarker.longitude,
            address: selectedMarker.address
        }

        setUserPlacesToTry([...userPlacesToTry, ...[newPlace]]);

        request(`/placesToTry`, {
            method: 'POST',
            body: JSON.stringify(newPlace)
        })
            .then(res => {
                if (res.error) {
                    // Handl error
                    
                } else {
                    // Refetch places
                } 
            })
    }

    const removeFromMyTravelToList = () => {
        const newPlaces = userPlacesToTry.filter(place => place.google_id !== selectedMarker.google_id);
        setUserPlacesToTry(newPlaces);
        setIsPlaceInUserPlaces(false);

        request(`/placesToTry/${selectedMarker.id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.error) {
                    // Handl error
                } else {
                    // Refetch places
                }
            })
    }

    // TODO: Use this map improvement
    // https://visgl.github.io/react-map-gl/docs/get-started/tips-and-tricks

    return (
        <Map
            initialViewState={{
                latitude: coordinates[1],
                longitude: coordinates[0],
                zoom: 2
            }}
            minZoom={2.0}
            attributionControl={false}
            renderWorldCopies={true}
            style={{
                width: '100%',
                height: '700px',
                borderBottomRadius: '15px',
            }}
            mapboxAccessToken={mapBoxArray[randomNumberSelected]}
            mapStyle={theme === 'light' ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/dark-v11'}
        >
            {places?.map((place) => (
                <Marker
                    longitude={place.longitude}
                    latitude={place.latitude}
                    offsetLeft={-20}
                    offsetTop={-10}
                    color={place?.google_id === selectedMarker?.google_id ? "#e40226" : null}
                    style={{ cursor: 'pointer' }}
                    anchor="bottom"
                    key={`places_map-${place.google_id}`}
                    onClick={() => setSelectedMarker(place)}
                />
            ))} 
            {/* <!-- drawer component --> */}
            <div style={{ zIndex: 1000 }} className={`absolute top-0 ${selectedMarker ? "right-0" : "-right-80"} w-80 h-screen p-4 transition-all bg-white dark:bg-gray-800`} tabIndex="-1">
                <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Place</h5>
                <button type="button" onClick={closePlaceOverlay} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <div className="w-full">
                    <div className="flex flex-col items-center pb-4">
                        <h5 className="mb-1 text-lg text-center font-medium text-gray-900 dark:text-white">{`${selectedMarker?.name}`}</h5>
                        <p className="text-sm text-center text-gray-700 dark:text-gray-200 mt-4">Notes:</p>
                        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">{`${selectedMarker?.note || "None"}`}</p>
                        <p className="text-sm text-center text-gray-700 dark:text-gray-200 mt-4">Address:</p>
                        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">{`${selectedMarker?.address || "None"}`}</p>
                        <div className="flex flex-wrap items-center justify-center my-4">
                            {
                                selectedMarker?.tags.map((tag) => (
                                    <span key={`placeCard-tags-${selectedMarker.id}-${tag}`} className={`bg-primary-100 mr-1 mb-1 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300`}>{tag}</span>
                                ))
                            }
                        </div>
                        <div className="flex mt-4 justify-center w-full">
                            {
                                isPlaceInUserPlaces ? (
                                    <a onClick={removeFromMyTravelToList} className="cursor-pointer inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Remove from my "Want to Try" List</a>
                                ) : (
                                        <a onClick={addToMyTravelToList} className="cursor-pointer inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add to my "Want to Try" List</a>
                                    )
                            }
                            <a onClick={viewPlace} className="cursor-pointer inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">View on Google</a>
                        </div>
                    </div>
                    
                    <div className="flex justify-center w-full pb-4 space-x-4 md:px-4 mt-4">
                        <button type="button" onClick={closePlaceOverlay} className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            <svg aria-hidden="true" className="w-5 h-5 -ml-1 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            Close
                        </button>
                    </div>
                </div>
             </div>
        </Map>
     
    )
}