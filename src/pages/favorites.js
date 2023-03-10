import { useEffect, useContext, useState } from 'react';
import request from '../utils/request';
import trackStat from '../utils/trackStat';

// Pages
import CityView from './city/[cityId]';

// Utils
import removeFavorite from '../utils/removeFavorite';

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

// Context
import { favoritesContext } from '../context/FavoritesProvider';

// Components
import CityCard from '../components/CityCard/CityCard';
import CountryCard from '../components/CountryCard/CountryCard';
import TextH2 from '../components/Text/TextH2';
import TextP from '../components/Text/TextP';
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';

export default function Favorites() {
    // Hooks
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user])

    // Context
    const [favorites, setFavorites] = useContext(favoritesContext);

    // Dashboard Navigation
    const [citySelected, setCitySelected] = useState(null);
    const [showFavoriteTypeCities, setShowFavoriteTypeCities] = useState(true)

    // State
    const [countriesVisited, setCountriesVisited] = useState({});
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("");

    // UseEffects
    useEffect(() => {
        trackStat({ type: 'tabViews', property: 'favorites' })
    }, [])

    useEffect(() => {
        request('/favorites')
            .then(res => {
                setFavorites(res.data);
            })
    }, []);

    useEffect(() => {
        const newCountriesVisited = {};
        user?.countries_visited?.forEach(country => {
            newCountriesVisited[country] = true;
        })
        setCountriesVisited(newCountriesVisited)
    }, [])

    // Functions
    const removeFavoriteAction = (id) => {
        removeFavorite(id, favorites, setFavorites);
    }
    
    const toggleFilterDropdown = () => {
        setShowFilterDropdown(!showFilterDropdown)
    }

    const setFilter = (e) => {
        setSelectedFilter(e.target.id)
        setShowFilterDropdown(false);
    }

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <TextH2>Favorites</TextH2>
                {/* TODO: favorites by cities, AND favorites by images */}
                <div className="flex justify-between h-10">
                    <ToggleSwitch checked={showFavoriteTypeCities} text={showFavoriteTypeCities ? "Cities" : "Countries"} onChange={() => setShowFavoriteTypeCities(!showFavoriteTypeCities)} />
                    <div className="relative">
                        {
                            !showFavoriteTypeCities && <button onClick={toggleFilterDropdown} data-dropdown-toggle="dropdownRadioBgHover" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">Filter 
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                        }
                        {
                            showFilterDropdown &&
                                <div className="absolute left-0 right-0 block w-48 bg-white divide-y divide-gray-100 rounded shadow top-12 dark:bg-gray-700 dark:divide-gray-600" style={{ zIndex: 150 }}>
                                    <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
                                        <li>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id={""} onChange={setFilter} type="radio" value={""} checked={selectedFilter === ""} name="All" className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 cursor-pointer focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">All</label>
                                        </div>
                                        </li>
                                        <li>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id="visited" onChange={setFilter} type="radio" checked={selectedFilter === 'visited'} value="visited" name="Visited" className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 cursor-pointer focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Visited</label>
                                        </div>
                                        </li>
                                        <li>
                                        <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input id="notvisited" onChange={setFilter} type="radio" checked={selectedFilter === 'notvisited'} value="notvisited" name="Not Visited" className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 cursor-pointer focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Not Visited</label>
                                        </div>
                                        </li>
                                    </ul>
                                </div>
                        }
                    </div>
                </div>
                <div className="grid grid-cols-2 mt-6 mb-8 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
                {
                    showFavoriteTypeCities ?
                        favorites && favorites?.map((favorite, index) => (
                            <CityCard key={`favorites-${favorite.id}-${index}`} breadcrumb="Favorites" setCitySelected={setCitySelected} keyId={`favorites-city-${favorite.id}-${index}`} data={favorite} index={index} favorites={favorites} hideLikeCount toggleFavorite={removeFavoriteAction} />
                        )) :
                        favorites && favorites?.filter((item, index, self) =>
                            index === self.findIndex((favoritedCity) => (
                                favoritedCity.city.country_name === item.city.country_name
                            ))).filter((favorite) => {
                                if (selectedFilter === 'visited') {
                                    return countriesVisited[favorite.city.country.map_country_code];
                                } else if (selectedFilter === 'notvisited') {
                                    return !countriesVisited[favorite.city.country.map_country_code]
                                } else {
                                    return true
                                }
                                }).map((favorite, index) => (
                                    <CountryCard key={`favorites-${favorite.id}-${index}`} keyId={`favorites-country-${favorite.id}-${index}`}index={index} visited={countriesVisited[favorite.city.country.map_country_code]} name={favorite.city.country.name} image_url_small={favorite.city.country.image_url_small} />
                                ))
                        }
            </div>
            
            {
                favorites?.length === 0 &&
                    <div className="flex">
                        <TextP>Favorite some locations in the bottom left by clicking the</TextP>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <TextP> icon :)</TextP>
                    </div>
            }
        </section>
    )
}