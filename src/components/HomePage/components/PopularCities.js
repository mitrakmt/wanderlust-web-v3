import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import request from '../../../utils/request';
import CityCard from '../../CityCard/CityCard';

export default function PopularCities() {
    const [popularCities, setPopularCities] = useState([]);

    // UseEffect
    useEffect(() => {
        request(`/cities/featured`)
            .then((res) => {
                setPopularCities(res.data.slice(0, 4) || []);
            })
    }, [])

    return (
        <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6 my-8">
            <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Popular Cities</h2>
                <p className="font-normal text-gray-800 lg:mb-16 sm:text-xl dark:text-gray-200">Popular nomad cities around the world</p>
            </div>
            <div className="grid gap-6 mb-6 lg:mb-16 grid-cols-2 sm:grid-cols-4">
                {
                    popularCities.map((city, index) => (
                        <CityCard key={`popularCities-${city.city.slug}`} data={city} index={index} hideLikeCount />
                    ))
                }
            </div>
        </div>
    )
}