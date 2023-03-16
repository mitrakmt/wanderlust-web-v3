import { useEffect, useState } from 'react';
import request from '../../utils/request';
import Image from 'next/image';
import Link from 'next/link';

export default function FollowSuggestions({ follows, followUser, removeFollow }) {
    const [recommendedUsers, setRecommendedUsers] = useState([]);

    useEffect(() => {
        // Get suggested users
        request('/users/recommendations', {
            method: 'GET'
        }).then(res => {
            setRecommendedUsers(res?.data || []);
        })
    }, [])

    return (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">You might like</h5>
            </div>
            <div>
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {
                        recommendedUsers.map(user => (
                            <li className="py-2" key={`recommendedUsers-${user?.username}`}>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        {
                                            user?.profile_image ? (
                                                <Image className="w-8 h-8 rounded-full" src={user?.profile_image} height={80} width={80} quality={80} alt={`${user.username} Profile Image`} />
                                            ) : (
                                                <svg className="w-8 h-8 text-gray-300 rounded-full" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                                                    </svg>
                                            )
                                        }
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/profile/${user?.username}`} passHref>
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                {user?.name || user?.username}
                                            </p>
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {user?.job}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {
                                            // Follows is an array of objects with a _id property
                                            follows.includes(user._id) ? (
                                                <button onClick={() => removeFollow(user._id)} className="px-2 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-500 border border-transparent rounded-lg active:bg-gray-600 hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray">
                                                    Unfollow
                                                </button>
                                            ) : (
                                                <button onClick={() => followUser(user._id)} className="px-2 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-primary-500 border border-transparent rounded-lg active:bg-primary-600 hover:bg-primary-600 focus:outline-none focus:shadow-outline-primary">
                                                    Follow
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}