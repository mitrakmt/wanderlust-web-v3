import { useState } from "react";

const LikeSvg = ({ toggleFavorite, currentImageFavoriteStatus, noBackground, forHomePage }) => {
    const [iconHovered, setIconHovered] = useState(false);

    if (forHomePage) {
        return (
            <button type="button" onClick={toggleFavorite} data-tooltip-placement="left" className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 dark:hover:text-white shadow-sm dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600">
                <svg aria-hidden="true" fill={currentImageFavoriteStatus ? "rgb(165, 0, 0)" : iconHovered ? "#b91c1b" : "#b4b3b8"} className="w-5 h-5 mr-1 overflow-visible" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span className="sr-only">Like</span>
            </button>
        )
    } else {
        return (
            <div className={`flex items-center justify-center w-12 h-12 transition-all ${noBackground ? "" : "bg-gray-200 mx-2 dark:bg-gray-700/80"} rounded-full cursor-pointer`}>
                <a onClick={toggleFavorite}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        className="overflow-visible"
                        onMouseEnter={() => setIconHovered(true)}
                        onMouseLeave={() => setIconHovered(false)}
                        fill={currentImageFavoriteStatus ? "rgb(165, 0, 0)" : iconHovered ? "#b91c1b" : "none"}
                        stroke={currentImageFavoriteStatus ? "rgb(165, 0, 0)" : iconHovered ? "#b91c1b" : "#b4b3b8"}
                        strokeWidth="2"
                        style={{ zIndex: 100 }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </a>
            </div>
        )
    }
}

export default LikeSvg;
