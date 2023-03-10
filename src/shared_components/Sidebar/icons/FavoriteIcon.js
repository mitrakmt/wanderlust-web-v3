import { useAuth } from '../../../hooks/useAuth';

export default function FavoritesIcon() {
    const { user } = useAuth();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" strokeWidth="1.5" stroke="currentColor" className={`flex-shrink-0 w-6 h-6 transition duration-75 ${user ? "cursor-pointer text-gray-600 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-600 transition-colors" : "text-gray-400 dark:text-gray-400"}`}>
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
    )
}