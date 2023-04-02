import { useState } from 'react';

export default function AddSectionButton({ index, addSectionParagraph, addSectionHeading, addImage, addCityEmbed, addCountryEmbed, addBlogEmbed, addUserEmbed, addLinkEmbed }) {
    const [showAddSectionDropdown, setShowAddSectionDropdown] = useState(false);

    return (
        <div className="relative">
            <button onMouseEnter={() => setShowAddSectionDropdown(true)} onMouseLeave={() => setShowAddSectionDropdown(false)} className="w-40 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Add Section</button>
            {
                showAddSectionDropdown && (
                    <div onMouseEnter={() => setShowAddSectionDropdown(true)} onMouseLeave={() => setShowAddSectionDropdown(false)} className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                            <li>
                                <a onClick={() => addSectionParagraph(index)} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Paragraph</a>
                            </li>
                            <li>
                                <a onClick={() => addSectionHeading('h2', index)} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Heading 2</a>
                            </li>
                            <li>
                                <a onClick={() => addSectionHeading('h3', index)} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Heading 3</a>
                            </li>
                            <li>
                                <a onClick={() => addSectionHeading('h4', index)} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Heading 4</a>
                            </li>
                            <li>
                                <a onClick={() => addSectionHeading('h5', index)} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Heading 5</a>
                            </li>
                            <li>
                                <a onClick={() => addImage(index)} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Image</a>
                            </li>
                            <li>
                                <a onClick={() => addCityEmbed(index)} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">City</a>
                            </li>
                            <li>
                                <a onClick={() => addCountryEmbed(index)} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Country</a>
                            </li>
                            <li>
                                <a onClick={() => addBlogEmbed(index)} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Blog</a>
                            </li>
                            <li>
                                <a onClick={() => addUserEmbed(index)} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">User</a>
                            </li>
                            <li>
                                <a onClick={() => addLinkEmbed(index)} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Link</a>
                            </li>
                            {/* <li>
                                <a onClick={addPlaceEmbed} className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Place</a>
                            </li> */}
                        </ul>
                    </div>
                )
            }
        </div>
    )
}
