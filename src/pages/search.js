import { useContext, useEffect, useState } from 'react';

// Components
import CityCard from '../components/CityCard/CityCard';
import LoadingCityCard from '../components/LoadingCityCard/LoadingCityCard';

// Hooks
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

// Context
import { featuredCitiesContext } from '../context/FeaturedCitiesProvider';
import { favoritesContext } from '../context/FavoritesProvider';
import { listsContext } from '../context/ListsProvider';

// New Components
import TextH2 from '../components/Text/TextH2';
import InputWithAddon from '@/components/InputWithAddon/InputWithAddon';
import CustomButton from '@/components/Button/Button';

// Utils
import removeFavorite from '../utils/removeFavorite';
import addFavorite from '../utils/addFavorite';
import request from '../utils/request';
import trackClick from '../utils/trackClick';
import trackStat from '../utils/trackStat';

export default function Search() {
    // Context
    const [featuredCities, setFeaturedCities] = useContext(featuredCitiesContext);
    const [favorites, setFavorites] = useContext(favoritesContext);
    const [, setLists] = useContext(listsContext);
    const [locations, setLocations] = useState([]);

    // Hooks
    const router = useRouter();
    const { user } = useAuth();

    // State search
    const [searchLocationsSearchTerm, setSearchLocationsSearchTerm] = useState("");
    const [, setListsLoading] = useState(false);

    // State loading
    const [searchLocationsLoading, setSearchLocationsLoading] = useState(false);
    const [searchRandomCityLoading, setSearchRandomCityLoading] = useState(false);
    const [searchRandomCityByRegionLoading, setSearchRandomCityByRegionLoading] = useState(false);
    
    // UseEffects
    useEffect(() => {
        trackStat({ type: 'tabViews', property: 'dashboard' })
    }, [])

    useEffect(() => {
        request('/cities/featured')
            .then(res => {
                setFeaturedCities(res.data);
            })
    }, []);
    
    useEffect(() => {
        if (user) {
            request('/favorites')
                .then(res => {
                    setFavorites(res.data);
                })
        }
    }, []);

    useEffect(() => {
        setListsLoading(true);
        request(`/list`)
            .then(res => {
                if (res.data) {
                    setLists(res.data);
                    setListsLoading(false);
                }
            })
    }, []);

    const toggleFavorite = (cityId, currentImageFavoriteStatus, city) => {
        // If already favorited
        if (currentImageFavoriteStatus) {
            trackClick('unfavorite')
            trackStat('general', 'unfavorite');
            const newFeaturedCities = featuredCities.slice();
            for (let i = 0; i < featuredCities?.length; i++) {
                if (featuredCities[i]?.city.id === cityId) {
                    featuredCities[i].city.favorite_count -= 1
                }
            }
            setFeaturedCities(newFeaturedCities);

            removeFavorite(cityId, favorites, setFavorites);
        } else {
            // If not favorited
            trackClick('favorite')
            trackStat('general', 'favorite');
            addFavorite(cityId, favorites, setFavorites, city);
            
            const newFeaturedCities = featuredCities.slice();

            for (let i = 0; i < featuredCities?.length; i++) {
                if (featuredCities[i]?.city.id === cityId) {
                    featuredCities[i].city.favorite_count += 1
                }
            }

            setFeaturedCities(newFeaturedCities);
        }
    }

    const clearCitiesSearch = () => {
        setSearchLocationsSearchTerm("");
        setLocations([])
    }

    const searchLocations = () => {
        setSearchLocationsLoading(true);
        request(`/cities/search?name=${searchLocationsSearchTerm}`)
            .then(res => {
                setLocations(res.data);
                setSearchLocationsLoading(false);
            })
    }

    const findRandomLocation = () => {
        setSearchRandomCityLoading(true);
        request(`/cities/random`)
            .then(res => {
                router.push({
                    pathname: `/city/${res.data?.slug}`,
                    query: { breadcrumb: 'search' }
                });
                setSearchRandomCityLoading(false);
            })
    }

    const findRandomLocationByRegion = (region) => {
        setSearchRandomCityByRegionLoading(true);
        request(`/cities/random/region?region=${region}`)
            .then(res => {
                router.push({
                    pathname: `/city/${res.data?.slug}`,
                    query: { breadcrumb: 'search' }
                });
                setSearchRandomCityByRegionLoading(false);
            })
    }

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8 overflow-scroll scroll-smooth">
            <TextH2>Popular Destinations</TextH2>
            <div className="flex items-end overflow-scroll">
                {
                    searchLocationsSearchTerm.length > 0 &&
                        <button
                            style={{ marginBottom: '4px' }}
                            className="flex items-center justify-center mr-4 h-8 px-5 py-5 button button-close"
                            onClick={clearCitiesSearch}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-black dark:text-white"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                        </button>
                }
                <div className="w-full">   
                    <div className="relative">
                        <InputWithAddon
                            onChange={(e) => setSearchLocationsSearchTerm(e.target.value)}
                            onKeyUp={searchLocations}
                            label="Search"
                            value={searchLocationsSearchTerm}
                            symbol={<svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>}
                            type="text"
                            placeholder="Search for a city..."
                        />
                        <div className="absolute right-0 top-7">
                            <CustomButton disabled={searchLocationsLoading ? true : false} onClick={searchLocations} text="Search" />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 mt-6 mb-8 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
                {
                    searchLocationsLoading ? (
                        <svg role="status" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg> ) : locations?.map((city, index) => (
                        <CityCard key={`searchCityCard-${city.id}-${index}`} breadcrumb="Search" keyId={`searchCityCard-${city.id}-${index}`} data={{
                            city
                        }} index={index} user={user} favorites={favorites} toggleFavorite={toggleFavorite} />
                    ))
                }
            </div>

            {/* <div className="flex">
                {
                    lists.map(list => (
                        <a className="flex flex-col items-center bg-white border rounded-lg shadow-md cursor-pointer md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <Image height={30} width={30} className="relative object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={list.image} alt={list.name} />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{list.name}</h5>
                            </div>
                        </a>
                    ))
                }
            </div> */}

            <div className="flex mt-6 flex-wrap">
                <div className="inline-flex mr-0 md:mr-4 rounded-md shadow-sm mb-4 md:mb-0 w-full md:w-auto" role="group">
                    <button type="button" onClick={findRandomLocation} disabled={searchRandomCityLoading} className="w-full md:w-auto justify-center inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white">
                        {
                            searchRandomCityLoading ?
                                <>
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                    </svg>
                                    Loading...
                                </> :
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                                    </svg>

                                    Take me somewhere
                                </>
                        }
                    </button>
                </div>

                <div className="inline-flex mr-0 md:mr-4 rounded-md shadow-sm w-full md:w-auto" role="group">
                    <div className="inline-flex items-center justify-center w-full md:w-auto px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-primary-500 dark:focus:text-white">
                        {
                            searchRandomCityByRegionLoading ?
                                <>
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                    </svg>
                                    Loading...
                                </> :
                                <div className="flex flex-col md:flex-row justify-center items-center">
                                    <div className="flex my-4 md:my-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>

                                        Take me somewhere in:
                                    </div>

                                    <div className="flex flex-wrap justify-center items-center">
                                        <button type="button" onClick={() => findRandomLocationByRegion('Asia')} disabled={searchRandomCityByRegionLoading} className="inline-flex my-1 items-center px-2 py-1 ml-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            Asia
                                        </button>
                                        <button type="button" onClick={() => findRandomLocationByRegion('Europe')} disabled={searchRandomCityByRegionLoading} className="inline-flex my-1 items-center px-2 py-1 ml-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            Europe
                                        </button>
                                        <button type="button" onClick={() => findRandomLocationByRegion('Oceania')} disabled={searchRandomCityByRegionLoading} className="inline-flex my-1 items-center px-2 py-1 ml-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            Oceania
                                        </button>
                                        <button type="button" onClick={() => findRandomLocationByRegion('North America')} disabled={searchRandomCityByRegionLoading} className="inline-flex my-1 items-center px-2 py-1 ml-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            North America
                                        </button>
                                        <button type="button" onClick={() => findRandomLocationByRegion('Latin America')} disabled={searchRandomCityByRegionLoading} className="inline-flex my-1 items-center px-2 py-1 ml-1 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                            Latin America
                                        </button>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 mt-8 sm:mt-16 md:mt-12 gap-y-4 sm:gap-y-20 lg:gap-y-8 gap-x-4 xl:gap-x-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                {/* TODO: Filter by continent, or country */}
                {
                    featuredCities?.length === 0 ? 
                        new Array(18).fill(18).map((val, index) => (
                            <LoadingCityCard key={`dashboard-loadingCity-${index}`} />
                        )) :
                        featuredCities && featuredCities?.map((data, index) => (
                            <CityCard key={`cityCard-${data.id}-${index}`} breadcrumb="Search" keyId={`cityCard-${data.id}-${index}`} data={data} index={index} favorites={favorites} toggleFavorite={toggleFavorite} />
                        ))
                }
            </div>
        </section>
    )
}