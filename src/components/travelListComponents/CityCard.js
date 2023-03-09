import React, { useContext } from 'react';
import Image from 'next/image'

// Context
import { themeContext } from '../../context/ThemeProvider';

export default function CityCard({ isPublicMap, id, city, country, removeCity, viewCity, closeCityOverlay, image }) {
    // Context
    const [theme] = useContext(themeContext);

    return (
        <div className="w-60 z-50 rounded-lg">
            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="absolute top-2 right-2 z-50">
                <button
                        className="flex items-center justify-center transition-all h-8"
                        onClick={closeCityOverlay}
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
                    <Image className="relative object-cover w-full h-24 mb-3 shadow-lg" height={30} width={30} src={image} alt={`${city}, ${country}`} />
                    <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white px-4">{`${city}, ${country}`}</h5>
                    <div className="flex mt-4 justify-center w-full">
                        <a onClick={() => viewCity(city)} className="cursor-pointer inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View</a>
                        {
                            !isPublicMap && (
                                <a onClick={() => { removeCity(id); closeCityOverlay(); }} className="cursor-pointer inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Remove</a>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}