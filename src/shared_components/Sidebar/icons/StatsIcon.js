import { useAuth } from '../../../hooks/useAuth';

export default function StatsIcon() {
    const { user } = useAuth();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={`flex-shrink-0 w-5 h-5 transition duration-75 ${(user?.role === 'publisher' || user?.role === 'superadmin') ? "cursor-pointer text-gray-600 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-600 transition-colors" : "hidden"}`}>
            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
        </svg>
    )
}