/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import dynamic from 'next/dynamic';
import { Parser } from 'htmlparser2';
import { DomHandler } from 'domhandler';
import { decode } from 'html-entities';


// Hooks
import { useAuth } from '../hooks/useAuth';

// Context
import { countriesContext } from '../context/CountriesProvider';

// Utils
import request from '../utils/request';

// Components
import CustomHead from '@/shared_components/CustomHead';
import AddSectionButton from './components/AddSectionButton';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
    [{ 'header': '1' }, { 'header': '2' }, { 'header': [3, 4, 5, 6] }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']  // remove formatting button
];

const modules = {
    toolbar: toolbarOptions
};

export default function CreateBlogPage({ editing = false, blogId = null }) {
    // Context
    const [countries, ] = useContext(countriesContext);

    // Hooks
    const { user } = useAuth();
    const router = useRouter();

    // State
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState("");
    const [summary, setSummary] = useState("");
    const [region, setRegion] = useState(null);
    const [country, setCountry] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [content, setContent] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [blogOwnerId, setBlogOwnerId] = useState(null);
    const [city, setCity] = useState(null);
    const [cityInputValue, setCityInputValue] = useState('');
    const [searchCitiesSearchTerm, setSearchCitiesSearchTerm] = useState('');
    const [citiesSearch, setCitiesSearch] = useState([]);
    const [searchCitiesLoading, setSearchCitiesLoading] = useState(false);
    const [showCitySearchDropdown, setShowCitySearchDropdown] = useState(false);
    const [imagePreview, setImagePreview] = useState(''); 

    // UseEffect
    useEffect(() => {
        if (editing && blogId) {
            // Fetch blog information
            request('/blog/id/' + blogId)
                .then(blogInfo => {
                    console.log('blogInfo.data', blogInfo.data)
                    setBlogOwnerId(blogInfo.data.author.id)
                    setContent(convertJsonToHtml(blogInfo.data.content)); // Ensure content is not undefined
                    setTitle(blogInfo.data.title || '');
                    setSlug(blogInfo.data.slug || '');
                    setCategory(blogInfo.data.category || '');
                    setSummary(blogInfo.data.summary || '');
                    setRegion(blogInfo.data.region || null);
                    setCountry(blogInfo.data?.country?.id || null);
                    setCity(blogInfo.data.city?.id || null);
                    setMainImage(blogInfo.data?.image_url || '');
                    setImagePreview(blogInfo.data?.image_url || '')
                    setCityInputValue(blogInfo.data.city?.name || ''); // Set the city name

                })
                .catch(error => {
                    console.error("Error fetching blog information: ", error);
                    setErrorMessage("Error fetching blog information");
                });
        }
    }, [blogId]);

    useEffect(() => {
        // Check if user is owner of blog
        if (blogOwnerId && user.id !== blogOwnerId) {
            // TODO: send back to stats page?
            router.push('/stats')
        }
    }, [user, blogOwnerId]);

    useEffect(() => {
        if (searchCitiesSearchTerm) {
            const delayDebounceFn = setTimeout(() => {
                searchCities(searchCitiesSearchTerm);
            }, 300);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setCitiesSearch([]);
            setShowCitySearchDropdown(false);
        }
    }, [searchCitiesSearchTerm]);

    // Functions
    
    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Update preview
            try {
                const res = await getUploadUrl(file);
                await uploadToS3(res.url, file);
                setMainImage(res.publicUrl); // Set the public URL of the uploaded image
            } catch (error) {
                console.error('Error uploading image: ', error);
            }
        }
    };

    const toDashCase = (str) => {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
            .replace(/^-+|-+$/g, '');    // Remove leading and trailing dashes
    };

    const getUploadUrl = async (file) => {
        const uploadUrls = await request(`/aws/s3-upload-url?fileName=${file.name}&fileType=${file.type}`, {
            method: 'GET'
        })

        return uploadUrls;
    };

    const uploadToS3 = async (url, file) => {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type,
                },
                body: file,
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response from S3:', errorText);
                throw new Error('Network response was not ok: ' + response.statusText);
            }
    
            const body = await response.text();
            return body;
        } catch (error) {
            console.error('Error during upload:', error);
            throw error;
        }
    };

    const removeImage = () => {
        setMainImage(null);
        setImagePreview('');
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleCitySelect = (city) => {
        setCity(city);
        setCityInputValue(city.name);
        setShowCitySearchDropdown(false);
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(toDashCase(newTitle));
    };

    const handleContentChange = (value) => {
        setContent(value);
    };

    const convertHtmlToStructuredData = (html) => {
        const handler = new DomHandler((error, dom) => {
            if (error) {
                throw new Error(error);
            }
        });

        const parser = new Parser(handler, { decodeEntities: true });
        parser.write(html);
        parser.end();

        const structuredData = [];

        const extractText = (element) => {
            return element.children
                .map(child => {
                    if (child.type === 'text') {
                        return decode(child.data);
                    } else if (child.type === 'tag') {
                        if (child.name === 'strong') {
                            return `<strong>${extractText(child)}</strong>`;
                        }
                        return extractText(child);
                    }
                    return '';
                })
                .join('');
        };

        const traverseNodes = (nodes) => {
            nodes.forEach(node => {
                if (node.type === 'tag') {
                    const tagName = node.name;
                    const textContent = extractText(node);

                    switch (tagName) {
                        case 'p':
                            structuredData.push({ type: 'p', text: textContent });
                            break;
                        case 'h1':
                            structuredData.push({ type: 'h1', text: textContent });
                            break;
                        case 'h2':
                            structuredData.push({ type: 'h2', text: textContent });
                            break;
                        case 'h3':
                            structuredData.push({ type: 'h3', text: textContent });
                            break;
                        case 'h4':
                            structuredData.push({ type: 'h4', text: textContent });
                            break;
                        case 'h5':
                            structuredData.push({ type: 'h5', text: textContent });
                            break;
                        case 'h6':
                            structuredData.push({ type: 'h6', text: textContent });
                            break;
                        case 'ul':
                            const ulItems = [];
                            node.children.forEach(child => {
                                if (child.name === 'li') {
                                    ulItems.push({ type: 'li', text: extractText(child) });
                                }
                            });
                            structuredData.push({ type: 'ul', items: ulItems });
                            break;
                        case 'ol':
                            const olItems = [];
                            node.children.forEach(child => {
                                if (child.name === "li") {
                                    olItems.push({ type: "li", text: extractText(child) });
                                    }
                                    });
                                    structuredData.push({ type: "ol", items: olItems });
                                    break;
                                    default:
                                    break;
                                    }
                                    }
                                    });
                                    };traverseNodes(handler.dom);
                                    return structuredData;
                                };
                                

    const convertJsonToReact = (structuredData) => {
        return structuredData.map((block, index) => {
            switch (block.type) {
                case 'p':
                    return <p key={index}>{block.text}</p>;
                case 'h1':
                    return <h1 key={index}>{block.text}</h1>;
                case 'h2':
                    return <h2 key={index}>{block.text}</h2>;
                case 'h3':
                    return <h3 key={index}>{block.text}</h3>;
                case 'h4':
                    return <h4 key={index}>{block.text}</h4>;
                case 'h5':
                    return <h5 key={index}>{block.text}</h5>;
                case 'h6':
                    return <h6 key={index}>{block.text}</h6>;
                case 'ul':
                    return (
                        <ul key={index}>
                            {block.items.map((item, liIndex) => (
                                <li key={liIndex}>{item.text}</li>
                            ))}
                        </ul>
                    );
                case 'ol':
                    return (
                        <ol key={index}>
                            {block.items.map((item, liIndex) => (
                                <li key={liIndex}>{item.text}</li>
                            ))}
                        </ol>
                    );
                case 'a':
                    return (
                        <a key={index} href={block.href}>
                            {block.text}
                        </a>
                    );
                case 'img':
                    return (
                        <Image
                            key={index}
                            src={block.src}
                            alt={block.alt}
                            layout="responsive" // or other layout options
                            width={500} // set appropriate width
                            height={300} // set appropriate height
                        />
                    );
                default:
                    return null;
            }
        });
    };

    const convertJsonToHtml = (structuredData) => {
        return structuredData.map(block => {
            switch (block.type) {
                case 'p':
                    return `<p>${block.text}</p>`;
                case 'h1':
                    return `<h1>${block.text}</h1>`;
                case 'h2':
                    return `<h2>${block.text}</h2>`;
                case 'h3':
                    return `<h3>${block.text}</h3>`;
                case 'h4':
                    return `<h4>${block.text}</h4>`;
                case 'h5':
                    return `<h5>${block.text}</h5>`;
                case 'h6':
                    return `<h6>${block.text}</h6>`;
                case 'ul':
                    return `<ul>${block.items.map(item => `<li>${item.text}</li>`).join('')}</ul>`;
                case 'ol':
                    return `<ol>${block.items.map(item => `<li>${item.text}</li>`).join('')}</ol>`;
                case 'a':
                    return `<a href="${block.href}">${block.text}</a>`;
                case 'img':
                    return `<img src="${block.src}" alt="${block.alt}" />`;
                default:
                    return '';
            }
        }).join('');
    };
    
    const publishBlogPost = () => {
        if (!title || !slug || !category || !summary || !content) {
            setErrorMessage("Please fill out all fields: title, slug, category, summary, mainImage, content");
            return;
        }
    
        console.log('mainImage', mainImage);
    
        // make sure slug has no spaces 
        if (/\s/g.test(slug)) {
            setErrorMessage("Slug may not contain spaces");
            return;
        }
    
        setErrorMessage(null);
    
        const structuredData = convertHtmlToStructuredData(content);
    
        let body = {
            title: title.trim(),
            category,
            summary: summary.trim(),
            slug: slug.trim(),
            region,
            content: structuredData,
            country,
            city: city?.id,
            image_url: mainImage || imagePreview,
        };
    
        if (!editing) {
            body.publishedOn = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
    
        // Send to API
        request(editing ? `/blog/id/${blogId}` : '/blog', {
            method: editing ? 'PUT' : 'POST',
            body
        })
        .then((res) => {
            if (res.data) {
                // Clear states
                setTitle("");
                setSlug("");
                setCategory("");
                setSummary("");
                setRegion(null);
                setCountry(null);
                setCity(null);
                setMainImage(null);
                setContent('');
    
                router.push('/stats');
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        });
    };
    
    const searchCities = (searchTerm) => {
        setSearchCitiesLoading(true);
        request(`/cities/search?name=${searchTerm}`)
            .then(res => {
                setCitiesSearch(res.data);
                setSearchCitiesLoading(false);
                setShowCitySearchDropdown(true);
            })
            .catch(error => {
                setSearchCitiesLoading(false);
                console.error("Error fetching cities: ", error);
            });
    }

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <CustomHead
                title="Write a Guide - Wanderlust App"
                description="Get travel inspiration and tips from Wanderlust App Blogs. Our blog section features articles on a wide range of travel-related topics, including destination guides, travel tips, and cultural experiences."
                url="https://www.wanderlustapp.io/blog/create"
                image="/cityDetailsDark1.png"
                alt="Cities - Wanderlust App"
            />

            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Write a Guide</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Teach about the best places around the world, the most beautiful places to see, and everything you&apos;d want to see as a nomad.</p>
                </div> 
                <div className="mx-auto lg:px-12 w-full mb-4">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Guide</h2>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Title</label>
                            <input type="text" onChange={handleTitleChange} value={title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Blog name" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Slug</label>
                            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Blog slug" />
                            <p className="text-xs text-gray-600 italic mt-1">
                                This slug has an impact on SEO. It should use words relevant to the guide, use keywords, use &quot;-&quot; for spaces, and should not be greater than 140 characters in length. One example of a GOOD slug is: &quot;2023-digital-nomads-guide-to-bali&quot;
                            </p>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select onChange={(e) => setCategory(e.target.value)} value={category || "Select a Category"} className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
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
                            <select onChange={(e) => setRegion(e.target.value)} value={region || "Select a Region"}  className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option defaultValue="">Select region</option>
                                <option value="Africa">Africa</option>
                                <option value="Antarctica">Antarctica</option>
                                <option value="Asia">Asia</option>
                                <option value="Europe">Europe</option>
                                <option value="North America">North America</option>
                                <option value="Oceania">Oceania</option>
                                <option value="South America">South America</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <select onChange={(e) => setCountry(e.target.value)} value={country || "Select a country"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option defaultValue="">Select a Country</option>
                                {
                                    countries?.map(country => (
                                        <option key={`countriesSelect-${country.name}`} value={country.id}>{country.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="relative">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                            <input
                                type="text"
                                value={cityInputValue}
                                onChange={(e) => {
                                    setCity(null); // Reset selected city when typing
                                    setCityInputValue(e.target.value);
                                    setSearchCitiesSearchTerm(e.target.value);
                                }}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Search for a city..."
                            />
                            {showCitySearchDropdown && (
                                <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg max-h-60 overflow-y-auto">
                                    {searchCitiesLoading && <li className="p-2">Loading...</li>}
                                    {!searchCitiesLoading && citiesSearch.length === 0 && <li className="p-2">No cities found</li>}
                                    {!searchCitiesLoading && citiesSearch.map((city) => (
                                        <li
                                            key={city.id}
                                            className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:bg-gray-800 dark:text-white"
                                            onClick={() => handleCitySelect(city)}
                                        >
                                            {city.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Summary</label>
                            <textarea rows="8" value={summary} onChange={(e) => setSummary(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Summary for the guide"></textarea>
                        </div>
                    </div>
                    <div className="sm:col-span-2 my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Main Guide Image</label>
                        <div 
                            {...getRootProps({ className: 'h-40 object-cover max-w-full rounded-lg border-dashed border-2 border-gray-300 flex items-center justify-center' })}
                        >
                            <input {...getInputProps()} />
                            {imagePreview ? (
                                <div className="relative">
                                    <Image className="h-40 object-cover max-w-full rounded-lg" src={imagePreview} alt="Preview" width={600} height={160} />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-0 right-0 mt-2 mr-2 bg-red-600 text-white rounded-full p-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <p>Drag & Drop your image here, or click to select an image</p>
                            )}
                        </div>
                        <input 
                            type="text" 
                            value={mainImage || ""} 
                            onChange={(e) => setMainImage(e.target.value)} 
                            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                            placeholder="Or paste an image URL" 
                        />
                    </div>
                    <div className="my-8 p-4 gap-y-2 block w-full text-gray-900 border border-gray-200 shadow-sm sm:text-sm dark:bg-gray-900 dark:border-gray-600 dark:text-white block-canvas rounded-lg">
                        <div className="flex justify-between items-center">
                            <p className="text-xl font-bold text-gray-900 dark:text-white">Body of Post</p>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Preview Blog</button>
                        </div>
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <ReactQuill
                            value={content}
                            onChange={handleContentChange}
                            modules={modules}
                            formats={[
                                'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
                                'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'align', 'code-block'
                            ]}
                        />
                        {/* <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr> */}
                        {/* <AddSectionButton addSectionParagraph={() => {}} addSectionHeading={() => {}} addImage={() => {}} addCityEmbed={() => {}} addCountryEmbed={() => {}} addBlogEmbed={() => {}} addUserEmbed={() => {}} addLinkEmbed={() => {}} /> */}
                    </div>
                    {/* Ready to post blog? ask if they've thought about SEO, keywords */}
                    <div className="flex flex-col w-full mt-8 sm:mt-12">
                        <p className="text-xl text-gray-800 dark:text-gray-200">Ready to post your blog?</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Have you thought about SEO? Here are some things to keep in mind for SEO w/ blog posts:</p>
                        <ul className="list-decimal text-sm text-gray-500 dark:text-gray-400 px-4 py-2">
                            <li>Make sure every paragraph is readable, as Google algorithms use natural language processing to rank content.</li>
                            <li>Use relevant keywords: Incorporate relevant keywords that people would use when searching for information related to your blog topic. However, avoid keyword stuffing, which can negatively affect your rankings.</li>
                            <li>Use descriptive and meaningful headlines: Headlines are the first thing people see when browsing search results. Ensure that your headlines accurately describe what your article is about and incorporate keywords when possible.</li>
                            <li>Create high-quality content: Search engines prioritize high-quality, informative content that provides value to readers. Ensure that your blog article is well-researched, well-written, and provides helpful insights on your topic.</li>
                            <li>Use multimedia: Incorporating images, videos, and other multimedia into your blog post can increase engagement and improve your SEO. Be sure to include alt tags with your images and videos to provide additional context for search engines.</li>
                            <li>Share your content on social media: Sharing your blog post on social media platforms can increase visibility and drive traffic to your website. Additionally, social signals (likes, shares, comments, etc.) can indirectly impact your SEO.</li>
                        </ul>
                        <button type="submit" onClick={publishBlogPost} className="inline-flex items-center px-5 py-2.5 mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            {
                                editing ? "Save Post" : "Publish Post"
                            }
                        </button>
                        {
                            successMessage && (
                                <p className="text-sm text-green-500 mt-2">{successMessage}</p>
                            )
                        }
                        {
                            errorMessage && (
                                <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

