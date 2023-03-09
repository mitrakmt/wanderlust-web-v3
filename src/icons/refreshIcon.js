import { useState } from "react";

const RefreshIcon = ({ refresh }) => {
    const [iconHovered, setIconHovered] = useState(false);

    return (
            <div className={`mx-2 flex items-center justify-center w-12 h-12 transition-all bg-gray-200 rounded-full cursor-pointer dark:bg-gray-700/80`}>
                <a className="" onClick={refresh}>
                  <div className="flex items-center justify-center w-12 h-12 transition-all bg-gray-200 rounded-full cursor-pointer dark:bg-gray-700/80 hover:scale-110">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        onMouseEnter={() => setIconHovered(true)}
                        onMouseLeave={() => setIconHovered(false)}
                        fill={iconHovered ? "#b1b1b1" : "none"}
                        stroke={iconHovered ? "#b1b1b1" : "#c3c2c7"}
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex items-center justify-center"
                    >
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                </a>
            </div>
    )
}

export default RefreshIcon;
