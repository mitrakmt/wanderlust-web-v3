import React, { useContext } from 'react';
import request from '../../../../src/utils/request';

// Hooks
import { useRouter } from 'next/router';

// Context
import { themeContext } from '../../../../src/context/ThemeProvider';

export default function PlaceCard({ id, tags, google_id, name, closePlaceOverlay, user, selectedMarker, userPlaces, setUserPlaces }) {
    // Context
    const [theme] = useContext(themeContext);

    // Hooks
    const router = useRouter();

    // Functions
    const viewPlace = () => {
        window.open(`https://www.google.com/maps/place/?q=place_id:${google_id}`, '_blank');
    }

    const addToMyPlaces = () => {
        if (!user.premium) {
            router.push('/premium');
            return;
        }

        const newPlace = {
            google_id,
            name,
            tags,
            note: selectedMarker.note,
            city: selectedMarker.city.id,
            cityName: selectedMarker.city.name,
            countryName: selectedMarker.city.country_name,
            latitude: selectedMarker.latitude,
            longitude: selectedMarker.longitude,
            address: selectedMarker.address
        }

        setUserPlaces([...userPlaces, ...[newPlace]]);

        request(`/place`, {
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
    
    return (
        <div className="w-full sm:w-80" style={{ zIndex: 90 }}>
            <div className="w-full z-50 p-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full flex justify-end">
                    <button
                        className="flex items-center justify-center transition-all h-8"
                        onClick={closePlaceOverlay}
                    >
                        {
                            theme === 'dark' ? <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className=""
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg> : <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentcolor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className=""
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                        }
                    </button>
                </div>
                <div className="flex flex-col items-center pb-4">
                    <h5 className="mb-1 text-lg text-center font-medium text-gray-900 dark:text-white">{`${name}`}</h5>
                    {/* <div className="flex flex-wrap items-center justify-center">
                        {
                            tags.map((tag) => (
                                <span key={`placeCard-tags-${id}-${tag}`} className={`bg-blue-100 mr-1 mb-1 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300`}>{tag}</span>
                            ))
                        }
                    </div> */}
                    <div className="flex">
                        <div className="flex mt-4 justify-center w-full">
                            <a onClick={viewPlace} className="cursor-pointer inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View</a>
                            {
                            user?.premium ? userPlaces.find(item => item.google_id === google_id) ? 
                                    <button disabled={true} className="inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg dark:bg-gray-600">Added</button>
                                    : <button onClick={addToMyPlaces} className="cursor-pointer inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                                : null
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}