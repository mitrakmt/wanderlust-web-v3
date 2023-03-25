import { useState } from 'react';
import Image from 'next/image';

// Utils
import request from '../../utils/request';

// Components
import CustomHead from '@/shared_components/CustomHead';

export default function WriteBlog() {
    // State
    const [showAddSectionDropdown, setShowAddSectionDropdown] = useState(false);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [region, setRegion] = useState(null);
    const [country, setCountry] = useState(null);
    const [city, setCity] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [content, setContent] = useState([]);
    
    // Functions
    const publishBlogPost = () => {
        // CHECK FOR ALL VALID VALUES

        // Send to API
        request({
            url: '/blog/create',
            method: 'POST',
            body: {
                title: 'test',
                content: 'test',
                category: 'test',
                tags: 'test',
                image: 'test',
                    
            }
        })

        console.log('publishBlogPost');
    };

    const addSectionParagraph = () => {
        setContent([...content, { type: 'p', text: '' }]);
    };

    const addSectionHeading = (headingType) => {
        setContent([...content, { type: headingType, text: '' }]);
    };

    const addImage = () => {
        setContent([...content, { type: 'image', src: '' }]);
    };

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <CustomHead
                title="Write a Guide - Wanderlust App"
                description="Get travel inspiration and tips from Wanderlust App Blogs. Our blog section features articles on a wide range of travel-related topics, including destination guides, travel tips, and cultural experiences. Read our expert advice and stay up-to-date on the latest travel trends. Let Wanderlust App Blogs inspire you to explore new destinations and make the most of your travels."
                url="https://www.wanderlustapp.io/blog/create"
                image="/cityDetailsDark1.png"
                alt="Cities - Wanderlust App"
            />

            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Write a Guide</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Teach about the best places around the world, the most beautiful places to see, and everything you'd want to see as a nomad.</p>
                </div> 
                <div className="mx-auto lg:px-12 w-full mb-4">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Guide</h2>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Title</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Blog name" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Slug</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Blog slug" />
                            {/* Note that this is very important for SEO */}
                            <p className="text-xs text-gray-600 italic mt-1">
                                This slug has an impact on SEO. It should use words relevant to the guide, use keywords, use "-" for spaces, and should not be greater than 140 characters in length.
                            </p>
                            
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option defaultValue="">Select category</option>
                                <option value="Travel Guide">Travel Guide</option>
                                <option value="Digital Nomad">Digital Nomad</option>
                                <option value="Cost of Living">Cost of Living</option>
                                <option value="Best of">Best of</option>
                                <option value="Top 5">Top 5</option>
                                
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Region</label>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option defaultValue="">Select region</option>
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option defaultValue="">Select country</option>
                                <option value="TV">TV/Monitors</option>
                                <option value="PC">PC</option>
                                <option value="GA">Gaming/Console</option>
                                <option value="PH">Phones</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" />
                        </div> 
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">summary</label>
                            <textarea rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Summary for the guide"></textarea>
                        </div>
                    </div>
                    <div className="my-8 p-4 gap-y-2 block w-full text-gray-900 border border-gray-200 shadow-sm sm:text-sm dark:bg-gray-900 dark:border-gray-600 dark:text-white block-canvas rounded-lg">
                        <div className="flex justify-between items-center">
                            <p className="text-xl font-bold text-gray-900 dark:text-white">Body of Post</p>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Preview Blog</button>
                        </div>
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        {
                            content.length === 0 && (
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">No content added yet</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Add content to your blog post by clicking the button below</p>
                                </div>
                            )
                        }
                        {
                            content.map((section, index) => {
                                switch (section.type) {
                                    case 'p':
                                        return (
                                            <div className="sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Paragraph</label>
                                                <textarea rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Paragraph"></textarea>
                                            </div>
                                        )
                                    case "h2":
                                        return (
                                            <div className="sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Heading 2</label>
                                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Heading" />
                                            </div>
                                        )
                                    case "h3":
                                        return (
                                            <div className="sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Heading 3</label>
                                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Heading" />
                                            </div>
                                        )
                                    case "h4":
                                        return (
                                            <div className="sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Heading 4</label>
                                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Heading" />
                                            </div>
                                        )
                                    case 'h5':
                                        return (
                                            <div className="sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Heading 5</label>
                                                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Heading" />
                                            </div>
                                        )
                                    case 'image':
                                        return (
                                            <div className="sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                                                <Image className="h-40 object-cover max-w-full rounded-lg" width={200} height={100} src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/image_default.jpeg" alt="image default" />
                                                <input type="text" className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Image Alt Text" />
                                            </div>
                                        )
                                }
                            })
                        }
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <div className="relative">
                            <button onMouseEnter={() => setShowAddSectionDropdown(true)} onMouseLeave={() => setShowAddSectionDropdown(false)} className="w-40 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Add Section</button>
                            {
                                showAddSectionDropdown && (
                                    <div onMouseEnter={() => setShowAddSectionDropdown(true)} onMouseLeave={() => setShowAddSectionDropdown(false)} className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                                            <li>
                                                <a onClick={addSectionParagraph} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Paragraph</a>
                                            </li>
                                            <li>
                                                <a onClick={() => addSectionHeading('h2')} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Heading 2</a>
                                            </li>
                                            <li>
                                                <a onClick={() => addSectionHeading('h3')} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Heading 3</a>
                                            </li>
                                            <li>
                                                <a onClick={() => addSectionHeading('h4')} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Heading 4</a>
                                            </li>
                                            <li>
                                                <a onClick={() => addSectionHeading('h5')} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Heading 5</a>
                                            </li>
                                            <li>
                                                <a onClick={addImage} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Image</a>
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">City Bar</a>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <button type="submit" onClick={publishBlogPost} className="inline-flex items-center px-5 py-2.5 mt-6 sm:mt-20 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Publish Post
                    </button>
                </div>
            </div>
        </section>
    )
}