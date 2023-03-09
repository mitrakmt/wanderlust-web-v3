import { useState } from "react";

const InfoIcon = ({ openInfoModal }) => {
    const [iconHovered, setIconHovered] = useState(false);

    return (
        <div className={`mx-2 flex items-center justify-center w-12 h-12 transition-all bg-gray-200 rounded-full cursor-pointer dark:bg-gray-700/80`}>
            <a className="" onClick={openInfoModal}>
                <div className="flex items-center justify-center w-12 h-12 transition-all bg-gray-200 rounded-full cursor-pointer dark:bg-gray-700/80 hover:scale-110">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={28}
                    height={28}
                    viewBox="0 0 24 24"
                    onMouseEnter={() => setIconHovered(true)}
                    onMouseLeave={() => setIconHovered(false)}
                    fill={iconHovered ? "#b1b1b1" : "none"}
                    stroke={iconHovered ? "#b1b1b1" : "#c3c2c7"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                </div>
            </a>
        </div>
    )
}

export default InfoIcon;
