import { useContext, useEffect, useState } from 'react';

// Utils
import request from '../../../utils/request';

// Components
import Map from './Map';
import CitySidebar from '../../../shared_components/CitySidebar';

// Hooks
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/router';

// Context
import { toVisitContext } from '../../../context/ToVisitProvider';

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
                {/* NAVIGATE ON MAP  */}
                {/* <div className="flex items-center relative w-full">
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
                </div> */}
            </div>

            {/* SIDEBAR  */}
            <CitySidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar} setToVisit={setToVisit} toVisit={toVisit} />
        </div>
    )
}