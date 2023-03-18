import { useContext, useEffect, useState } from 'react';
import request from '../utils/request';
import trackStat from '../utils/trackStat';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Head from 'next/head'

// Components
import ProfileCard from '../components/ProfileCard/ProfileCard';
import LoadingProfileCard from '../components/LoadingProfileCard/LoadingProfileCard';
import UsersImageRow from '../components/UsersImageRow/UsersImageRow';
import Button from '../components/Button/Button';

// Hooks
import { useAuth } from '../hooks/useAuth';

// Context
import { communityContext } from '../context/CommunityProvider';
import { followsContext } from '../context/FollowsProvider';
import { followingContext } from '../context/FollowingProvider';
import { followersContext } from '../context/FollowersProvider';

// New Components
import InputWithAddon from '../components/InputWithAddon/InputWithAddon';
import TextH2 from '../components/Text/TextH2';
import CustomButton from '../components/Button/Button';

export default function Community() {
    // Hooks
    const { user } = useAuth();
    const router = useRouter();

    // Context
    const [community, setCommunity] = useContext(communityContext);
    const [follows, setFollows] = useContext(followsContext);
    const [followers, setFollowers] = useContext(followersContext);
    const [following, setFollowing] = useContext(followingContext);

    // State tabs
    const [selectedTab, setSelectedTab] = useState('search');

    // State search
    const [communitySearchTerm, setCommunitySearchTerm] = useState("");

    // State loading
    const [searchCommunityLoading, setSearchCommunityLoading] = useState(true);
    
    useEffect(() => {
        if (!user?.premium) {
            router.push('/pro')
        }
    }, [user])

    // UseEffects
    useEffect(() => {
        trackStat({ type: 'tabViews', property: 'community' })
    }, [])

    useEffect(() => {
        request(`/users/public/popular`)
            .then(res => {
                setCommunity(res.data);
                setSearchCommunityLoading(false);
            })
    }, [])

    useEffect(() => {
        if (user) {
            request(`/follows/all`)
                .then(res => {
                    setFollows(res.data);
                })
        }
    }, [])

    useEffect(() => {
        request(`/follows/followers`)
            .then(res => {
                setFollowers(res.data);
            })
    }, [])

    useEffect(() => {
        request(`/follows/following`)
            .then(res => {
                setFollowing(res.data);
            })
    }, [])

    // Functions
    const clearCommunitySearch = () => {
        request(`/users/public/popular`)
            .then(res => {
                setCommunity(res.data);
            })
        setCommunitySearchTerm("");
    }

    const searchCommunity = () => {
        if (!communitySearchTerm) {
            request(`/users/public/popular`)
                .then(res => {
                    setCommunity(res.data);
                })
            return;
        }

        setSearchCommunityLoading(true);
        request(`/users/public?search=${communitySearchTerm}`)
            .then(res => {
                setCommunity(res.data);
                setSearchCommunityLoading(false);
                trackStat({ type: 'clicks', property: 'searchCommunity' })
            })
    }

    const followUser = (userId) => {
        setFollows([ ...follows, ...[userId]])
        trackStat({ type: 'general', property: 'follows' })
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
        trackStat({ type: 'general', property: 'unfollows' })
        request(`/follows`, {
            method: "DELETE",
            body: {
                userId
            }
        })
    }

    const changeTab = (e) => {
        // Change tabs
        setSelectedTab(e.target.id)

        if (e.target.id === "followers") {
            request(`/follows/followers`)
                .then(res => {
                    setFollowers(res.data);
                })

            trackStat({ type: 'tabViews', property: 'followers' })
        } else if (e.target.id === "following") {
            request(`/follows/following`)
            .then(res => {
                setFollowing(res.data);
            })
            
            trackStat({ type: 'tabViews', property: 'following' })
        }
    }

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <Head>
                <title>Connect with Fellow Nomads | Join the Wanderlust App Community</title>
                <meta
                    name="description"
                    content="Join the Wanderlust App Community and connect with fellow digital nomads around the world. Our Community page allows you to follow and connect with like-minded travelers, share travel tips, and discover new destinations. Whether you're looking for travel inspiration or want to network with other digital nomads, our community is the perfect place to connect. Join the Wanderlust App Community and enhance your travel experience."
                />
            </Head>
            <TextH2>Community</TextH2>
            <div className="mt-8">
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#tabs" role="tablist">
                        <li className="mr-2" role="presentation">
                            <button onClick={changeTab} className={`inline-block p-4 rounded-t-lg ${selectedTab === 'search' ? "text-primary-600 border-b-2 border-primary-600 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-500 dark:border-primary-500" : "text-gray-500 border-b-2 border-transparent border-gray-100 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent dark:text-gray-400 dark:border-gray-700"} `} id="search" data-tabs-target="#search" type="button" role="tab" aria-controls="search">Search</button>
                        </li>
                        <li className="mr-2" role="presentation">
                            <button onClick={changeTab} className={`inline-block p-4 rounded-t-lg ${selectedTab === 'followers' ? "text-primary-600 border-b-2 border-primary-600 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-500 dark:border-primary-500" : "text-gray-500 border-b-2 border-transparent border-gray-100 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent dark:text-gray-400 dark:border-gray-700"} `} id="followers" data-tabs-target="#followers" type="button" role="tab" aria-controls="followers">Followers</button>
                        </li>
                        <li className="mr-2" role="presentation">
                            <button onClick={changeTab} className={`inline-block p-4 rounded-t-lg ${selectedTab === 'following' ? "text-primary-600 border-b-2 border-primary-600 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-500 dark:border-primary-500" : "text-gray-500 border-b-2 border-transparent border-gray-100 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent dark:text-gray-400 dark:border-gray-700"} `} id="following" data-tabs-target="#following" type="button" role="tab" aria-controls="following">Following</button>
                        </li>
                    </ul>
                </div>
                <div id="tabs">
                    {
                        selectedTab === 'search' && 
                            <div className="p-4 rounded-lg" id="search" role="tabpanel" aria-labelledby="search">
                                <div className="flex items-end">
                                    {
                                        communitySearchTerm.length > 0 &&
                                            <button
                                                style={{ marginBottom: '4px', marginRight: '8px' }}
                                                className="flex items-center justify-center h-8 px-5 py-5 button button-close"
                                                onClick={clearCommunitySearch}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-x-circle featherButton"
                                                >
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                                </svg>
                                            </button>
                                    }
                                    <div className="w-full">   
                                        <div className="relative">
                                            <InputWithAddon
                                                onChange={(e) => setCommunitySearchTerm(e.target.value)}
                                                onKeyUp={searchCommunity}
                                                label="Search"
                                                value={communitySearchTerm}
                                                symbol={<svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>}
                                                type="text"
                                                placeholder="Search for a traveler..."
                                            />
                                            <div className="absolute right-0 top-7">
                                                <CustomButton disabled={searchCommunityLoading ? true : false} onClick={searchCommunity} text="Search" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 xl:gap-8">
                                    {
                                        searchCommunityLoading ? 
                                            new Array(6).fill(6).map((val, index) => (
                                                <LoadingProfileCard key={`community-loadingProfile-${index}`} />
                                            )) :
                                            community?.map((publicUser, index) => (
                                                <ProfileCard user={publicUser} userId={publicUser._id} currentUserId={user._id} follows={follows} removeFollow={removeFollow} followUser={followUser} key={`profileCard-${user.id}-${index}`} />
                                            ))
                                    }
                                </div>
                            </div>
                    }
                    {
                        selectedTab === 'followers' && 
                            <div className="p-0 md:p-4 rounded-lg" id="followers" role="tabpanel" aria-labelledby="followers">
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 xl:gap-8">
                                    {
                                        followers.length > 0 && followers?.map((follow, index) => (
                                            <ProfileCard user={follow.user} userId={follow.user.id} currentUserId={user.id} follows={follows} removeFollow={removeFollow} followUser={followUser} key={`profileCard-${follow.id}-${index}`} />
                                        ))
                                    }
                                </div>
                            </div>
                    }
                    {
                        selectedTab === 'followers' && followers.length === 0 && <div className="flex flex-col items-center justify-center max-w-md mt-10 ml-auto mr-auto">
                            <TextH2 classes="text-center">You don&apos;t have any followers yet :(</TextH2>
                                <UsersImageRow />
                            </div>
                    }
                    {
                        selectedTab === 'following' && following.length > 0 &&
                            <div className="p-0 md:p-4 rounded-lg" id="following" role="tabpanel" aria-labelledby="following">
                                <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 xl:gap-8">
                                    {
                                        following?.map((follow, index) => (
                                            <ProfileCard user={follow.following} userId={follow.following.id} currentUserId={user.id} follows={follows} removeFollow={removeFollow} followUser={followUser} key={`profileCard-${follow.id}-${index}`} />
                                        ))
                                    }
                                </div>                                
                            </div>
                    }
                    {
                        selectedTab === 'following' && following.length === 0 && <div className="flex flex-col items-center justify-center max-w-md mt-10 ml-auto mr-auto">
                            <TextH2 classes="text-center">You haven&apos;t followed anyone yet :(</TextH2>
                            <Button onClick={() => setSelectedTab('search')} text="Follow some travelers" />
                            <UsersImageRow />
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </section>
    )
}