import { useEffect, useState } from 'react';
import request from '../../utils/request';
import moment from 'moment';
import Link from 'next/link';

export default function Blogs() {
    const [recommendedBlogs, setRecommendedBlogs] = useState([]);

    useEffect(() => {
        // Get suggested blogs
        request('/blog/recommendations', {
            method: 'GET'
        }).then(res => {
            setRecommendedBlogs(res?.data || []);
        })
    }, [])

    return (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Blogs you might like</h5>
            </div>
            <div>
                {
                    recommendedBlogs.map(blog => (
                        <article key={`recommendedBlogs-${blog.title}`} className="p-4 mb-4 bg-gray-100 rounded-lg border border-gray-200 shadow-md dark:bg-gray-700 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-5 text-gray-500">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                    <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                                    Article
                                </span>
                                <span className="text-sm">{moment(blog.createdAt).fromNow()}</span>
                            </div>
                            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><Link href={`/blog/${blog.slug}`}>{blog.title}</Link></h2>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{blog.summary}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <img className="w-7 h-7 rounded-full" src={blog.author[0].profile_image} alt={`${blog.author[0].name} Profile image`} />
                                    <span className="font-medium dark:text-white">
                                        {blog.author[0].name}
                                    </span>
                                </div>
                                <Link href={`/blog/${blog.slug}`} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Read more
                                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </Link>
                            </div>
                        </article> 
                    ))
                }
            </div>
        </div>
    )
}