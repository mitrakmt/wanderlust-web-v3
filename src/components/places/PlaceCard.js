import React, { useContext } from 'react';

// Context
import { themeContext } from '../../context/ThemeProvider';

export default function PlaceCard({ isPublicMap, id, tags, google_id, name, removePlace, closePlaceOverlay }) {
    // Context
    const [theme] = useContext(themeContext);

    // Functions
    const viewPlace = () => {
        window.open(`https://www.google.com/maps/place/?q=place_id:${google_id}`, '_blank');
    }

    return (
        <div className="w-80" style={{ zIndex: 109990 }}>
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
                    <div className="flex flex-wrap items-center justify-center">
                        {
                            tags.map((tag) => (
                                <span key={`placeCard-tags-${id}-${tag}`} className={`bg-primary-100 mr-1 mb-1 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300`}>{tag}</span>
                            ))
                        }
                    </div>
                    <div className="flex mt-4 justify-center w-full">
                        <a onClick={viewPlace} className="cursor-pointer inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">View</a>
                        {
                            !isPublicMap && (
                                <a onClick={() => { removePlace(id); closePlaceOverlay(); }} className="cursor-pointer inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Remove</a>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}