import { useState } from "react";

const ShareIcon = ({ style, attribution, city, country, countryInfo }) => {
    const [iconHovered, setIconHovered] = useState(false);

    const openTwitterShare = () => {
        window.open(`https://twitter.com/intent/tweet?hashtags=${city},${country},wanderlust&text=${countryInfo.emoji} ${city}, ${country}%0a📷 @wanderlustext ${attribution?.originalImageLink}%0a`, '_blank')
    }

    return (
        <div className={`mx-2 flex items-center justify-center w-12 h-12 transition-all bg-gray-200 rounded-full cursor-pointer dark:bg-gray-700/80`}>
            <a className="" onClick={openTwitterShare}>
                <div className="flex items-center justify-center w-12 h-12 transition-all bg-gray-200 rounded-full cursor-pointer dark:bg-gray-700/80 hover:scale-110">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={style?.width || 24}
                    height={style?.height || 24}
                    viewBox="0 0 24 24"
                    onMouseEnter={() => setIconHovered(true)}
                    onMouseLeave={() => setIconHovered(false)}
                    fill={iconHovered ? "#b1b1b1" : "none"}
                    stroke={iconHovered ? "#b1b1b1" : "#c3c2c7"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                </div>
            </a>
        </div>
    )
}

export default ShareIcon;
