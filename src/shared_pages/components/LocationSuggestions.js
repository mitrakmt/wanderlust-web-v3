import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function LocationSuggestions({ recommendedLocations }) {
    // Hooks
    const router = useRouter();

    return (
        <div className="p-4 rounded-lg w-full overflow-none bg-white border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Location Suggestions</h5>
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-4">
                {
                    recommendedLocations.map(location => (
                            <div key={`locationSuggestions-${location?._id}`} className="h-full w-full">
                                {
                                    location?.image_url_small && (
                                        <Link
                                            href={{
                                                pathname: `/city/${location?.city[0].slug}`,
                                                query: { breadcrumb: router.pathname },
                                            }}
                                            as={`/city/${location?.city[0].slug}`}
                                        >
                                            <Image className="cursor-pointer w-full object-cover h-40 rounded-lg" priority quality={80} height={180} width={180} src={location?.image_url_small} alt={`${location?.city_name}`} />
                                            <p className="text-xs font-light text-gray-800 truncate dark:text-gray-200">{`${location.city[0].name}, ${location.city[0].country_name}`}</p>
                                        </Link>
                                    )
                                }
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}