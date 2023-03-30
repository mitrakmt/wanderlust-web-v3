import Link from 'next/link';
import Image from 'next/image'

export default function CityRow({ cities, pageIndex }) {
    function convertToPercentage(num) {
        if (num > 5) {
          return '100%';
        } else {
          return `${num * 20}`;
        }
    }
    
    return (
        <section className="py-3 sm:py-5">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 pr-6 py-3">Name</th>
                                <th scope="col" className="px-4 py-3">Air Quality</th>
                                <th scope="col" className="px-4 py-3">Nomad Cost</th>
                                <th scope="col" className="px-4 py-3">Expat Cost</th>
                                <th scope="col" className="px-4 py-3">Cost Score</th>
                                <th scope="col" className="px-4 py-3">Leisure Score</th>
                                <th scope="col" className="px-4 py-3">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cities.map((city) => (
                                    <tr key={`cityRow-${pageIndex}-${city.id}`} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <th scope="row" className="flex items-center px-4 py-2 pr-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <Image src={city.image_url_thumb} alt={city.name} height={70} width={70} className="object-cover h-8 w-8 mr-3 rounded-full" />
                                            <Link href={`/city/${city.id}`} className="w-full">
                                                <div className="flex flex-col hover:text-primary-700 transition-colors">
                                                    <p>{city.name}</p>
                                                    <p>{city.country_name}</p>
                                                </div>
                                            </Link>
                                        </th>
                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center">
                                                <div className={`inline-block w-4 h-4 mr-2 ${city.air_quality_score <= 3 ? "bg-red-700" : city.air_quality_score < 4 ? "bg-yellow-700" : "bg-green-700"} rounded-full`} />
                                                {city.air_quality_score / 5 * 100}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">${city.cost_for_nomad_in_usd.toFixed(0)}</td>
                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">${city.cost_for_expat_in_usd.toFixed(0)}</td>
                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center">
                                                <div className={`inline-block w-4 h-4 mr-2 ${city.cost_score <= 3 ? "bg-red-700" : city.cost_score < 4 ? "bg-yellow-700" : "bg-green-700"} rounded-full`} />
                                                {convertToPercentage(city.cost_score.toFixed(0))}
                                            </div>
                                        </td>
                                        
                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex items-center">
                                                <div className={`inline-block w-4 h-4 mr-2 ${city.leisure_quality <= 3 ? "bg-red-600" : city.leisure_quality < 4 ? "bg-yellow-200" : "bg-green-700"} rounded-full`} />
                                                {convertToPercentage(city.leisure_quality.toFixed(0))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="flex">
                                                <svg aria-hidden="true" className={`w-5 h-5 ${city?.overall_score >= 1 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                <svg aria-hidden="true" className={`w-5 h-5 ${city?.overall_score >= 2 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                <svg aria-hidden="true" className={`w-5 h-5 ${city?.overall_score >= 3 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                <svg aria-hidden="true" className={`w-5 h-5 ${city?.overall_score >= 4 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                <svg aria-hidden="true" className={`w-5 h-5 ${city?.overall_score >= 5 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}