/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'

// Utils
import request from '../utils/request';

export default function CityEmbed({ id }) {
    // State
    const [city, setCity] = useState({})

    // UseEffects
    useEffect(() => {
        request(`/cities/${id}`)
            .then(response => {
                setCity(response.data);
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
        <div className="overflow-x-auto px-4 sm:px-6 pt-2 pb-6 rounded-lg bg-gray-200 dark:bg-gray-800">
            <div className="py-0 my-0 h-20 flex items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {
                    city?.image_url_thumb && <Image src={city.image_url_thumb} alt={city.name} height={150} width={150} className="object-cover h-12 w-12 rounded-full" />
                }
                <Link href={`/city/${city.slug}`} className="ml-3 w-full flex flex-col transition-colors text-gray-600 dark:text-gray-300 hover:text-primary-700 hover:dark:text-primary-700">
                    <p>{city.name}, {city.country_name}</p>
                </Link>
            </div>
            <table className="w-full py-0 my-0 text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3" style={{ paddingLeft: '14px' }}>Air Quality</th>
                        <th scope="col" className="px-4 py-3">Nomad Cost</th>
                        <th scope="col" className="px-4 py-3">Expat Cost</th>
                        <th scope="col" className="px-4 py-3">Cost Score</th>
                        <th scope="col" className="px-4 py-3">Leisure Score</th>
                        <th scope="col" className="px-4 py-3">Rating</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={`cityEmbed-${city.id}`} className="border-b bg-gray-100 dark:bg-gray-700 dark:border-gray-600">
                        <td style={{ paddingLeft: '14px' }} className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center h-full relative min-h-full">
                                <div className={`inline-block w-4 h-4 mr-2 ${city.air_quality_score <= 3 ? "bg-red-600" : city.air_quality_score < 4 ? "bg-yellow-200" : "bg-green-700"} rounded-full`} />
                                {city.air_quality_score / 5 * 100}
                            </div>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">${city.cost_for_nomad_in_usd?.toFixed(0)}</td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">${city.cost_for_expat_in_usd?.toFixed(0)}</td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center">
                                <div className={`inline-block w-4 h-4 mr-2 ${city.cost_score <= 3 ? "bg-red-600" : city.cost_score < 4 ? "bg-yellow-200" : "bg-green-700"} rounded-full`} />
                                {convertToPercentage(city.cost_score?.toFixed(0))}
                            </div>
                        </td>
                        
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center">
                                <div className={`inline-block w-4 h-4 mr-2 ${city.leisure_quality <= 3 ? "bg-red-600" : city.leisure_quality < 4 ? "bg-yellow-200" : "bg-green-700"} rounded-full`} />
                                {convertToPercentage(city.leisure_quality?.toFixed(0))}
                            </div>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex">
                                <svg aria-hidden="true" className={`w-4 h-4 ${city?.overall_score >= 1 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg aria-hidden="true" className={`w-4 h-4 ${city?.overall_score >= 2 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg aria-hidden="true" className={`w-4 h-4 ${city?.overall_score >= 3 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg aria-hidden="true" className={`w-4 h-4 ${city?.overall_score >= 4 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <svg aria-hidden="true" className={`w-4 h-4 ${city?.overall_score >= 5 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}