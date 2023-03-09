import { useEffect, useState } from "react"
import Image from 'next/image'

export default function ProfileCard({ user, currentUserId, followUser, removeFollow, follows, viewUserProfile }) {
    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        if (follows.find(followUserId => followUserId === user.id)) {
            setIsFollowed(true);
        } else {
            setIsFollowed(false);
        }
    }, [follows])

    const selectUserProfile = () => {
        viewUserProfile(user.username)
    }

    return (
        <div className="relative flex flex-col items-center justify-center w-full px-0 md:px-4 py-6 m-0 mb-4 md:mb-0 md:m-6 bg-white border border-gray-200 rounded-lg shadow-md h-80 xl:w-80 dark:bg-gray-800 dark:border-gray-700">
            {
                user.profile_image ?
                    <Image className="relative w-24 h-24 mb-3 rounded-full shadow-lg" width={50} height={30} src={user.profile_image} alt={user.name} /> :
                    <svg className="w-32 h-32 tex-gra-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>

            }
            <div className="absolute flex flex-col items-center justify-center top-4 left-4">
                <span className="font-semibold text-gray-900 dark:text-white">{user?.countries_visited?.length}</span> 
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">Countries</div>
            </div>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.username}</h5>
            <span className="text-sm text-center text-gray-500 dark:text-gray-400">{user.job}</span>
            <span className="text-sm text-center text-gray-500 dark:text-gray-400">{user.bio}</span>
            <div className="flex mt-4 space-x-3 md:mt-6">
                {
                    user.id === currentUserId ?
                        <></> :
                        isFollowed ? 
                            <a onClick={() => removeFollow(user.id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-blue-800">Following</a> :
                            <a onClick={() => followUser(user.id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Follow</a>
                }
                <a onClick={selectUserProfile} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">View</a>
            </div>
        </div>
    )
}