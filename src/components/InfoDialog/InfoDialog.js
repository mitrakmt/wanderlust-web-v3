// Components
import Dialog from "../Dialog";
import { useRouter } from "next/router";

function InfoDialog({ city, country, attribution, countryInfo, cityInfo }) {
    const continentKeys = {
        "AS": "Asia",
        "EU": "Europe",
        "NA": "North America",
        "SA": "South America",
        "AF": "Africa",
        "AU": "Australia",
        "AN": "Antarctica",
    }

    // Hooks
    const router = useRouter();

    // Functions
    const navigateToCity = () => {
        if (cityInfo?.slug) {
            router.push(`/city/${cityInfo.slug}`);
        }
    }

  return (
    <Dialog
        modalId="infodialog"
        title={`${city ? city : country}${city ? `, ${country}${countryInfo?.emoji ? ` ${countryInfo?.emoji}` : ''}` : null}`}
        body={
            <div className="relative">
                {/* Button to view city at /city/slug */}
                {
                    cityInfo?.slug && <div className="absolute top-0 right-0">
                        <button className="btn btn-primary btn-sm px-4 py-1 rounded-lg bg-primary-800 dark:bg-primary-800 text-white dark:text-white hover:bg-primary-900 dark:hover:bg-primary-900 transition-colors" onClick={navigateToCity}>View City</button>
                    </div>
                }
                {
                    countryInfo && <div>
                        <p className="text-lg mt-1 mb-0 text-gray-900 dark:text-gray-200">Capital: {countryInfo?.capital}</p>
                        {
                            continentKeys[countryInfo?.continent] && <p className="text-lg mt-1 mb-0 text-gray-900 dark:text-gray-200">Continent: {continentKeys[countryInfo?.continent]}</p>
                        }
                    </div>
                }
                {
                    cityInfo && <div>
                        <p className="text-lg mt-1 mb-0 text-gray-900 dark:text-gray-200">Region: {cityInfo?.region}</p>
                        <p className="text-lg mt-1 mb-0 text-gray-900 dark:text-gray-200">City Population: {cityInfo?.population?.toLocaleString("en-US")}</p>
                        <p className="text-lg mt-1 mb-0 text-gray-900 dark:text-gray-200">Nomad Cost of Living: ${cityInfo?.cost_for_nomad_in_usd?.toLocaleString("en-US")}</p>

                        {
                            cityInfo?.top_sights?.length > 0 && 
                                <div>
                                    <p className="text-lg mt-1 mb-0 text-gray-900 dark:text-gray-200">Sights to see:</p>
                                    <div className="flex flex-wrap">
                                        {
                                            cityInfo?.top_sights.map((sight, index) => {
                                                return <p className="px-5 py-2 mx-1 my-1 text-sm text-gray-900 dark:text-gray-200 bg-gray-400 dark:bg-gray-700 rounded-xl" key={`sights-to-see-${index}`}>{sight}</p>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                    </div>
                }
                <p className="mt-8 text-xs text-gray-400 dark:text-gray-600">
                    See{" "}
                    <a
                        href={`${attribution?.originalImageLink}?utm_source=your_app_name&utm_medium=referral `}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-gray-800 dark:text-gray-400"
                    >
                        unsplash image
                    </a>
                    
                    {" "}taken by{" "}
                    <a
                        href={`${attribution?.image_author_link}?utm_source=your_app_name&utm_medium=referral`}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-gray-800 dark:text-gray-400"
                    >
                        {attribution?.image_author_name}
                    </a>{" "}
                    on{" "}
                    <a
                        href="https://unsplash.com?utm_source=your_app_name&utm_medium=referral "
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-gray-800 dark:text-gray-400"
                    >
                        Unsplash
                    </a>
                </p>
            </div>
        }
    />
  );
}

export default InfoDialog;
