import { useEffect, useState } from 'react';
import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
import CustomHead from '../shared_components/CustomHead';

// Utils
import request from '../utils/request';

// Hooks
import { useAuth } from '../hooks/useAuth';

export default function Stats() {
    const [blogs, setBlogs] = useState([])
    
    // hooks
    const { user } = useAuth();

    // UseEffects
    useEffect(() => {
        async function fetchData() {
            const newBlogs = await request(`/stats/blog/user/${user.username}`)
            setBlogs(newBlogs?.data)
        }
        if (user) {
            fetchData();
        }
    }, [user])

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <CustomHead
                title="Meet the Wanderlust App Team | Our Digital Nomads and Travel Experts"
                description="Get to know the Wanderlust App team behind the scenes - a group of passionate digital nomads and travel experts who are dedicated to helping you find and explore the best places around the world. Learn about their backgrounds, expertise, and unique perspectives that shape the vision and mission of Wanderlust App."
                url="https://www.wanderlustapp.io/team"
                image="https://uploads-ssl.webflow.com/62893f6b6c73c80d757c8d0d/629378f07e3c95055ebae0ca_Screen%20Shot%202022-05-29%20at%204.38.07%20PM%20(1).jpg"
                alt="Wanderlust App Team"
            />
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Publisher Stats</h2>
                </div>
                <div className="flex items-center justify-center">
                    <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{ blogs.length }</dt>
                            <dd className="font-light text-gray-500 dark:text-gray-400">Num. of Posts</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{blogs.reduce((acc, curr) => acc + curr.views, 0)}</dt>
                            <dd className="font-light text-gray-500 dark:text-gray-400">Total Views</dd>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{(blogs.reduce((acc, curr) => acc + (curr.timeRead || 0), 0) / 60).toFixed(1)}</dt>
                            <dd className="font-light text-gray-500 dark:text-gray-400">Total Time Read (mins)</dd>
                        </div>
                    </dl>
                </div>
                {/* List each blog and show stats on right side */}
                <div className="relative overflow-x-auto mt-8">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-xs">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs">
                                    Views
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs">
                                    Time Read (mins)
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs">
                                    Published On
                                </th>
                                <th scope="col" className="px-6 py-3 text-xs">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                blogs?.map(blog => (
                                    <tr key={`statsBlog-${blog.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white hover:text-primary-600 dark:hover:text-primary-600 transition-colors">
                                            <Link href={`/blog/${blog.slug}`}>
                                                {blog.title}
                                            </Link>
                                        </th>
                                        <td className="px-6 py-4 text-xs">
                                            {blog.views}
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            {((blog.timeRead / 60) || 0).toFixed(1)}
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            {blog.category}
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            {blog.publishedOn}
                                        </td>
                                        <td className="px-6 py-4 text-xs">
                                            <Link href={`/blog/edit/${blog.id}`}>
                                                <button>Edit</button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>


            </div>
        </section>
    )
}