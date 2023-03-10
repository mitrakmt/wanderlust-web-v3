import { useAuth } from '../../../hooks/useAuth';

export default function NomadIcon() {
    const { user } = useAuth();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`flex-shrink-0 w-6 h-6 transition duration-75 ${user?.premium ? "cursor-pointer text-gray-600 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-600 transition-colors" : "text-gray-400 dark:text-gray-400"}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
    )
}