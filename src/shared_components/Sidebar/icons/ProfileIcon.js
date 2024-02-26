import { useAuth } from '../../../hooks/useAuth';

import Image from 'next/image';

export default function ProfileIcon() {
    const { user } = useAuth();

    if (user?.profile_image) {
        return (
            <Image src={user?.profile_image} alt={user?.name || user?.username} height={160} width={160} className="rounded-full" />
        )
    } else {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={`flex-shrink-0 w-5 h-5 transition duration-75 ${user ? "cursor-pointer text-gray-600 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-600 transition-colors" : "text-gray-400 dark:text-gray-400"}`}>
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
        )
    }
}
