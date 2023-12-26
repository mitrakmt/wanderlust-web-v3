import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'

// Components
import TextH3 from '../components/Text/TextH3';

// Utils
import request from '../utils/request';

// Components
import DistanceCityCard from './DistanceCityCard';

export default function RelatedCities({ citySelected }) {
    // STATE
    const [relatedCities, setRelatedCities] = useState([]);

    // USE EFFECTS
    useEffect(() => {
        // fetch related cities
        if (citySelected) {
            request(`/cities/closeByInCountry/${citySelected?.country?.id}/${citySelected?.id}`)
                .then(response => {
                    setRelatedCities(response.data);
                })
        }
    }, [citySelected]);

    return (
        <section className="py-3 sm:py-5">
            <TextH3>Famous Cities in {citySelected?.country_name}</TextH3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {relatedCities?.map((city, index) => (
                    <DistanceCityCard city={city} key={`relatedCities-${city.id}`} index={index} currentCity={citySelected} />
                ))}
            </div>
        </section>
    )
}