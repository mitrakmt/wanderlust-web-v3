import { useEffect, useState } from 'react';
import request from '../../utils/request';
import Image from 'next/image';

export default function LocationSuggestions() {
    const [recommendedLocations, setRecommendedLocations] = useState([]);

    useEffect(() => {
        // Get recent image likes
        request('/locations/recommendations', {
            method: 'GET'
        }).then(res => {
            console.log('res locations', res)
            setRecommendedLocations(res?.data || []);
        })
    }, [])

    return (
        <div className="p-4 rounded-lg w-full overflow-none bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Location Suggestions</h5>
            </div>
            <div className="grid grid-cols-2 gap-1">
                {
                    recommendedLocations.map(location => (
                        <div key={`locationSuggestions-${location?._id}`} className="h-full w-full">
                            {
                                location?.image_url_thumb ? (
                                    <Image className="w-full object-cover h-full rounded-lg" priority quality={80} height={140} width={140} src={location?.image_url_thumb} alt={`${location?.city_name}`} />
                                ) : (
                                    <svg className="w-8 h-8 text-gray-300 rounded-full" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                                    </svg>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}