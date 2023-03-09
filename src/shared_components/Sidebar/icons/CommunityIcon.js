export default function CommunityIcon(clickable) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 w-6 h-6 transition duration-75 ${clickable ? "text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white" : "text-gray-500 dark:text-gray-400"}`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
    )
}