import { useEffect, useState } from 'react';
import request from '../../utils/request';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LocationSuggestions() {
    // State
    const [recommendedLocations, setRecommendedLocations] = useState([]);

    // Hooks
    const router = useRouter();

    // UseEffects
    useEffect(() => {
        // Get recent image likes
        request('/locations/recommendations', {
            method: 'GET'
        }).then(res => {
            console.log('res', res.data)
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
                                location?.image_url_thumb && (
                                    <Link
                                        href={{
                                            pathname: `/city/${location?.city[0].slug}`,
                                            query: { breadcrumb: router.pathname  },
                                        }}
                                        as={`/city/${location?.city[0].slug}`}
                                        passHref
                                    >
                                        <Image className="cursor-pointer w-full object-cover h-full rounded-lg" priority quality={100} height={180} width={180} src={location?.image_url_small} alt={`${location?.city_name}`} />
                                    </Link>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}