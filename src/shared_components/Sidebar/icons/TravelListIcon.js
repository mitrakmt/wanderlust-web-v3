export default function TravelListIcon(clickable) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`flex-shrink-0 w-6 h-6 transition duration-75 ${clickable ? "text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white" : "text-gray-500 dark:text-gray-400"}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
    )
}