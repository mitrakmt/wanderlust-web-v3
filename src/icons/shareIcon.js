const ShareIcon = ({ attribution, city, country, countryInfo }) => {
    const openTwitterShare = () => {
        window.open(`https://twitter.com/intent/tweet?hashtags=${city},${country},wanderlust&text=${countryInfo.emoji} ${city}, ${country}%0a📷 @wanderlustext ${attribution?.originalImageLink}%0a`, '_blank')
    }

    return (
        <button type="button" onClick={openTwitterShare} data-tooltip-placement="left" className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600">
            <svg aria-hidden="true" className="w-5 h-5 overflow-visible mb-1 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
            <span className="sr-only">Share</span>
        </button>
    )
}

export default ShareIcon;
