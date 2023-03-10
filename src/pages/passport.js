import React, { useEffect } from 'react';

// Utils
import request from '../utils/request';
import trackStat from '../utils/trackStat';

// Hooks
import { useAuth } from '../hooks/useAuth';

// Components
import TextP from '../components/Text/TextP';
import Map from '../components/passport/Map';

export default function Countries() {
    // Hooks
    const { user, setUser, userLoading } = useAuth();

    useEffect(() => {
        if (!user?.premium) {
            router.push('/pro')
        }
    }, [user])

    // UseEffects
    useEffect(() => {
        trackStat({ type: 'tabViews', property: 'map' })
    }, [])

    // Functions
    const removeCountry = (country) => {
        const new_countries_visited = user?.countries_visited.filter(e => e !== country)

        setUser({
            ...user,
            ...{ countries_visited: new_countries_visited }
        })

        request(`/users/${user.id}`, {
            method: 'PUT',
            body: {
                countries_visited: new_countries_visited
            },
          })
            .then(() => {
              // TODO: handle error, revert
            })
    }

    const addCountry = (country) => {
        if (typeof(country) !== 'string') {
            return;
        }
        
        const new_countries_visited = [ ...user?.countries_visited, ...[country] ]

        setUser({
            ...user,
            ...{ countries_visited: new_countries_visited }
        })

        request(`/users/${user.id}`, {
            method: 'PUT',
            body: {
                countries_visited: new_countries_visited
            }
          })
            .then(() => {
              // TODO: handle error, revert
            })
    }

    if (userLoading) return null;

    return (
        <section className="relative py-4 px-4">
            <div className="flex w-full mb-4 space-between relative z-50">
                <div className="px-2 md:px-4 mr-4 text-gray-700 bg-gray-300 rounded-md dark:text-gray-400 dark:bg-gray-700">
                    <TextP classes="px-1 md:px-4 py-2">Countries Visited: {user?.countries_visited.length}</TextP>
                </div>
                <div className="px-2 md:px-4 mr-4 text-gray-700 bg-gray-300 rounded-md dark:text-gray-400 dark:bg-gray-700">
                    <TextP classes="px-1 md:px-4 py-2">% of World Traveled: {parseFloat(((user?.countries_visited.length / 250) * 100).toFixed(2))}%</TextP>
                </div>
            </div>
            <Map
                user={user}
                setUser={setUser}
                removeCountry={removeCountry}
                addCountry={addCountry}
                defaultZoom={2.5}
                coordinates={[115.1317479, -8.6531344]}
            />
        </section>
    )
}