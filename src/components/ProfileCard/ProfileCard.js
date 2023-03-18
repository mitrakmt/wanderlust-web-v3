import { useEffect, useState } from "react"
import Image from 'next/image';
import Link from 'next/link';

export default function ProfileCard({ user, currentUserId, followUser, removeFollow, follows, viewUserProfile }) {
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if (follows.includes(user._id)) {
            setIsFollowed(true);
        } else {
            setIsFollowed(false);
        }
    }, [follows]);

    return (
        <div className="relative flex flex-col items-center justify-center w-full px-0 md:px-4 py-6 bg-white border border-gray-200 rounded-lg shadow-md h-80 lg:w-70 xl:w-74 dark:bg-gray-800 dark:border-gray-700">
            {
                user.profile_image ?
                    <Image className="relative w-24 h-24 md:w-26 md:h-26 xl:w-30 xl:h-30 mt-8 mb-3 rounded-full shadow-lg" quality={80} width={50} height={30} src={user.profile_image} alt={user.name} />
                    : <svg className="relative w-32 h-32 mt-8 mb-3 rounded-full shadow-lg tex-gray-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
            }
            <div className="absolute flex flex-col items-center justify-center top-4 left-4">
                <span className="font-semibold text-gray-900 dark:text-white">{user?.countries_visited?.length}</span>
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">Countries</div>
            </div>
            {
                user?.followers >= 0 ? <div className="absolute flex flex-col items-center justify-center top-4 right-4">
                    <span className="font-semibold text-gray-900 dark:text-white">{user?.followers}</span> 
                    <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">Followers</div>
                </div> : <></>
            }
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.username}</h5>
            <span className="text-sm text-center text-gray-500 dark:text-gray-400">{user.job || ""}</span>
            <div className="flex space-x-3 mt-auto">
                {
                    user._id === currentUserId ?
                        <></> :
                        isFollowed ? 
                            <a onClick={() => removeFollow(user._id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary-900 rounded-lg cursor-pointer hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-900 dark:hover:bg-red-700 dark:focus:ring-primary-800">Following</a> :
                            <a onClick={() => followUser(user._id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary-500 rounded-lg cursor-pointer hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Follow</a>
                }
                <Link
                    href={`/profile/${encodeURIComponent(user.username)}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                >
                    View
                </Link>
            </div>
        </div>
    )
}