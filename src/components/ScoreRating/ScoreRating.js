import TextP from '../Text/TextP';

export default function ScoreRating({ citySelected }) {
    return(
        <>
            <div className="block">
                <div className="flex mb-6">
                    <p className="bg-primary-100 text-primary-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-primary-200 dark:text-primary-800">{citySelected?.total_score?.toFixed(1)}</p>               
                    <div className="flex items-center ml-4">
                    <svg aria-hidden="true" className={`w-5 h-5 ${citySelected?.total_score >= 1 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" className={`w-5 h-5 ${citySelected?.total_score >= 2 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" className={`w-5 h-5 ${citySelected?.total_score >= 3 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" className={`w-5 h-5 ${citySelected?.total_score >= 4 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    <svg aria-hidden="true" className={`w-5 h-5 ${citySelected?.total_score >= 5 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    </div>
                </div>
                <div>
                    <dl className="mb-8">
                        <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-700 dark:text-gray-400">Internet</dt>
                            <TextP classes="mt-0">{citySelected?.internet_speed.toFixed(1)} mbps avg</TextP>
                        </div>
                        <dd className="flex items-center mb-3">
                            <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                                <div className={`h-2.5 rounded ${citySelected?.internet_score > 4 ? 'bg-green-500' : citySelected?.internet_score > 3 ? 'bg-yellow-300' : 'bg-red-500'}`} style={{ width: `${citySelected?.internet_score * 20}%` }}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-400">{(citySelected?.internet_score * 20)?.toFixed(1)}</span>
                        </dd>
                    </dl>
                    <dl className="mb-8">
                        <dt className="text-sm font-medium text-gray-700 dark:text-gray-400">Leisure</dt>
                        <dd className="flex items-center mb-3">
                            <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                                <div className={`h-2.5 rounded ${citySelected?.leisure_quality > 4 ? 'bg-green-500' : citySelected?.leisure_quality > 3 ? 'bg-yellow-300' : 'bg-red-500'}`} style={{ width: `${citySelected?.leisure_quality * 20}%` }}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-400">{(citySelected?.leisure_quality * 20)?.toFixed(1)}</span>
                        </dd>
                    </dl>
                    <dl className="mb-8">
                        <dt className="text-sm font-medium text-gray-700 dark:text-gray-400">Cost</dt>
                        <dd className="flex items-center mb-3">
                            <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                                <div className={`h-2.5 rounded ${citySelected?.cost_score > 4 ? 'bg-green-500' : citySelected?.cost_score > 3 ? 'bg-yellow-300' : 'bg-red-500'}`} style={{ width: `${citySelected?.cost_score * 20}%` }}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-400">{(citySelected?.cost_score * 20)?.toFixed(1)}</span>
                        </dd>
                    </dl>
                </div>
                <div>
                <dl className="mb-8">
                    <dt className="text-sm font-medium text-gray-700 dark:text-gray-400">Safety</dt>
                    <dd className="flex items-center mb-3">
                        <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                            <div className={`h-2.5 rounded ${citySelected?.safety_level > 4 ? 'bg-green-500' : citySelected?.safety_level > 3 ? 'bg-yellow-300' : 'bg-red-500'}`} style={{ width: `${citySelected?.safety_level * 20}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-400">{(citySelected?.safety_level * 20)?.toFixed(1)}</span>
                    </dd>
                </dl>
                <dl className="mb-8">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Air Quality</dt>
                    <dd className="flex items-center">
                        <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 mr-2">
                            <div className={`h-2.5 rounded ${citySelected?.air_quality_score > 4 ? 'bg-green-500' : citySelected?.air_quality_score > 3 ? 'bg-yellow-300' : 'bg-red-500'}`} style={{ width: `${citySelected?.air_quality_score * 20}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{(citySelected?.air_quality_score * 20)?.toFixed(1)}</span>
                    </dd>
                </dl>
                </div>
            </div>
        </>
    )
}