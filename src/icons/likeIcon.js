import { useState } from "react";

const LikeSvg = ({ toggleFavorite, currentImageFavoriteStatus, noBackground }) => {
    const [iconHovered, setIconHovered] = useState(false);

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
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </a>
        </div>
    )
}

export default LikeSvg;
