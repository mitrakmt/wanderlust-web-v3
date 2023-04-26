/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import Image from 'next/image'

// Utils
import request from '../utils/request';

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

// Context
import { countriesContext } from '../context/CountriesProvider';
import { toastsContext } from '../context/ToastsProvider';
import { followsContext } from '../context/FollowsProvider';

// import LocationSuggestions from './components/LocationSuggestions';
// import FollowSuggestions from './components/FollowSuggestions';
// import Blogs from './components/Blogs';

// Components
import BlogCard from '../components/BlogCard';
import TextH2 from '../components/Text/TextH2';
// import InputWithAddon from '../components/InputWithAddon/InputWithAddon';
// import CustomSelect from '../components/Select/Select';
// import BreadCrumb from '../components/BreadCrumb/BreadCrumb';
import PlacesMap from '../components/profileComponents/PlacesMap/Map';
import CountriesMap from '../components/profileComponents/CountriesMap/Map';
// import BannerModal from './components/BannerModal';
// import ProfileModal from './components/ProfileModal';

export default function Profile({ publicUser, recommendedLocations, providedUser, username, reviews, followCount, reviewCount, blogs, places }) {
    // Hooks
    const { user, setUser } = useAuth();
    const router = useRouter();
    // const { username } = router.query;
    
    // Context
    const [countries, ] = useContext(countriesContext);
    const [toasts, setToasts] = useContext(toastsContext);
    const [follows, setFollows] = useContext(followsContext);

    // State
    const [selectedMap, setSelectedMap] = useState('favorites');
    const [profileUser, setProfileUser] = useState(null);
    // const [followCount, setFollowCount] = useState(0);
    // const [reviewCount, setReviewCount] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    // const [reviews, setReviews] = useState([]);
    const [feed] = useState([]);
    // const [content, setContent] = useState([]);
    const [editing, setEditing] = useState(false);
    const [showEditProfilePhotoIcon, setShowEditProfilePhotoIcon] = useState(false);
    const [showEditBannerIcon, setShowEditBannerIcon] = useState(false);
    const [editedValues, setEditedValues] = useState({});
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [currentCountrySelect, setCurrentCountrySelect] = useState({});
    const [homeCountrySelect, setHomeCountrySelect] = useState({}); 
    const [previousCurrentCountrySelect, setPreviousCurrentCountrySelect] = useState(null);
    const [previousHomeCountrySelect, setPreviousHomeCountrySelect] = useState(null);
    const [, setEditError] = useState(null);
    const [, setCountriesVisited] = useState({});
    const [, setIsFollowed] = useState(false);
    const [imageError, setImageError] = useState(false);
    // const [places, setPlaces] = useState([]);
    const [selectedFilter] = useState(null);
    const [, setUserPlaces] = useState([]);
    const [userPlacesToTry, setUserPlacesToTry] = useState([]);
    const [showProfileImageModal, setShowProfileImageModal] = useState(false);
    const [showBannerImageModal, setShowBannerImageModal] = useState(false);
    const [showPublisherStarTooltip, setShowPublisherStarTooltip] = useState(false);
    
    // Loading states
    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [, setSaveLoading] = useState(false);
    const [, setLoadingReviewCount] = useState(true);
    const [, setLoadingFollowCount] = useState(true);

    // UseEffects
    useEffect(() => {
        setProfileUser(providedUser)
    }, [providedUser]);

    useEffect(() => {
        if (publicUser) {
            if (profileUser) {
                if (follows?.find(followUserId => followUserId === profileUser.id)) {
                    setIsFollowed(true);
                } else {
                    setIsFollowed(false);
                }
            }
        }
    }, [follows, profileUser])

    useEffect(() => {
        const currentCountryFound = countries?.find(country => country?.id === profileUser?.currentCountry?.id);
        const homeCountryFound = countries?.find(country => country?.id === profileUser?.homeCountry?.id);

        if (currentCountryFound) {
          setCurrentCountrySelect(currentCountryFound);
        }

        if (homeCountryFound) {
          setHomeCountrySelect(homeCountryFound);
        }
    }, [countries]);
  
    useEffect(() => {
        async function fetchData() {
            if (publicUser) {
                if (username) {
                    // const newUserData = await request(`/users/public/username/${username}`, {
                    //     method: 'GET'
                    // })

                    // If not data, it's a bad URL so push back to home 
                    // if (!newUserData?.data) {
                    //     router.push('/');
                    //     return;
                    // }

                    // setProfileUser(newUserData?.data)
        
                    const newCountriesVisited = {};
                    profileUser?.countries_visited?.forEach(country => {
                        newCountriesVisited[country] = true;
                    })
                    setCountriesVisited(newCountriesVisited)
                    
                    // Fetch reviews for user
                    // const reviews = await request(`/reviews/user/${newUserData.data.id}`)
                    // setReviews(reviews?.data || {});
                }
            } else {
                setProfileUser(user);
    
                const newCountriesVisited = {};
                user?.countries_visited?.forEach(country => {
                    newCountriesVisited[country] = true;
                })
                setCountriesVisited(newCountriesVisited)
    
                // Fetch reviews for user
                // const reviews = await request(`/reviews/user/${user?.id}`)
                // setReviews(reviews?.data || {});
            }
        }
        fetchData();
      }, [username]);

    // useEffect(() => {
    //     async function fetchData(userId) {
    //         const response = await request(`/reviews/count/${userId}`, {
    //             method: 'GET'
    //         })
    //         setReviewCount(response.data)
    //         setLoadingReviewCount(false)
    //     }

    //     if (publicUser && profileUser) {
    //         fetchData(profileUser.id);
    //     }
    // }, [profileUser]);
    
    // useEffect(() => {
    //     async function fetchData(userId) {
    //         const response = await request(`/reviews/count/${userId}`, {
    //             method: 'GET'
    //         })
    //         setReviewCount(response.data)
    //         setLoadingReviewCount(false)
    //     }

    //     if (!publicUser) {
    //         fetchData(user.id);
    //     }
    // }, []);

    // useEffect(() => {
    //     async function fetchData(userId) {
    //         const response = await request(`/follows/count/${userId}`, {
    //             method: 'GET'
    //         })
    
    //         setFollowCount(response.data)
    //         setLoadingFollowCount(false)
    //     }

    //     if (publicUser && profileUser) {
    //         fetchData(profileUser.id);
    //     } else if (!publicUser) {
    //         fetchData(user?.id);
    //     }
    //   }, [profileUser]);

    // useEffect(() => {
    //     async function fetchData(userId) {
    //         const response = await request(`/place/user/${userId}`, {
    //             method: 'GET'
    //         })
    
    //         setPlaces(response.data)
    //     }

    //     if (publicUser && profileUser) {
    //         fetchData(profileUser.id);
    //     } else if (!publicUser) {
    //         fetchData(user?.id);
    //     }
    // }, [profileUser]); 

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await request(`/place`, {
    //             method: 'GET'
    //         })
    
    //         setUserPlaces(response.data)
    //     }

    //     if (user) {
    //         fetchData();
    //     }
    // }, []); 

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await request(`/placesToTry`, {
    //             method: 'GET'
    //         })
    
    //         setUserPlacesToTry(response.data)
    //     }

    //     if (user) {
    //         fetchData();
    //     }
    // }, []); 

    // // Fetch user's content
    // useEffect(() => {
    //     async function fetchData(username) {
    //         const response = await request(`/blog/user/${username}`, {
    //             method: 'GET'
    //         })
    
    //         setContent(response.data.slice(0, 3))
    //     }

    //     if (publicUser && profileUser) {
    //         fetchData(profileUser.username);
    //     } else if (!publicUser) {
    //         fetchData(user?.username);
    //     }
    // }, [profileUser]); 

    // Functions
    const showProfileModal = () => {
        setShowProfileImageModal(true)
    }

    const closeProfileModal = () => {
        setShowProfileImageModal(false)
    }

    const showBannerModal = () => {
        setShowBannerImageModal(true)
    }

    const closeBannerModal = () => {
        setShowBannerImageModal(false)
    }

    const checkUsernameTaken = async (event) => {
        if (event.target.value === user.username) {
            setUsernameTaken(false);
            return;
        }
        const response = await request(`/users/checkUsername/${event.target.value}`);
        setUsernameTaken(response.data.usernameTaken)
    }

    const onDrop = async (files) => {
        setImageUploadLoading(true);
        if (files.length === 0) {
            setFileUploadError(true);
            setImageUploadLoading(false);
            return;
        }
        var file = files[0];

        if (file.type === 'image/heic') {
            setImageError(".heic images are not allowed. Please use either .jpg or .png")
            setImageUploadLoading(false);
            return;
        }

        setImageError(null);
    
        request('/file/sign', {
            method: "POST",
            body: {
                filename: file.name,
                filetype: file.type
            }
        })
            .then(function (result) {
                var signedUrl = result.data;
            
                var options = {
                    headers: {
                        'Content-Type': file.type
                    }
                };
        
                return axios.put(signedUrl, file, options);
            })
            .then(async () => {
                setImageUploadLoading(false);

                setProfileUser({
                    ...profileUser,
                    ...{ profile_image: undefined }
                })
                setUser({
                    ...user,
                    ...{ profile_image: undefined }
                });

                setTimeout(async () => {
                    const newUserData = await request(`/users`, {
                        method: 'GET'
                    })
    
                    setProfileUser(newUserData?.data)
                    setUser(newUserData?.data);
                }, 4000)

                closeProfileModal();
            })
            .catch(function (err) {
                // TODO: add error logging in some service
                console.log(err);
            });
    };

    const onBannerDrop = async (files) => {
        setImageUploadLoading(true);
        if (files.length === 0) {
            setFileUploadError(true);
            setImageUploadLoading(false);
            return;
        }
        var file = files[0];

        if (file.type === 'image/heic') {
            setImageError(".heic images are not allowed. Please use either .jpg or .png")
            setImageUploadLoading(false);
            return;
        }

        setImageError(null);
    
        request('/file/sign/banner', {
            method: "POST",
            body: {
                filename: `${file.name}_banner`,
                filetype: file.type
            }
        })
            .then(function (result) {
                var signedUrl = result.data;
            
                var options = {
                    headers: {
                        'Content-Type': file.type
                    }
                };
        
                return axios.put(signedUrl, file, options);
            })
            .then(async () => {
                setImageUploadLoading(false);

                setProfileUser({
                    ...profileUser,
                    ...{ bannerImage: undefined }
                })
                setUser({
                    ...user,
                    ...{ bannerImage: undefined }
                });

                setTimeout(async () => {
                    const newUserData = await request(`/users`, {
                        method: 'GET'
                    })
    
                    setProfileUser(newUserData?.data)
                    setUser(newUserData?.data);
                }, 4000)

                closeBannerModal();
            })
            .catch(function (err) {
                // TODO: add error logging in some service
                console.log(err);
            });
    };

    const saveProfileEdit = async () => {
        setSaveLoading(true);
        
        // Error check
        if (usernameTaken) {
            setSaveLoading(false);
            return;
        }

        // Add country selects to editedValues
        editedValues.currentCountry = currentCountrySelect?.id
        editedValues.homeCountry = homeCountrySelect?.id

        // Save
        const response = await request(`/users/${user?.id}`, {
            method: 'PUT',
            body: editedValues
        })

        // Check errors 
        if (!response.data) {
            // TODO: set show error
            setEditError(response.message)
            setToasts([
                ...toasts,
                ...[{
                  message: 'Profile failed to save',
                  type: 'error'
                }]
            ])
            setTimeout(() => {
                let newToasts = [...toasts];
                newToasts.pop();
                setToasts(newToasts);
            }, 2000)
            setSaveLoading(false);
            return;
        }

        // Reset values for editing
        const requestedUser = await request(`/users`, {
            method: 'GET'
        })
        setProfileUser(requestedUser?.data)
        setUser(requestedUser?.data);

        setEditing(false);
        setEditedValues({});
        setPreviousCurrentCountrySelect(null);
        setPreviousHomeCountrySelect(null);
        setSaveLoading(false);
    }

    const cancelProfileEdit = () => {
        // Revert selects if changed
        setUsernameTaken(false);
        
        if (previousCurrentCountrySelect) {
            setCurrentCountrySelect(previousCurrentCountrySelect);
        }

        if (previousHomeCountrySelect) {
            setHomeCountrySelect(previousHomeCountrySelect);
        }

        setEditing(false);
    }

    const showEditProfilePicture = () => {
        setShowEditProfilePhotoIcon(true)
    }

    const hideEditProfilePicture = () => {
        setShowEditProfilePhotoIcon(false)
    }

    const showEditBanner = () => {
        setShowEditBannerIcon(true)
    }

    const hideEditBanner = () => {
        setShowEditBannerIcon(false)
    }

    const updateEditedValues = (property, value) => {
        setEditedValues({
            ...editedValues,
            ...{
                [property]: value
            }
        })
    }

    // const togglePublicProfile = async () => {
    //     setUser({
    //         ...user,
    //         ...{
    //             public: !user?.public
    //         }
    //     })
    //     const response = await request(`/users/${user?.id}`, {
    //         method: 'PUT',
    //         body: {
    //             public: !user?.public
    //         }
    //     })

    //     if (response.message) {
    //         setUser({
    //             ...user,
    //             ...{
    //                 public: !user?.public
    //             }
    //         })
    //     }
    // }

    const followUser = (userId) => {
        if (!user) {
            router.push('/login')
            return;
        }

        setFollows([ ...follows, ...[userId]])
        request(`/follows`, {
            method: "POST",
            body: {
                followingId: userId
            }
        }).then(res => {
            if (!res.data) {
                setFollows(follows.filter((id) => id !== userId))
            }
        })
    }

    const removeFollow = (userId) => {
        setFollows(follows.filter((id) => id !== userId))
        request(`/follows`, {
            method: "DELETE",
            body: {
                userId
            }
        })
    }

    if (!profileUser) return null;
    
    return (
        // Profile page similar to twitter profile  
        // <section className="relative ml-0 sm:ml-16 px-2 sm:px-6 py-8">
        //     <div className="flex flex-col md:flex-row justify-between overflow-scroll h-full min-h-screen">
        //         {/* Profile Info  */}
        //         <div className="flex w-full md:w-2/3 p-4 flex-col relative">
        //             {
        //                 user && user?.premium && <div className="w-full mb-4">
        //                     <BreadCrumb breadCrumbHome={"Community"} goToHome={() => router.push('/community')} secondName={profileUser?.username} />
        //                 </div>
        //             }
        //             {/* Banner image  */}
        //             <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 relative">
        //                 {
        //                     showEditBannerIcon && !publicUser && (
        //                         <div onMouseLeave={!publicUser ? () => hideEditBanner() : undefined} onClick={showBannerModal} className="cursor-pointer absolute top-0 left-0 z-30 w-full h-full bg-gray-900 text-white dark:bg-gray-300 dark:text-black bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center">
        //                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        //                                 <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
        //                                 <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        //                             </svg>

        //                         </div>
        //                     )
        //                 }
        //                 {
        //                     profileUser?.bannerImage ? (
        //                         <Image
        //                             src={profileUser?.bannerImage}
        //                             priority
        //                             onMouseEnter={!publicUser ? () => showEditBanner() : undefined}
        //                             fill
        //                             className="w-full h-full object-cover rounded-lg"
        //                             alt={`${profileUser?.username}'s banner image`}
        //                             onClick={!publicUser ? showBannerModal : undefined}
        //                         />
        //                     ) : (
        //                         <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-lg relative">
        //                             {
        //                                     !publicUser && (
        //                                         <div className="absolute right-4 bottom-4">
        //                                             {/* Pencil icon for edit button  */}
        //                                             <div className="flex cursor-pointer" onClick={showBannerModal}>
        //                                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
        //                                                     <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
        //                                                     <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        //                                                 </svg>
        //                                             </div>
        //                                         </div>
        //                                     )
        //                             }
        //                         </div>
        //                     )
        //                 }
        //             </div>
        //             {/* BANNER IMAGE  */}
        //             <BannerModal showBannerImageModal={showBannerImageModal} onDrop={onBannerDrop} imageUploadLoading={imageUploadLoading} fileUploadError={fileUploadError} imageError={imageError} closeBannerModal={closeBannerModal} />
                    
        //             {/* User Info  */}
        //             <div className="flex flex-col pl-2 sm:px-8 w-full relative">
        //                 {/* Edit button on far right  */}
        //                 <div className="flex">
        //                     {user?.id === profileUser?.id && (
        //                         <div className="absolute right-4 sm:right-8 top-4">
        //                             {!editing && (
        //                                 <button type="button" onClick={() => setEditing(true)} className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Edit Profile</button>
        //                             )}
        //                             {
        //                                 editing && (
        //                                     <div className="flex">
        //                                         <button type="button" onClick={saveProfileEdit} className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mr-2">Save</button>
        //                                         <button type="button" onClick={cancelProfileEdit} className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Cancel</button>
        //                                     </div>
        //                                 )
        //                             }
        //                         </div>
        //                     )}
                            
        //                 </div>
        //                 {/* Follow and unfollow button on far right */}
        //                 {user?.id !== profileUser?.id && (
        //                     <div className="absolute right-4 sm:right-8 top-4">
        //                         {follows.includes(profileUser?.id) ? (
        //                             <button type="button" onClick={() => removeFollow(profileUser.id)} className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Unfollow</button>
        //                         ) : (
        //                             <button type="button" onClick={() => followUser(profileUser.id)} className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Follow</button>
        //                         )}
        //                     </div>
        //                 )}
        //                 {/* Profile image  */}
        //                 <div className="relative w-52 h-52 -mt-24 rounded-full z-50">
        //                     {/* Show edit icon svg over profile image with dark background shade */}
        //                     {
        //                         showEditProfilePhotoIcon && !publicUser && (
        //                             <div onMouseLeave={!publicUser ? () => hideEditProfilePicture(false) : undefined} onClick={showProfileModal} className="cursor-pointer absolute top-0 left-0 w-full h-full bg-gray-900 text-white dark:bg-gray-300 dark:text-black bg-opacity-50 dark:bg-opacity-50 rounded-full flex items-center justify-center">
        //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        //                                     <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
        //                                     <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        //                                 </svg>
        //                             </div>
        //                         )
        //                     }
        //                     {
        //                         profileUser?.profile_image && <Image
        //                             priority
        //                             onMouseEnter={!publicUser ? () => showEditProfilePicture(true) : undefined}
        //                             onClick={!publicUser ? showProfileModal : undefined}
        //                             src={profileUser?.profile_image}
        //                             alt={`${profileUser?.username} Profile Image`}
        //                             quality={80}
        //                             width={150}
        //                             height={150}
        //                             className={`w-52 h-52 rounded-full border-4 border-white ${!publicUser ? "cursor-pointer" : ""}`}
        //                         />
        //                     }
        //                     {
        //                         !profileUser?.profile_image && <div onMouseEnter={!publicUser ? () => showEditProfilePicture(true) : undefined} onClick={!publicUser ? showProfileModal : undefined} className={`w-52 h-52 rounded-full border-4 border-white ${!publicUser ? "cursor-pointer" : ""}`}>
        //                             <div className="flex items-center justify-center w-full h-full text-4xl text-white bg-gray-500 dark:bg-gray-400 dark:text-black rounded-full">
        //                                 {profileUser?.username?.charAt(0).toUpperCase()}
        //                             </div>
        //                         </div>
        //                     }
                                    
        //                 </div>
                            
        //                 <ProfileModal showProfileImageModal={showProfileImageModal} onDrop={onDrop} imageUploadLoading={imageUploadLoading} fileUploadError={fileUploadError} imageError={imageError} closeProfileModal={closeProfileModal} />
    
        //                 {/* FOLLOWERS, STATS */}
        //                 <div className="flex justify-center w-full py-4 pt-8 lg:pt-4 flex-wrap">
        //                     <div className="w-20 p-1 text-center">
        //                         <span className="block text-lg font-bold tracking-wide text-gray-700 uppercase dark:text-white">{followCount}</span><span className="text-sm text-gray-700 dark:text-white">Followers</span>
        //                     </div>
        //                     <div className="w-20 p-1 text-center">
        //                         <span className="block text-lg font-bold tracking-wide text-gray-700 uppercase dark:text-white">{profileUser?.countries_visited?.length || 0}</span><span className="text-sm text-gray-700 dark:text-white">Countries</span>
        //                     </div>
        //                     <div className="w-20 p-1 text-center">
        //                         <span className="block text-lg font-bold tracking-wide text-gray-700 uppercase dark:text-white">{reviewCount}</span><span className="text-sm text-gray-700 dark:text-white">Reviews</span>
        //                     </div>
        //                     <div className="w-20 p-1 text-center">
        //                         <span className="block text-lg font-bold tracking-wide text-gray-700 uppercase dark:text-white">{places?.length || 0}</span><span className="text-sm text-gray-700 dark:text-white">Places</span>
        //                     </div>
        //                 </div>

        //                 {/* SOCIAL LINKS  */}
        //                 {!editing && <div className="flex flex-wrap items-center justify-center mb-2 space-x-2">
        //                     {/* <!-- Github --> */}
        //                     {
        //                         profileUser?.github && <a href={`https://www.github.com/${profileUser?.github}`} target="_blank">
        //                             <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#333" }}>
        //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-4 h-4">
        //                                     <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
        //                                 </svg>
        //                             </button>
        //                         </a>
        //                     }

        //                     {/* <!-- Facebook --> */}
        //                     {
        //                         profileUser?.facebook && <a href={`https://www.facebook.com/${profileUser?.facebook}`} target="_blank">
        //                             <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#1877f2" }}>
        //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
        //                                     <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
        //                                 </svg>
        //                             </button>
        //                         </a>
        //                     }

        //                     {/* <!-- Instagram --> */}
        //                     {
        //                         profileUser?.instagram && <a href={`https://www.instagram.com/${profileUser?.instagram}`} target="_blank">
        //                             <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#c13584" }}>
        //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
        //                                     <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
        //                                 </svg>
        //                             </button>
        //                         </a>
        //                     }

        //                     {/* <!-- Linkedin --> */}
        //                     {
        //                         profileUser?.linkedin && <a href={`https://www.linkedin.com/in/${profileUser?.linkedin}`} target="_blank" >
        //                             <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#0077b5" }}>
        //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
        //                                     <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
        //                                 </svg>
        //                             </button>
        //                         </a>
        //                     }

        //                     {/* <!-- Youtube --> */}
        //                     {
        //                         profileUser?.youtube && <a href={`https://www.youtube.com/${profileUser?.youtube}`} target="_blank">
        //                             <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#ff0000" }}>
        //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-4 h-4">
        //                                     <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
        //                                 </svg>
        //                             </button>
        //                         </a>
        //                     }

        //                     {/* <!-- TikTok --> */}
        //                     {
        //                         profileUser?.tiktok && <a href={`https://www.tiktok.com/@${profileUser?.tiktok}`} target="_blank">
        //                             <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#6a76ac" }}>
        //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
        //                                     <path fill="currentColor" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
        //                                 </svg>
        //                             </button>
        //                         </a>
        //                     }

        //                     {/* <!-- Twitter --> */}
        //                     {
        //                         profileUser?.twitter && <a href={`https://www.twitter.com/${profileUser?.twitter}`} target="_blank">
        //                             <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#1da1f2" }}>
        //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
        //                                     <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
        //                                 </svg>
        //                             </button>
        //                         </a>
        //                     }
        //                 </div>}

        //                 {/* User info like name, username, job, bio  */}
        //                 <div className="flex flex-col mt-4">
        //                     <div className="flex flex-col mb-4">
        //                         <div className={`flex ${editing ? "flex-col" : "flex-col sm:flex-row"} justify-between items-center mb-4`}>
        //                             <div className={editing ? "w-2/3" : ""}>
        //                                 {
        //                                     editing ?
        //                                         <div className="flex flex-col w-full">
        //                                             <label className="text-sm font-bold text-gray-700 tracking-wide dark:text-white">Name</label>
        //                                             <input type="text" value={editedValues?.name || profileUser?.name} onChange={(e) => updateEditedValues('name', e.target.value)} className="mb-4 w-full px-4 py-2 text-lg font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring" placeholder="Name" />
        //                                         </div> :
        //                                         <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{profileUser?.name}</h1>
        //                                 }
        //                                 {
        //                                     editing ?
        //                                         <InputWithAddon containerClassnames="mt-4" value={(editedValues?.username || editedValues?.username === "") ? editedValues?.username  : profileUser?.username} onBlur={checkUsernameTaken} label="Username" symbol={"@"} onChange={(e) => updateEditedValues('username', e.target.value)} /> :
        //                                         <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">@{profileUser?.username}</p>
        //                                 }
        //                                 {
        //                                     usernameTaken && <p className="text-sm text-red-500">Username is already taken</p>
        //                                 }
        //                             </div>
        //                             <div className="flex mt-4">
        //                                 <div className="mx-4 mt-0 mb-2 text-sm font-bold leading-normal text-gray-700 uppercase dark:text-white">
        //                                     <div className="text-left">
        //                                         <p className="text-xs font-normal text-gray-700 dark:text-gray-400">From:</p>
        //                                         {
        //                                             editing ?
        //                                                 <CustomSelect data={countries} setPreviousValue={setPreviousHomeCountrySelect} previousValue={previousHomeCountrySelect} select={setHomeCountrySelect} selected={homeCountrySelect} imagePropertyName="emoji" /> :
        //                                                 <>
        //                                                     <i className="mr-2 text-lg text-gray-700 fas fa-map-marker-alt dark:text-white">{profileUser?.homeCountry?.emoji}</i>
        //                                                     {profileUser?.homeCountry?.name || "Not Provided"}
        //                                                 </>
        //                                         }
        //                                     </div>
        //                                 </div>
        //                                 <div className="mx-4 mt-0 mb-2 text-sm font-bold leading-normal text-gray-700 uppercase dark:text-white">
        //                                     <div className="text-left">
        //                                         <p className="text-xs font-normal text-gray-700 dark:text-gray-400">Currently:</p>
        //                                         {
        //                                             editing ?
        //                                                 <CustomSelect data={countries} setPreviousValue={setPreviousCurrentCountrySelect} previousValue={previousCurrentCountrySelect} select={setCurrentCountrySelect} selected={currentCountrySelect} imagePropertyName="emoji" /> :
        //                                                 <>
        //                                                     <i className="mr-2 text-lg text-gray-700 fas fa-map-marker-alt dark:text-white">{profileUser?.currentCountry?.emoji}</i>
        //                                                     {profileUser?.currentCountry?.name || "Not Provided"}
        //                                                 </>
        //                                         }
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         {
        //                             editing ?
        //                                 <div className="flex flex-col">
        //                                     <label className="text-sm font-bold text-gray-700 tracking-wide dark:text-white">Bio</label>
        //                                     <textarea
        //                                         className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:border-primary-500 focus:outline-none focus:shadow-outline"
        //                                         rows="3"
        //                                         placeholder="Tell us about yourself"
        //                                         value={editedValues?.bio || profileUser?.bio}
        //                                         label="Bio"
        //                                         onChange={(e) => updateEditedValues('bio', e.target.value)}
        //                                     />
        //                                 </div> :
        //                                 <p className="text-gray-500 dark:text-gray-300">{profileUser?.bio}</p>
        //                         }
        //                     </div>
        //                     <div className="">
        //                         {
        //                             editing ?
        //                                 <div className="flex flex-col">
        //                                     <label className="text-sm font-bold text-gray-700 tracking-wide dark:text-white">Job</label>
        //                                     <input
        //                                         className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:border-primary-500 focus:outline-none focus:shadow-outline"
        //                                         placeholder="What do you do?"
        //                                         value={editedValues?.job || profileUser?.job}
        //                                         label="Job"
        //                                         onChange={(e) => updateEditedValues('job', e.target.value)}
        //                                     />
        //                                 </div> :
        //                                 <p className="text-gray-600 dark:text-gray-400 text-sm">{profileUser?.job}</p>
        //                         }
        //                         {
        //                             !editing && <p className="text-gray-600 dark:text-gray-400 text-sm">Joined {moment(profileUser?.createdAt).format('MMMM Do YYYY')}</p>
        //                         }
        //                     </div>
        //                 </div>
        //             </div>

        //             {
        //                 editing &&
        //                     <div className="grid gap-6 mt-10 mb-6 lg:grid-cols-2">
        //                         <div className="sm:px-6">
        //                             <InputWithAddon value={editedValues?.instagram || profileUser?.instagram || ""} label="Instagram Username" symbol={"@"} onChange={(e) => updateEditedValues('instagram', e.target.value)} />
        //                         </div>
        //                         <div className="sm:px-6">
        //                             <InputWithAddon value={editedValues?.twitter || profileUser?.twitter} label="Twitter Username" symbol={"@"} onChange={(e) => updateEditedValues('twitter', e.target.value)} />
        //                         </div>
        //                         <div className="sm:px-6">
        //                             <InputWithAddon value={editedValues?.linkedin || profileUser?.linkedin} label="LinkedIn Username" symbol={"/in/"} onChange={(e) => updateEditedValues('linkedin', e.target.value)} />
        //                         </div>
        //                         <div className="sm:px-6">
        //                             <InputWithAddon value={editedValues?.facebook || profileUser?.facebook} label="Facebook Username" symbol={"@"} onChange={(e) => updateEditedValues('facebook', e.target.value)} />
        //                         </div>
        //                         <div className="sm:px-6">
        //                             <InputWithAddon value={editedValues?.github || profileUser?.github} label="Github Username" symbol={"@"} onChange={(e) => updateEditedValues('github', e.target.value)} />
        //                         </div>
        //                         <div className="sm:px-6">
        //                             <InputWithAddon value={editedValues?.youtube || profileUser?.youtube} label="Youtube Profile" symbol={"@"} onChange={(e) => updateEditedValues('youtube', e.target.value)} />
        //                         </div>
        //                         <div className="sm:px-6">
        //                             <InputWithAddon value={editedValues?.tiktok || profileUser?.tiktok} label="Tiktok Profile" symbol={"@"} onChange={(e) => updateEditedValues('tiktok', e.target.value)} />
        //                         </div>
        //                     </div>
        //             }
        //             {/* Maps  */}
        //             {
        //                 profileUser && profileUser.premium &&
        //                     <div className="flex flex-col mt-8 w-full">
        //                         <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        //                             <li className="mr-2">
        //                                 <a onClick={() => setSelectedMap('favorites')} className={`${selectedMap === 'favorites' ? "active bg-gray-100 text-primary-600 dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"} transition-colors cursor-pointer inline-block p-4 rounded-t-lg`}>Favorites</a>
        //                             </li>
        //                             <li className="mr-2">
        //                                 <a onClick={() => setSelectedMap('passport')} className={`${selectedMap === 'passport' ? "active bg-gray-100 text-primary-600 dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"} transition-colors cursor-pointer inline-block p-4 rounded-t-lg`}>Passport</a>
        //                             </li>
        //                         </ul>
        //                         {
        //                             selectedMap === 'favorites' && (
        //                                 <PlacesMap userPlacesToTry={userPlacesToTry} setUserPlacesToTry={setUserPlacesToTry} user={user} zoom={2.5} coordinates={[17.1317479, 41.6531344]}  places={selectedFilter ? places.filter(place => { return place?.tags?.find(element => element === selectedFilter) }) : places} />
        //                             )
        //                         }
        //                         {
        //                             selectedMap === 'passport' && (
        //                                 <CountriesMap
        //                                     user={profileUser}
        //                                     defaultZoom={2.5}
        //                                     coordinates={[17.1317479, 41.6531344]}
        //                                 />
        //                             )
        //                         }
        //                     </div>
        //             }
        //             {
        //                 feed.length > 0 &&
        //                     <div className="p-2 md:p-10 mt-10 border-t border-primary-200">
        //                         <TextH2>Feed</TextH2>
        //                         <div className="flex flex-wrap justify-center px-8 mt-4">
        //                             <ol className="relative border-l border-gray-200 dark:border-gray-700">
        //                                 {
        //                                     feed.map(post => (
        //                                         <li className="mb-10 ml-6" key={`publicProfile-reviews-${post?.id}`}>
        //                                             <span className="absolute flex items-center justify-center bg-primary-200 rounded-full w-14 h-14 -left-7 ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
        //                                                 {
        //                                                     post.city.image_url_thumb ?
        //                                                         <Image className="h-12 rounded-full shadow-lg w-14" height={30} width={30} src={post.city.image_url_thumb} alt={post.city.name} /> :
        //                                                         <svg className="w-32 h-32 tex-gra-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
        //                                                 }
        //                                             </span>
        //                                             <article className="px-8">
        //                                                 <h4 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{post.city.name}, {post.city.country_name}</h4>
        //                                                 <footer className="mb-5 text-sm text-left text-gray-500 dark:text-gray-400"><p>posted on <time dateTime={post.createdAt}>{moment(post.createdAt).format('MMMM Do YYYY')}</time></p></footer>
        //                                                 <p className="mb-2 font-light text-gray-500 dark:text-gray-400">{post.body}</p>
        //                                             </article>
        //                                         </li>
        //                                     ))
        //                                 }
        //                             </ol>
        //                         </div>
        //                     </div>
        //             }
        //             {
        //                 content.length > 0 &&
        //                     <div className="p-2 md:p-10 mt-10">
        //                         <TextH2>Content</TextH2>
        //                         <div className="flex flex-wrap justify-center px-2 mt-4">
        //                             <ol className="gap-y-4 relative border-l border-gray-200 dark:border-gray-700">
        //                                 {
        //                                     content.map(article => (
        //                                         <BlogCard post={article} key={`publicProfile-content-${article?.id}`} />
        //                                     ))
        //                                 }
        //                             </ol>
        //                         </div>
        //                     </div>
        //             }
        //             {
        //                 reviews.length > 0 &&
        //                     <div className="p-2 md:p-10 mt-10">
        //                         <TextH2>City Reviews</TextH2>
        //                         <div className="flex flex-wrap justify-center pl-8 pr-2 sm:pl-8 sm:pr-8 mt-4">
        //                             <ol className="relative border-l border-gray-200 dark:border-gray-700">
        //                                 {
        //                                     reviews.map(review => (
        //                                         <li className="mb-10 ml-6" key={`publicProfile-reviews-${review?.id}`}>
        //                                             <span className="absolute flex items-center justify-center bg-primary-200 rounded-full w-14 h-14 -left-7 ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
        //                                                 {
        //                                                     review.city.image_url_thumb ?
        //                                                         <Image height={50} width={50} className="h-14 rounded-full shadow-lg w-14" src={review.city.image_url_thumb} alt={`${review.city.name} City Review`} /> :
        //                                                         <svg className="w-32 h-32 tex-gra-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
        //                                                 }
        //                                             </span>
        //                                             <article className="pl-6 pr-2 md:pl-8 md:pr-8">
        //                                                 <h4 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{review.city.name}, {review.city.country_name}</h4>
        //                                                 <div className="flex items-start sm:items-center mb-1 flex-col sm:flex-row">
        //                                                     <div className="flex">
        //                                                         <svg aria-hidden="true" className={`w-5 h-5 ${review.rating >= 1 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        //                                                         <svg aria-hidden="true" className={`w-5 h-5 ${review.rating >= 2 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        //                                                         <svg aria-hidden="true" className={`w-5 h-5 ${review.rating >= 3 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        //                                                         <svg aria-hidden="true" className={`w-5 h-5 ${review.rating >= 4 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        //                                                         <svg aria-hidden="true" className={`w-5 h-5 ${review.rating >= 5 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        //                                                     </div>
        //                                                     <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">{review.title}</h3>
        //                                                 </div>
        //                                                 <footer className="mb-5 text-sm text-left text-gray-500 dark:text-gray-400"><p>Reviewed on <time dateTime={review.createdAt}>{moment(review.createdAt).format('MMMM Do YYYY')}</time></p></footer>
        //                                                 <p className="mb-2 font-light text-gray-500 dark:text-gray-400">{review.body}</p>
        //                                             </article>
        //                                         </li>
        //                                     ))
        //                                 }
        //                             </ol>
        //                         </div>
        //                     </div>
        //             }
        //         </div>
        //         <div className="hidden md:flex w-full mt-4 md:w-1/3 gap-y-4 flex-col items-center sm:items-end sticky bottom-0">
        //             <LocationSuggestions recommendedLocations={recommendedLocations} />
        //             <FollowSuggestions follows={follows} followUser={followUser} removeFollow={removeFollow} />
        //             <Blogs />
        //             {/* <Trending /> */}
        //         </div>
        //     </div>
        // </section>
        
        <section className="relative ml-0 sm:ml-16 px-2 sm:px-6 py-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row gap-x-4">
                {/* Profile image */}
                <div className="w-full sm:w-1/2 md:w-1/3 h-90 relative">
                    {/* Show edit icon svg over profile image with dark background shade */}
                    {
                        showEditProfilePhotoIcon && !publicUser && (
                            <div onMouseLeave={!publicUser ? () => hideEditProfilePicture(false) : undefined} onClick={showProfileModal} className="mask mask-squircle overflow-hidden cursor-pointer rounded-lg z-50 absolute top-0 left-0 w-full h-full bg-gray-900 text-white dark:bg-gray-300 dark:text-black bg-opacity-50 dark:bg-opacity-50 flex items-center justify-center">
                                <svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ">
                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                </svg>
                            </div>
                        )
                    }
                    {
                        profileUser?.profile_image && <Image
                            priority
                            onMouseEnter={!publicUser ? () => showEditProfilePicture(true) : undefined}
                            onClick={!publicUser ? showProfileModal : undefined}
                            src={profileUser?.profile_image}
                            alt={`${profileUser?.username} Profile Image`}
                            quality={80}
                            fill
                            className={`w-52 h-52 overflow-hidden mask mask-squircle ${!publicUser ? "cursor-pointer" : ""}`}
                        />
                    }
                    {
                        !profileUser?.profile_image && <div onMouseEnter={!publicUser ? () => showEditProfilePicture(true) : undefined} onClick={!publicUser ? showProfileModal : undefined} className={`w-52 h-52 rounded-full border-4 border-white ${!publicUser ? "cursor-pointer" : ""}`}>
                            <div className="flex items-center rounded-lg justify-center w-full h-full text-4xl text-white bg-gray-500 dark:bg-gray-400 dark:text-black">
                                {profileUser?.username?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    }

                    <span className={`absolute right-4 top-4 z-50 tooltip ${showPublisherStarTooltip ? "tooltip-open" : ""} tooltip-top`} data-tip={`${user?.username} is a Publisher on Wanderlust`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary-600 cursor-pointer" onMouseEnter={() => setShowPublisherStarTooltip(true)} onMouseLeave={() => setShowPublisherStarTooltip(false)}>
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                    </span>

                
                    {user?.id === profileUser?.id && (
                        <div className="absolute bottom-8 w-full flex justify-center">
                            {!editing && (
                                <button type="button" onClick={() => setEditing(true)} className="w-8/12 px-3 z-50 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Edit Profile</button>
                            )}
                            {
                                editing && (
                                    <div className="flex z-50">
                                        <button type="button" onClick={saveProfileEdit} className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mr-2">Save</button>
                                        <button type="button" onClick={cancelProfileEdit} className="px-3 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Cancel</button>
                                    </div>
                                )
                            }
                        </div>
                    )}
                </div>
                {/* User information cards */}
                <div className="w-full sm:w-1/2 md:w-2/3 flex flex-col justify-center items-center">
                    <div className="stats shadow w-full mb-4">
                        <div className="stat">
                            {
                                (profileUser?.role === 'publisher' || profileUser?.role === 'superadmin') && <div className="stat-desc text-primary-600">Publisher</div>
                            }
                            <div className="stat-value">{profileUser?.name}</div>
                            <div className="stat-title">@{profileUser?.username}</div>
                        </div>
                        
                        <div className="stat">
                            <div className="stat-title">{profileUser?.job}</div>
                            <div className="stat-title">{profileUser?.bio}</div>
                        </div>
                    </div>

                    <div className="stats shadow w-full mb-4">
                        <div className="stat">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 stat-figure text-primary-600">
                                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                            </svg>

                            <div className="stat-title">Followers</div>
                            <div className="stat-value text-primary-600">{followCount}</div>
                            {/* <div className="stat-desc">21% more than last month</div> */}
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 stat-figure text-primary">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="stat-title">Countries</div>
                            <div className="stat-value text-primary">{countries.length}</div>
                            {/* <div className="stat-desc">21% more than last month</div> */}
                        </div>

                        <div className="stat">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 stat-figure text-primary">
                                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>

                            <div className="stat-title">Places</div>
                            <div className="stat-value text-primary">{places.length}</div>
                            {/* <div className="stat-desc">21% more than last month</div> */}
                        </div>
                        
                        <div className="stat">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 stat-figure text-primary">
                                <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
                            </svg>

                            <div className="stat-title">Reviews</div>
                            <div className="stat-value text-primary">{reviewCount}</div>
                            {/* <div className="stat-desc">21% more than last month</div> */}
                        </div>
                    </div>

                    {
                        (profileUser?.role === 'superadmin' || profileUser.role === 'publisher') && <div className="stats shadow w-full mb-4">
                            <div className="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 stat-figure text-primary">
                                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                </svg>
                                <div className="stat-title">Reads</div>
                                <div className="stat-value text-primary">{130}</div>
                                {/* <div className="stat-desc">21% more than last month</div> */}
                            </div>
                            
                            <div className="stat">
                                <div className="stat-figure text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 stat-figure text-primary">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="stat-title">Reader Time</div>
                                <div className="stat-value text-primary">{countries.length}</div>
                                {/* <div className="stat-desc">21% more than last month</div> */}
                            </div>

                            <div className="stat">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 stat-figure text-primary">
                                    <path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clipRule="evenodd" />
                                    <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                                </svg>

                                <div className="stat-title"># of Posts</div>
                                <div className="stat-value text-primary">{places.length}</div>
                                {/* <div className="stat-desc">21% more than last month</div> */}
                            </div>
                            
                        </div>
                    }

                    {/* <a class="block w-full p-4 bg-white/80 border border-gray-200 rounded-lg shadow dark:bg-gray-800/80 dark:border-gray-700"> */}
                        {/* SOCIAL LINKS  */}
                        {!editing && <div className="flex flex-wrap p-4 space-x-2 w-full">
                            {/* <!-- Github --> */}
                            {
                                profileUser?.github && <a href={`https:www.github.com/${profileUser?.github}`} target="_blank">
                                    <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#333" }}>
                                        <svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-4 h-4">
                                            <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                        </svg>
                                    </button>
                                </a>
                            }

                            {/* <!-- Facebook --> */}
                            {
                                profileUser?.facebook && <a href={`https:www.facebook.com/${profileUser?.facebook}`} target="_blank">
                                    <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#1877f2" }}>
                                        <svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                                            <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                        </svg>
                                    </button>
                                </a>
                            }

                            {/* <!-- Instagram --> */}
                            {
                                profileUser?.instagram && <a href={`https:www.instagram.com/${profileUser?.instagram}`} target="_blank">
                                    <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#c13584" }}>
                                        <svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                                            <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                        </svg>
                                    </button>
                                </a>
                            }

                            {/* <!-- Linkedin --> */}
                            {
                                profileUser?.linkedin && <a href={`https:www.linkedin.com/in/${profileUser?.linkedin}`} target="_blank" >
                                    <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#0077b5" }}>
                                        <svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                                            <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                                        </svg>
                                    </button>
                                </a>
                            }

                            {/* <!-- Youtube --> */}
                            {
                                profileUser?.youtube && <a href={`https:www.youtube.com/${profileUser?.youtube}`} target="_blank">
                                    <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#ff0000" }}>
                                        <svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-4 h-4">
                                            <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                                        </svg>
                                    </button>
                                </a>
                            }

                            {/* <!-- TikTok --> */}
                            {
                                profileUser?.tiktok && <a href={`https:www.tiktok.com/@${profileUser?.tiktok}`} target="_blank">
                                    <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#6a76ac" }}>
                                        <svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                                            <path fill="currentColor" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                                        </svg>
                                    </button>
                                </a>
                            }

                            {/* <!-- Twitter --> */}
                            {
                                profileUser?.twitter && <a href={`https:www.twitter.com/${profileUser?.twitter}`} target="_blank">
                                    <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block px-6 py-2.5 mb-2 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" style={{ backgroundColor: "#1da1f2" }}>
                                        <svg xmlns="http:www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
                                            <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                                        </svg>
                                    </button>
                                </a>
                            }
                        </div>}
                    {/* </a> */}
                </div>
            </div>

            {/* Traveler information */}
            <div className="w-full">
                <div className="w-full sm:w-1/3">

                </div>
                <div className="w-full sm:w-2/3 h-80">
                    <div className="radial-progress text-primary h-40 w-40" style={{ "--value": 70 }}>
                        <p>Countries</p>
                        <p className="text-2xl font-extrabold text-gray-800 dark:text-gray-300">{profileUser?.countries}</p>
                    </div>
                </div>
            </div>
            {/* Banner Image */}
            <div className="w-full h-60">
                {
                    profileUser?.bannerImage ? (
                        <Image
                            src={profileUser?.bannerImage}
                            priority
                            onMouseEnter={!publicUser ? () => showEditBanner() : undefined}
                            className="w-full h-full object-cover relative rounded-lg"
                            height={400}
                            width={800}
                            alt={`${profileUser?.username}'s banner image`}
                            onClick={!publicUser ? showBannerModal : undefined}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-lg relative">
                            {
                                !publicUser && (
                                    <div className="absolute right-4 bottom-4">
                                        {/* Pencil icon for edit button  */}
                                        <div className="flex cursor-pointer" onClick={showBannerModal}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 transition-colors">
                                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                                            </svg>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>

            <div>
                {/* Maps  */}
                {
                    profileUser && profileUser.premium &&
                        <div className="flex flex-col mt-8 w-full">
                            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                <li className="mr-2">
                                    <a onClick={() => setSelectedMap('favorites')} className={`${selectedMap === 'favorites' ? "active bg-gray-100 text-primary-600 dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"} transition-colors cursor-pointer inline-block p-4 rounded-t-lg`}>Favorites</a>
                                </li>
                                <li className="mr-2">
                                    <a onClick={() => setSelectedMap('passport')} className={`${selectedMap === 'passport' ? "active bg-gray-100 text-primary-600 dark:bg-gray-800 dark:text-primary-500" : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"} transition-colors cursor-pointer inline-block p-4 rounded-t-lg`}>Passport</a>
                                </li>
                            </ul>
                            {
                                selectedMap === 'favorites' && (
                                    <PlacesMap userPlacesToTry={userPlacesToTry} setUserPlacesToTry={setUserPlacesToTry} user={user} zoom={2.5} coordinates={[17.1317479, 41.6531344]}  places={selectedFilter ? places.filter(place => { return place?.tags?.find(element => element === selectedFilter) }) : places} />
                                )
                            }
                            {
                                selectedMap === 'passport' && (
                                    <CountriesMap
                                        user={profileUser}
                                        defaultZoom={2.5}
                                        coordinates={[17.1317479, 41.6531344]}
                                    />
                                )
                            }
                        </div>
                    }
                    {
                        feed.length > 0 &&
                            <div className="p-2 md:p-10 mt-10 border-t border-primary-200">
                                <TextH2>Feed</TextH2>
                                <div className="flex flex-wrap justify-center px-8 mt-4">
                                    <ol className="relative border-l border-gray-200 dark:border-gray-700">
                                        {
                                            feed.map(post => (
                                                <li className="mb-10 ml-6" key={`publicProfile-reviews-${post?.id}`}>
                                                    <span className="absolute flex items-center justify-center bg-primary-200 rounded-full w-14 h-14 -left-7 ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
                                                        {
                                                            post.city.image_url_thumb ?
                                                                <Image className="h-12 rounded-full shadow-lg w-14" height={30} width={30} src={post.city.image_url_thumb} alt={post.city.name} /> :
                                                                <svg className="w-32 h-32 tex-gra-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                                                        }
                                                    </span>
                                                    <article className="px-8">
                                                        <h4 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{post.city.name}, {post.city.country_name}</h4>
                                                        <footer className="mb-5 text-sm text-left text-gray-500 dark:text-gray-400"><p>posted on <time dateTime={post.createdAt}>{moment(post.createdAt).format('MMMM Do YYYY')}</time></p></footer>
                                                        <p className="mb-2 font-light text-gray-500 dark:text-gray-400">{post.body}</p>
                                                    </article>
                                                </li>
                                            ))
                                        }
                                    </ol>
                                </div>
                            </div>
                    }
                    {
                        blogs.length > 0 &&
                            <div className="p-2 md:p-10 mt-10">
                                <TextH2>Content</TextH2>
                                <div className="flex flex-wrap justify-center px-2 mt-4">
                                    <ol className="gap-y-4 relative border-l border-gray-200 dark:border-gray-700">
                                        {
                                            blogs.map(article => (
                                                <BlogCard post={article} key={`publicProfile-content-${article?.id}`} />
                                            ))
                                        }
                                    </ol>
                                </div>
                            </div>
                    }
                    {
                        reviews.length > 0 &&
                            <div className="p-2 md:p-10 mt-10">
                                <TextH2>City Reviews</TextH2>
                                <div className="flex flex-wrap justify-center pl-8 pr-2 sm:pl-8 sm:pr-8 mt-4">
                                    <ol className="relative border-l border-gray-200 dark:border-gray-700">
                                        {
                                            reviews.map(review => (
                                                <li className="mb-10 ml-6" key={`publicProfile-reviews-${review?.id}`}>
                                                    <span className="absolute flex items-center justify-center bg-primary-200 rounded-full w-14 h-14 -left-7 ring-8 ring-white dark:ring-gray-900 dark:bg-primary-900">
                                                        {
                                                            review.city.image_url_thumb ?
                                                                <Image height={50} width={50} className="h-14 rounded-full shadow-lg w-14" src={review.city.image_url_thumb} alt={`${review.city.name} City Review`} /> :
                                                                <svg className="w-32 h-32 tex-gra-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                                                        }
                                                    </span>
                                                    <article className="pl-6 pr-2 md:pl-8 md:pr-8">
                                                        <h4 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{review.city.name}, {review.city.country_name}</h4>
                                                        <div className="flex items-start sm:items-center mb-1 flex-col sm:flex-row">
                                                            <div className="flex">
                                                                <svg aria-hidden="true" className={`w-5 h-5 ${review.rating >= 1 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                                <svg aria-hidden="true" className={`w-5 h-5 ${review.rating >= 2 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                                <svg aria-hidden="true" className={`w-5 h-5 ${review.rating >= 3 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                                <svg aria-hidden="true" className={`w-5 h-5 ${review.rating >= 4 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                                <svg aria-hidden="true" className={`w-5 h-5 ${review.rating >= 5 ? "text-yellow-400" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                            </div>
                                                            <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">{review.title}</h3>
                                                        </div>
                                                        <footer className="mb-5 text-sm text-left text-gray-500 dark:text-gray-400"><p>Reviewed on <time dateTime={review.createdAt}>{moment(review.createdAt).format('MMMM Do YYYY')}</time></p></footer>
                                                        <p className="mb-2 font-light text-gray-500 dark:text-gray-400">{review.body}</p>
                                                    </article>
                                                </li>
                                            ))
                                        }
                                    </ol>
                                </div>
                            </div>
                        }
                    </div>
                    {/* <div className="w-full mt-4 gap-y-4 flex-col items-center">
                        <div className="flex flex-col sm:flex-row gap-x-4 mb-4">
                            <div className="w-1/2">
                                <LocationSuggestions recommendedLocations={recommendedLocations} />
                            </div>
                            <div className="w-1/2">
                                <FollowSuggestions follows={follows} followUser={followUser} removeFollow={removeFollow} />
                            </div>
                        </div>
                        <Blogs />
                    </div> */}
        </section>
    )
}