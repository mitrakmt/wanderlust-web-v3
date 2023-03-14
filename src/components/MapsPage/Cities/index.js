import { useContext, useEffect, useState } from 'react';

// Utils
import request from '../../../utils/request';
import trackStat from '../../../utils/trackStat';

// Components
import Map from './Map';

// Hooks
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/router';

// Context
import { toVisitContext } from '../../../context/ToVisitProvider';

// New Components
import Input from '../../Input/Input';
import CustomButton from '../../Button/Button';

export default function TravelList() {
    // Hooks
    const { user, setUser, userLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.premium) {
            router.push('/pro')
        }
    }, [user])

    // Context
    const [toVisit, setToVisit] = useContext(toVisitContext);

    // State
    const [showSidebar, setShowSidebar] = useState(false);
    const [searchActive, setSearchActive] = useState(false);

    // State search
    const [citiesSearchTerm, setCitiesSearchTerm] = useState("");
    const [cities, setCities] = useState([]);

    // State loading
    const [searchCitiesLoading, setSearchCitiesLoading] = useState(true);
    const [addToVisitLoading, setAddToVisitLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        trackStat({ type: 'tabViews', property: 'tovisit' })
    }, [])

    useEffect(() => {
        request(`/users/tovisit`)
            .then(res => {
                setToVisit(res.data || []);
            })
    }, [])

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    }

    // Functions
    const clearCitySearch = () => {
        setCities([]);
        setCitiesSearchTerm("");
    }

    const searchCity = () => {
        setSearchCitiesLoading(true);
        request(`/cities/search?name=${citiesSearchTerm}`)
            .then(res => {
                setCities(res.data);
                setSearchCitiesLoading(false);
            })
    }

    const addToVisit = (city) => {
        setAddToVisitLoading(true);
        setToVisit([ ...toVisit, ...[city]])
        request(`/users/tovisit`, {
            method: "PUT",
            body: {
                city: city.id
            }
        }).then(res => {
            if (!res.data) {
                setToVisit(toVisit?.filter((id) => id !== city.id))
                // TODO: show error 
                return;
            }

            clearCitySearch()
            setAddToVisitLoading(false);
        })
    }

    const removeCity = (cityId) => {
        setToVisit(toVisit?.filter((city) => city.id !== cityId))

        request(`/users/tovisit`, {
            method: 'DELETE',
            body: {
                city: cityId
            }
          })
    }

    const viewCity = (city) => {
        router.push(`/city/${city.slug}`, { state: { breadcrumb: 'TravelList' } })
    }

    const updateSearchTerm = (term) => {
        if (term === "") {
            setCities([]);
        }

        setCitiesSearchTerm(term)
    }

    const toggleSearchActive = () => {
        clearCitySearch();
        setSearchActive(!searchActive);
    }

    if (userLoading) return null;

    return (
        <div className="relative">
            <Map isPublicMap={false} toVisit={toVisit} defaultZoom={2.5} coordinates={[17.1317479, 41.6531344]} user={user} viewCity={viewCity} removeCity={removeCity} setUser={setUser} />

            {/* SIDEBAR  */}
            <div className="text-center m-5 fixed top-32 sm:top-16 right-0 z-50">
                <button onClick={toggleSidebar} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm p-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
                <div className="flex items-center relative w-full">
                    <div className={`absolute transition-all ${searchActive ? "z-10 w-80 right-20": "w-0 right-10"}`}>
                        <input type="text" className={`${searchActive ? "p-2.5" : "px-0 py-2.5"} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Navigate on the map" />
                    </div>
                    <button onClick={toggleSearchActive} className="z-20 cursor-pointer text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-full text-sm p-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            {
                                searchActive ? 
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            }
                        </svg>
                    </button>
                </div>
            </div>

            {/* <!-- drawer component --> */}
            <div className={`absolute top-0 ${showSidebar ? "right-0" : "-right-96"} z-50 w-80 h-screen p-4 transition-all bg-white dark:bg-gray-800`} tabIndex="-1">
                <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">New Place</h5>
                <button type="button" onClick={toggleSidebar} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <div action="#">
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-800 w-full" id="search" role="tabpanel" aria-labelledby="search">
                            <div className="flex w-full">
                              
                                <div className="w-full">   
                                    <div className="relative">
                                        <Input
                                            onChange={(e) => updateSearchTerm(e.target.value)}
                                            onKeyUp={searchCity}
                                            label="Search"
                                            value={citiesSearchTerm}
                                            type="text"
                                            placeholder="Search for a place..."
                                        />
                                        <div className="absolute right-0 top-7">
                                            <CustomButton disabled={searchCitiesLoading ? true : false} onClick={searchCity} text="Search" />
                                        </div>
                                    </div>
                                    <div className="mt-2 relative">
                                        {
                                            citiesSearchTerm.length !== 0 ? cities?.length > 0 && <div className="overflow-x-auto shadow-md sm:rounded-lg absolute w-full scroll max-h-80" style={{ zIndex: 100 }}>
                                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0" style={{ zIndex: 50 }}>
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3">
                                                                City, Country
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            cities.map((city, index) => (
                                                                <tr key={`citiesList-${city.name}-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                                    <td className="px-6 py-4">
                                                                        {city?.name}, {city.country?.name}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <button onClick={() => addToVisit(city)} disabled={addToVisitLoading} className="mt-2 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add</button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div> : <div></div>
                                        }
                                </div>
                                <div className="flex justify-center w-full pb-4 space-x-4 md:px-4 mt-4">
                                    <button type="button" onClick={toggleSidebar} className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                        <svg aria-hidden="true" className="w-5 h-5 -ml-1 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                        Close
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}