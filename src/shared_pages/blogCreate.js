/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';

// Hooks
import { useAuth } from '../hooks/useAuth';

// Context
import { countriesContext } from '../context/CountriesProvider';

// Utils
import request from '../utils/request';

// Components
import CustomHead from '@/shared_components/CustomHead';
import MoveContentButtonsSection from '../pages/blog/components/moveContentButtonsSection';
import AddSectionButton from './components/AddSectionButton';

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
    const [content, setContent] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [blogOwnerId, setBlogOwnerId] = useState(null);
    const [city, setCity] = useState(null);
    const [cityInputValue, setCityInputValue] = useState('');
    const [searchCitiesSearchTerm, setSearchCitiesSearchTerm] = useState('');
    const [citiesSearch, setCitiesSearch] = useState([]);
    const [searchCitiesLoading, setSearchCitiesLoading] = useState(false);
    const [showCitySearchDropdown, setShowCitySearchDropdown] = useState(false);


    const [citySearchText, setCitySearchText] = useState("");
    const [countrySearchText, setCountrySearchText] = useState("");
    const [userSearchText, setUserSearchText] = useState("");
    const [placeSearchText, setPlaceSearchText] = useState("");
    const [blogSearchText, setBlogSearchText] = useState("");

    const [cities, setCities] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [places, setPlaces] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    const [showCities, setShowCities] = useState(false);
    const [showBlogs, setShowBlogs] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showPlaces, setShowPlaces] = useState(false);
    const [showCountries, setShowCountries] = useState(false);

    // UseEffect
    useEffect(() => {
        if (editing && blogId) {
            // Fetch blog information
            request('/blog/id/' + blogId)
                .then(blogInfo => {
                    setBlogOwnerId(blogInfo.data.author.id)
                    setContent(blogInfo.data.content);
                    setTitle(blogInfo.data.title);
                    setSlug(blogInfo.data.slug);
                    setCategory(blogInfo.data.category);
                    setSummary(blogInfo.data.summary);
                    setRegion(blogInfo.data.region);
                    setCountry(blogInfo.data?.country?.id);
                    setCity(blogInfo.data.city?.id);
                    setMainImage(blogInfo.data?.image_url);
                })
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
                const { url, publicUrl } = await getUploadUrl(file);
                await uploadToS3(url, file);
                setMainImage(publicUrl); // Set the public URL of the uploaded image
            } catch (error) {
                console.error('Error uploading image: ', error);
            }
        }
    };

    const getUploadUrl = async (file) => {
        return new Promise((resolve, reject) => {
            request(`/api/v1/aws/s3-upload-url?fileName=${file.name}&fileType=${file.type}`, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }
                const { url, publicUrl } = JSON.parse(body);
                resolve({ url, publicUrl });
            });
        });
    };

    const uploadToS3 = (url, file) => {
        return new Promise((resolve, reject) => {
            request.put({
                url,
                headers: {
                    'Content-Type': file.type,
                },
                body: file,
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(body);
            });
        });
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleCitySelect = (city) => {
        setCity(city);
        setCityInputValue(city.name);
        setShowCitySearchDropdown(false);
    };

    const handleInputChange = (selectedIndex, value, name) => {
        setContent(prevContent => {
          const updatedContent = [...prevContent];
          updatedContent[selectedIndex] = {
            ...updatedContent[selectedIndex],
            [name]: value
          };
          return updatedContent;
        });
    };

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    function hasWhiteSpace(s) {
        return /\s/g.test(s);
      }
    
    const publishBlogPost = () => {
        if (!title || !slug || !category || !summary || !mainImage || content?.length === 0) {
            setErrorMessage("Please fill out all fields: title, slug, category, summary, mainImage, content");
            return;
        }

        // make sure slug has no spaces 
        if (hasWhiteSpace(slug)) {
            setErrorMessage("Slug may not contain spaces")
            return;
        }

        // TODO: make sure city,blog,user, etc have no empty IDs

        setErrorMessage(null)

        let body = {
            title: title.trim(),
            category,
            summary: summary.trim(),
            slug: slug.trim(),
            region,
            content,
            country,
            city: city.id,
            image_url: mainImage,
        }

        if (!editing) {
            body.publishedOn = new Date().toLocaleDateString('en-US', options);
        };

        // Send to API
        request(editing ? `/blog/id/${blogId}` : '/blog', {
            method: editing ? `PUT` : 'POST',
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
                    setContent([]);

                    router.push('/stats')
                } else {
                    setErrorMessage("Something went wrong. Please try again.");
                }
            })

    };

    const addSectionParagraph = (index) => {
        const newObject = { type: 'p', text: '' };

        if (index) {
            insertObjectAtIndex(newObject, index)
        } else {
            setContent([...content, newObject]);
        }
    };

    const addSectionHeading = (headingType, index) => {
        const newObject = { type: headingType, text: '' };

        if (index) {
            insertObjectAtIndex(newObject, index)
        } else {
            setContent([...content, newObject]);
        }
    };

    const addImage = (index) => {
        setContent([...content, { type: 'image', src: '', alt: '' }]);
    };

    const handleDeleteSection = (index) => {
        setContent(prevContent => {
            const updatedContent = [...prevContent];
            updatedContent.splice(index, 1);
            return updatedContent;
        });
    };

    const handleMoveSection = (currentIndex, newIndex) => {
        // Using setContent
        setContent(prevContent => {
            const updatedContent = [...prevContent];
            const [removed] = updatedContent.splice(currentIndex, 1);
            updatedContent.splice(newIndex, 0, removed);
            return updatedContent;
        })
    };

    const addCityEmbed = (index) => {
        const newObject = { type: 'city', id: '' };

        if (index) {
            insertObjectAtIndex(newObject, index)
        } else {
            setContent([...content, newObject]);
        }
    };

    const addCountryEmbed = (index) => {
        const newObject = { type: 'country', id: '' };

        if (index) {
            insertObjectAtIndex(newObject, index)
        } else {
            setContent([...content, newObject]);
        }
    };

    const addBlogEmbed = (index) => {
        const newObject = { type: 'blog', id: '' };

        if (index) {
            insertObjectAtIndex(newObject, index)
        } else {
            setContent([...content, newObject]);
        }
    };

    const addSectionVideo = (index) => {
        const newObject = { type: 'video', alt: '', title: '', description: '', url: '' };

        if (index) {
            insertObjectAtIndex(newObject, index)
        } else {
            setContent([...content, newObject]);
        }
    };

    const addUserEmbed = (index) => {
        const newObject = { type: 'user', id: '' };

        if (index) {
            insertObjectAtIndex(newObject, index)
        } else {
            setContent([...content, newObject]);
        }
    };

    const addPlaceEmbed = (index) => {
        const newObject = { type: 'place', id: '' };

        if (index) {
            insertObjectAtIndex(newObject, index)
        } else {
            setContent([...content, newObject]);
        }
    };

    const addLinkEmbed = (index) => {
        if (index) {
            insertObjectAtIndex({ type: 'link', url: '', text: '' }, index)
        } else {
            setContent([...content, { type: 'link', url: '', text: '' }]);
        }
    };

  const insertObjectAtIndex = (newObject, index) => {
    setContent(prevContent => [
      ...prevContent.slice(0, index + 1),
      newObject,
      ...prevContent.slice(index + 1),
    ]);
  };

    // Embed select functions
    const selectIdForEmbed = (newId, selectedIndex) => {
        setContent(prevContent => {
            const updatedContent = [...prevContent];
            updatedContent[selectedIndex] = {
              ...updatedContent[selectedIndex],
              id: newId
            };
            return updatedContent;
        });

        // Clear search related values
        setShowCities(false);
        setCitySearchText("");
        setCities([]);

        setShowBlogs(false);
        setBlogSearchText("");
        setBlogSearchText([])
        
        setShowCountries(false);
        setCountrySearchText("");
        setFilteredCountries([]);

        setShowUsers(false);
        setUserSearchText("");
        setUsers([]);

        setShowPlaces(false);
        setPlaceSearchText("");
        setPlaces([]);
    }

    const filterCountries = (searchTerm) => {
        const filtered = countries
          .filter((country) =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 5);
      
        setFilteredCountries(filtered);
    };

    // Update search text for embeds
    const updateCitySearchText = (e) => {
        setCitySearchText(e.target.value);

        if (e.target.value?.length === 0) {
            setShowCities(false);
            return;
        } else if (e.target.value?.length < 3) {
            return;
        }

        // request cities from search text
        request(`/cities/search?name=${e.target.value}`)
            .then(res => {
                setShowCities(true);
                setCities(res.data);
            })
    }

    const updateCountrySearchText = (e) => {
        setCountrySearchText(e.target.value);

        if (e.target.value?.length <= 1) {
            setShowCountries(false);
            return;
        }

        // Filter countries list
        filterCountries(e.target.value);

        setShowCountries(true);
    }

    const updateUserSearchText = (e) => {
        setUserSearchText(e.target.value);

        if (e.target.value?.length === 0) {
            setShowUsers(false);
            return;
        } else if (e.target.value?.length < 3) {
            return;
        }

        request(`/users/public/username/${e.target.value}`)
            .then(res => {
                if (res.data) {
                    setShowUsers(true);
                    setUsers([res.data]);
                } else {
                    setUsers([])
                    setShowUsers(false);
                }
            })

        setShowUsers(true);
    }

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

    const updateBlogSearchText = (e) => {
        setBlogSearchText(e.target.value);

        if (e.target.value?.length === 0) {
            setShowBlogs(false);
            return;
        } else if (e.target.value?.length < 3) {
            return;
        }

        request(`/blog/search?searchText=${e.target.value}`)
            .then(res => {
                if (res.data) {
                    setShowBlogs(true);
                    setBlogs(res.data);
                } else {
                    setShowBlogs(false);
                    setBlogs([]);
                }
            })

        setShowBlogs(true);
    }

    const updatePlaceSearchText = (e) => {
        setPlaceSearchText(e.target.value);

        if (e.target.value?.length === 0) {
            setShowPlaces(false);
            return;
        } else if (e.target.value?.length < 3) {
            return;
        }

        // request(`/cities/search?name=${e.target.value}`)
        //     .then(res => {
        //         setShowPlaces(true);
        //         setPlaces(res.data);
        //     })

        setShowPlaces(true);
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
                            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Blog name" />
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
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">summary</label>
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
                                <Image className="h-40 object-cover max-w-full rounded-lg" src={imagePreview} alt="Preview" width={160} height={160} />
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
                        {
                            content?.length === 0 && (
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
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Paragraph</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-18 mr-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <textarea rows="8" value={section.text} onChange={(e) => handleInputChange(index, e.target.value, 'text')} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Paragraph" />
                                            </div>
                                        )
                                    case "h2":
                                        return (
                                            <div className="sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Heading 2</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-18 mr-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <input type="text" value={section.text} onChange={(e) => handleInputChange(index, e.target.value, 'text')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Heading" />
                                            </div>
                                        )
                                    case "h3":
                                        return (
                                            <div className="sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Heading 3</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-18 mr-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <input type="text" value={section.text} onChange={(e) => handleInputChange(index, e.target.value, 'text')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Heading" />
                                            </div>
                                        )
                                    case "h4":
                                        return (
                                            <div className="sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Heading 4</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-18 mr-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <input type="text" value={section.text} onChange={(e) => handleInputChange(index, e.target.value, 'text')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Heading" />
                                            </div>
                                        )
                                    case 'h5':
                                        return (
                                            <div className="sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Heading 5</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-18 mr-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <input type="text" value={section.text} onChange={(e) => handleInputChange(index, e.target.value, 'text')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Heading" />
                                            </div>
                                        )
                                    case 'image':
                                        return (
                                            <div className="sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Image</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-18 mr-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <Image className="h-40 object-cover max-w-full rounded-lg" width={200} height={100} src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/image_default.jpeg" alt="image default" />
                                                <input type="text" value={section.src} onChange={(e) => handleInputChange(index, e.target.value, 'src')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Or paste an image URL here" />
                                                <input type="text" value={section.alt} onChange={(e) => handleInputChange(index, e.target.value, 'alt')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Image Alt Text" />
                                                <p className="text-xs text-gray-600 italic mt-1">
                                                    Visually, horizontle images are better
                                                </p>
                                            </div>
                                        )
                                    case 'video':
                                        return (
                                            <div className="sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Video</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-18 mr-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <Image className="h-40 object-cover max-w-full rounded-lg" width={200} height={100} src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/image_default.jpeg" alt="image default" />
                                                <input type="text" value={section.src} onChange={(e) => handleInputChange(index, e.target.value, 'src')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Or paste an image URL here" />
                                                <input type="text" value={section.alt} onChange={(e) => handleInputChange(index, e.target.value, 'alt')} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Image Alt Text" />
                                            </div>
                                        )
                                    case 'city':
                                        return (
                                            <div className="relative sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">City Embed</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-18 mr-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <input type="text" value={citySearchText} onChange={updateCitySearchText} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for a city" />
                                                {/* Dropdown that shows selectable cities */}
                                                {
                                                    showCities && <div className="p-2 border-solid border-gray-300">
                                                        {
                                                            cities?.map((city) => (
                                                                <div onClick={() => selectIdForEmbed(city.id, index)} key={`citiesSearch-${city.name}-${city.countryName}`} className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
                                                                    <p>{city.name}, {city.country_name}</p>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                }
                                                {
                                                    // Show name of the city and country
                                                    section.id && 
                                                        <p className="mt-2">{section.id}</p>       
                                                }
                                            </div>
                                        )
                                    case 'country':
                                        return (
                                            <div className="relative sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Country Embed</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-18 mr-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <input type="text" value={countrySearchText} onChange={updateCountrySearchText} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for a country" />
                                                {/* Dropdown that shows selectable cities */}
                                                {
                                                    showCountries && <div className="p-2 border-solid border-gray-300">
                                                        {
                                                            filteredCountries?.map((country) => (
                                                                <div onClick={() => selectIdForEmbed(country.id, index)} key={`citiesSearch-${country.name}`} className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
                                                                    <p>{country.name}</p>
                                                                </div>
        
                                                            ))
                                                        }
                                                    </div>
                                                }

                                                {
                                                    // Show name of the city and country
                                                    section.id && 
                                                        <p className="mt-2">{section.id}</p>       
                                                }
                                            </div>
                                        )
                                    case 'blog':
                                        return (
                                            <div className="relative sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Blog Embed</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-18 mr-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <input type="text" value={blogSearchText} onChange={updateBlogSearchText} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for a blog" />
                                                {/* Dropdown that shows selectable cities */}
                                                {
                                                    showBlogs && <div className="p-2 border-solid border-gray-300">
                                                        {
                                                            blogs?.map((blog) => (
                                                                <div onClick={() => selectIdForEmbed(blog.id, index)} key={`citiesSearch-${blog.slug}`} className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
                                                                    <p>{blog.slug}</p>
                                                                </div>
        
                                                            ))
                                                        }
                                                    </div>
                                                }
                                                {
                                                    // Show blog selected
                                                    section.id && 
                                                        <p className="mt-2">{section.id}</p>       
                                                }
                                            </div>
                                        )
                                    case 'user':
                                        return (
                                            <div className="relative sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">User Embed</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-18 mr-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <input type="text" value={userSearchText} onChange={updateUserSearchText} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for a user" />
                                                {/* Dropdown that shows selectable cities */}
                                                {
                                                    showUsers && <div className="p-2 border-solid border-gray-300">
                                                        {
                                                            users?.map((user) => (
                                                                <div onClick={() => selectIdForEmbed(user.id, index)} key={`citiesSearch-${user.username}`} className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
                                                                    <p>{user.username}</p>
                                                                </div>
        
                                                            ))
                                                        }
                                                    </div>
                                                }
                                                {
                                                    // Show user selected
                                                    section.id && 
                                                        <p className="mt-2">{section.id}</p>       
                                                }
                                            </div>
                                        )
                                    case 'place':
                                        return (
                                            <div className="relative sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Place Embed</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-18 mr-4 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <input type="text" value={placeSearchText} onChange={updatePlaceSearchText} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search for a place" />
                                                {/* Dropdown that shows selectable cities */}
                                                {
                                                    showPlaces && <div className="p-2 border-solid border-gray-300">
                                                        {
                                                            places?.map((place) => (
                                                                <div onClick={() => selectIdForEmbed(place.id, index)} key={`citiesSearch-${place.name}-${place.placeName}`} className="cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-800">
                                                                    <p>{place.name}</p>
                                                                </div>
        
                                                            ))
                                                        }
                                                    </div>
                                                }
                                                {
                                                    // Show blog selected
                                                    section.id && 
                                                        <p className="mt-2">{section.id}</p>       
                                                }
                                            </div>
                                        )
                                    case 'link':
                                        return (
                                            <div className="relative sm:col-span-2 my-4" key={`createBlog-${section.type}-${index}`}>
                                                <div className="flex mb-2 items-center">
                                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Link Embed</label>
                                                    <MoveContentButtonsSection index={index} content={content} handleMoveSection={handleMoveSection} />
                                                    <button onClick={() => handleDeleteSection(index)} className="w-20 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">Delete</button>
                                                    <AddSectionButton index={index} addPlaceEmbed={addPlaceEmbed} addSectionVideo={addSectionVideo} addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
                                                </div>
                                                <input type="text" value={section.url} onChange={(e) => handleInputChange(index, e.target.value, 'url')} className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Url" />
                                                <input type="text" value={section.text} onChange={(e) => handleInputChange(index, e.target.value, 'text')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Text" />
                                            </div>
                                        )
                                    default:
                                        return null
                                }
                            })
                        }
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <AddSectionButton addSectionParagraph={addSectionParagraph} addSectionHeading={addSectionHeading} addImage={addImage} addCityEmbed={addCityEmbed} addCountryEmbed={addCountryEmbed} addBlogEmbed={addBlogEmbed} addUserEmbed={addUserEmbed} addLinkEmbed={addLinkEmbed} />
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