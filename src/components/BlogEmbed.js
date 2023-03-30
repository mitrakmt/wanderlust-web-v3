/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router';

// Utils
import request from '../utils/request';

export default function BlogEmbed({ id }) {
    // State
    const [blog, setBlog] = useState({})

    // Hooks
    const router = useRouter();

    // UseEffects
    useEffect(() => {
        request(`/blog/id/${id}`)
            .then(response => {
                setBlog(response.data);
            })
    }, []);

    // Functions
    const navigateToProfile = () => {
        router.push(`/profile/${post.author?.username}`)
    }
    
    return (
        <article className="p-4 px-8 h-full flex flex-col justify-between bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col justify-between">
                <div className="flex justify-between items-center mb-0 text-gray-500">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                        {/* <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg> */}
                        {blog?.category?.toUpperCase()}
                    </span>
                    <span className="text-sm">{blog?.publishedOn}</span>
                </div>
                <h3 className="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ marginTop: '6px' }}>
                    <Link href={`/blog/${blog?.slug}`} className="w-full flex flex-col transition-colors text-gray-600 dark:text-gray-300 hover:text-primary-700 hover:dark:text-primary-700">{blog?.title}</Link>
                </h3>
                <p className="font-light text-gray-500 dark:text-gray-400">{blog?.summary}</p>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center space-x-4 cursor-pointer my-0" onClick={navigateToProfile}>
                    {
                        blog?.author?.profile_image && <Image className="w-12 h-12 relative rounded-full" style={{ margin: 0 }} src={blog?.author?.profile_image} alt={blog?.title} height={180} width={180} />
                    }
                    <span className="font-medium dark:text-white hover:text-red-700 transition-colors">
                        @{blog?.author?.username}
                    </span>
                </div>
                <Link href={`/blog/${blog?.slug}`} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                    Read the article
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Link>
            </div>
        </article> 
    )
}