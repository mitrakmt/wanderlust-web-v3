import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'

// Utils
import request from '../utils/request';

export default function UserEmbed({ id }) {
    // State
    const [city, setCity] = useState(null)

    // UseEffects
    useEffect(() => {
        // request(`/cities/${id}`)
        //     .then(response => {
        //         setCity(response.data);
        //     })
    }, []);
    
    return (
        <section className="py-3 sm:py-5">
            <p>User Embed</p>
        </section>
    )
}