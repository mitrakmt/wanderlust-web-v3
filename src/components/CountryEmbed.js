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
        request(`/countries/${id}`)
            .then(response => {
                setCountry(response.data);
            })
    }, []);

    // Functions
    function convertToPercentage(num) {
        if (num > 5) {
          return '100%';
        } else {
          return `${num * 20}`;
        }
    }
    
    
    return (
        <section className="py-1">
            <table className="w-full py-0 my-0 text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3" style={{ paddingLeft: '14px' }}>Name</th>
                        <th scope="col" className="px-4 py-3">Region</th>
                        <th scope="col" className="px-4 py-3">Population</th>
                        <th scope="col" className="px-4 py-3">Currency</th>
                        <th scope="col" className="px-4 py-3">Capital</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={`countryEmbed-${country?.id}`} className="border-b bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
                        <td style={{ paddingLeft: '14px' }} className="px-4 py-0 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center h-24 relative">
                                {
                                    country?.image_url_thumb && <Image src={country?.image_url_thumb} alt={country?.name} height={200} width={200} className="object-cover h-16 w-16 rounded-full" />
                                }
                                <Link href={`/countries/${country?.slug}`} className="ml-3 w-full flex flex-col transition-colors text-gray-600 dark:text-gray-300 hover:text-primary-700 hover:dark:text-primary-700">
                                    <p>{country?.slug}</p>
                                </Link>
                            </div>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{country?.region}</td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{country?.population}</td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{country?.currency}</td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{country?.capital}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}