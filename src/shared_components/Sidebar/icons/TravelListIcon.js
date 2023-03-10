import { useAuth } from '../../../hooks/useAuth';

export default function TravelListIcon() {
    const { user } = useAuth();
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`flex-shrink-0 w-6 h-6 transition duration-75 ${user?.premium ? "cursor-pointer text-gray-600 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-600 transition-colors" : "text-gray-400 dark:text-gray-400"}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
    )
}