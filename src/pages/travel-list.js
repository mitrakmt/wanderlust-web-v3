import { useContext, useEffect, useState } from 'react';
import request from '../utils/request';
import trackStat from '../utils/trackStat';

// Components
import CityView from './city/[cityId]';
import Map from '../components/travelListComponents/Map';

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

// Context
import { toVisitContext } from '../context/ToVisitProvider';

// New Components
import InputWithAddon from '../components/InputWithAddon/InputWithAddon';
import TextH2 from '../components/Text/TextH2';
import TextH5 from '../components/Text/TextH5';
import CustomButton from '../components/Button/Button';

export default function TravelList() {
    // Hooks
    const { user, setUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.premium) {
            router.push('/pro')
        }
    }, [user])

    // Context
    const [toVisit, setToVisit] = useContext(toVisitContext);

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
        router.push(`/city/${city.id}`, { state: { breadcrumb: 'TravelList' } })
    }

    const updateSearchTerm = (term) => {
        if (term === "") {
            setCities([]);
        }

        setCitiesSearchTerm(term)
    }

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <Map isPublicMap={false} toVisit={toVisit} defaultZoom={2.5} coordinates={[115.1317479, -8.6531344]} user={user} viewCity={viewCity} removeCity={removeCity} setUser={setUser} />
                <div className="px-2 md:px-8 py-2 w-full z-50">
                    <div className="pointer-events-none">
                        <TextH2 styles={{ position: 'relative', marginBottom: 0, fontWeight: 800 }}>Travel List</TextH2>
                        <p className="mt-0 relative font-bold text-sm md:text-md text-black dark:text-white text-wrap mb-2">Keep track of the places you want to visit around the world.</p>
                    </div>
                    <div className="w-full">
                        <div className="rounded-lg bg-gray-50 dark:bg-gray-800 w-full" id="search" role="tabpanel" aria-labelledby="search">
                            <div className="flex w-full">
                                {
                                    citiesSearchTerm?.length > 0 &&
                                        <button
                                            style={{ marginBottom: '4px', marginRight: '8px', marginTop: '30px' }}
                                            className="flex items-center justify-center h-8 px-5 py-5 button button-close"
                                            onClick={clearCitySearch}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-x-circle featherButton"
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
                                            onChange={(e) => updateSearchTerm(e.target.value)}
                                            onKeyUp={searchCity}
                                            label="Search"
                                            value={citiesSearchTerm}
                                            symbol={<svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>}
                                            type="text"
                                            placeholder="Search for a place..."
                                        />
                                        <div className="absolute right-0 top-7">
                                            <CustomButton disabled={searchCitiesLoading ? true : false} onClick={searchCity} text="Search" />
                                        </div>
                                    </div>
                                    <div className="p-2 relative">
                                        {
                                            citiesSearchTerm.length !== 0 ? cities?.length > 0 && <div className="overflow-x-auto shadow-md sm:rounded-lg absolute w-full scroll max-h-80" style={{ zIndex: 100 }}>
                                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0" style={{ zIndex: 50 }}>
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3">
                                                                City Name
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Country
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Population
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
                                                                        <TextH5>{city?.name}</TextH5>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {city.country?.name}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {city.population}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <button onClick={() => addToVisit(city)} disabled={addToVisitLoading} className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div> : <div></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    )
}