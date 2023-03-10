import { useAuth } from '../../../hooks/useAuth';

export default function MapIcon(clickable) {
    const { user } = useAuth();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" strokeWidth="1.5" stroke="currentColor" className={`flex-shrink-0 w-6 h-6 transition duration-75 ${user?.premium ? "cursor-pointer text-gray-600 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-600 transition-colors" : "text-gray-400 dark:text-gray-400"}`}>
            <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
        </svg>
    )
}