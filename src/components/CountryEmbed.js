import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'

// Utils
import request from '../utils/request';

export default function CountryEmbed({ id }) {
    // State
    const [country, setCountry] = useState(null)

    // UseEffects
    useEffect(() => {
        // request(`/countries/${id}`)
        //     .then(response => {
        //         setCountry(response.data);
        //     })
    }, []);
    
    return (
        <section className="py-3 sm:py-5">
            <p>Country Embed</p>
        </section>
    )
}