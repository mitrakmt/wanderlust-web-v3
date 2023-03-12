import React, { useState, useContext } from "react";
import Image from "next/image";

// Loading Components
import LoadingSidebar from "../../loading_components/Sidebar";

// Icons
import HomeIcon from "./icons/HomeIcon";
import AdminIcon from "./icons/AdminIcon";
import AssistantIcon from './icons/AssistantIcon';
import CommunityIcon from './icons/CommunityIcon';
import FavoriteIcon from './icons/FavoriteIcon';
import MapIcon from './icons/MapIcon';
import NomadIcon from './icons/NomadIcon';
import ProfileIcon from './icons/ProfileIcon';
import ProIcon from './icons/ProIcon';
import SearchIcon from './icons/SearchIcon';
import SettingsIcon from './icons/SettingsIcon';
import ContactIcon from './icons/ContactIcon';
import LoginIcon from './icons/LoginIcon';

// Context
import { themeContext } from '../../context/ThemeProvider';

function Sidebar({ user, router, userLoading, logout }) {
    const currentPath = router.pathname;

    // Context
    const [theme, setTheme] = useContext(themeContext);

    // State
    const [expanded, setExpanded] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);

    // Consts
    const navbarTabs = [
        {
            title: 'Home',
            path: '/',
            icon: <HomeIcon />,
            authRequired: false,
            premiumRequired: false
        },
        {
            title: 'Search',
            path: '/search',
            icon: <SearchIcon />,
            authRequired: false,
            premiumRequired: false
        },
        {
            title: 'Favorites',
            path: '/favorites',
            icon: <FavoriteIcon disabled={user ? false : true} />,
            authRequired: true,
            premiumRequired: false
        },
        {
            title: 'Pro',
            path: '/pro',
            icon: <ProIcon />,
            authRequired: false,
            premiumRequired: false,
            hideIfPremium: true
        },
        {
            title: 'Map',
            path: '/maps',
            icon: <MapIcon />,
            authRequired: false,
            premiumRequired: true
        },
        {
            title: 'Assistant',
            path: '/assistant',
            icon: <AssistantIcon />,
            authRequired: false,
            premiumRequired: true
        },
        {
            title: 'Community',
            path: '/community',
            icon: <CommunityIcon />,
            authRequired: false,
            premiumRequired: true
        },
        {
            title: 'Nomad',
            path: '/nomad',
            icon: <NomadIcon />,
            authRequired: true,
            premiumRequired: true
        },
        {
            title: 'Admin',
            path: '/admin',
            icon: <AdminIcon />,
            authRequired: true,
            adminOnly: true,
            premiumRequired: true
        },
    ]

    const profileTabs = [
        {
            title: 'Profile',
            path: '/profile',
            icon: <ProfileIcon />,
            authRequired: true,
            premiumRequired: false
        },
        {
            title: 'Settings',
            path: '/settings',
            icon: <SettingsIcon />,
            authRequired: true,
            premiumRequired: false
        },
        {
            title: 'Login',
            path: '/login',
            icon: <LoginIcon />,
            authRequired: false,
            premiumRequired: false,
            hideIfLoggedIn: true
        },
        {
            title: 'Help',
            path: '/contact',
            icon: <ContactIcon />,
            authRequired: false,
            premiumRequired: false
        }
    ];
    
    // Functions
    const toggleSidebar = () => {
        setExpanded(!expanded)
    }

    const toggleTheme = () => {
        // if set via local storage previously
        if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
                setTheme('dark')
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            } else {
                setTheme('light')
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            }
        // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
    }

    const changePage = (path) => {
        router.push(path)
        setExpanded(false)
        setMenuDropdownOpen(false);
        setProfileDropdownOpen(false);
    }

    const toggleProfileDropdown = () => {
        setProfileDropdownOpen(!profileDropdownOpen)
        setMenuDropdownOpen(false)
    }

    const toggleMenuDropdown = () => {
        setProfileDropdownOpen(false)
        setMenuDropdownOpen(!menuDropdownOpen)
    }

    if (userLoading) return <LoadingSidebar />

    return (
        <header>
            {/* MOBILE NAVBAR  */}
            <nav className="block sm:hidden bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                        <a onClick={() => router.push('/')} className="flex mr-4 cursor-pointer">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Wanderlust</span>
                        </a>
                    </div>
                    <div className="flex items-center lg:order-2">
                        {/* <!-- Notifications Button--> */}
                        {/* <button type="button" data-dropdown-toggle="notification-dropdown" className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                            <span className="sr-only">View notifications</span>
                            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                        </button> */}
                        {/* <!-- Dropdown menu for Notification --> */}
                        {/* <div className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700" id="notification-dropdown">
                            <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                Notifications
                            </div>
                            <div>
                            <a href="#" className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                                <div className="flex-shrink-0">
                                <img className="w-11 h-11 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png" alt="Bonnie Green avatar" />
                                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700">
                                    <svg aria-hidden="true" className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                </div>
                                </div>
                                <div className="pl-3 w-full">
                                    <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>: "Hey, what's up? All set for the presentation?"</div>
                                    <div className="text-xs font-medium text-primary-700 dark:text-primary-400">a few moments ago</div>
                                </div>
                            </a>
                            <a href="#" className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
                                <div className="flex-shrink-0">
                                <img className="w-11 h-11 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png" alt="Robert image" />
                                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white dark:border-gray-700">
                                    <svg aria-hidden="true" className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                </div>
                                </div>
                                <div className="pl-3 w-full">
                                    <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">Robert Brown</span> posted a new video: Glassmorphism - learn how to implement the new design trend.</div>
                                    <div className="text-xs font-medium text-primary-700 dark:text-primary-400">3 hours ago</div>
                                </div>
                            </a>
                            </div>
                            <a href="#" className="block py-2 text-base font-normal text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline">
                                <div className="inline-flex items-center ">
                                <svg aria-hidden="true" className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                                View all
                                </div>
                            </a>
                        </div> */}
                        {
                            !user && (
                                <div className="flex items-center">
                                    <a onClick={() => router.push('/login')} className="cursor-pointer mr-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zM10 2a8 8 0 100 16A8 8 0 0010 2z" clipRule="evenodd"></path></svg>
                                        Sign in
                                    </a>
                                </div>
                            )
                        }
                        {/* <!-- Menu --> */}
                        <button onClick={toggleMenuDropdown} className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg aria-hidden="true" className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Toggle sidebar</span>
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        {
                            menuDropdownOpen && (
                                <div className="relative">
                                    <div className="absolute right-0 top-0 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            Menu
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 p-4">
                                            {
                                                navbarTabs.map(({ title, icon, path, authRequired, premiumRequired, adminOnly }) => {
                                                    if (authRequired && !user) return null;
                                                    if (premiumRequired && !user?.is_premium) return null;
                                                    if (adminOnly && !user?.role === 'superadmin') return null;
                                            
                                                    return (
                                                        <a key={`navbarTabs-mobile-${title}`} onClick={() => changePage(path)} className={`${premiumRequired && !user?.premium ? "disabled cursor-not-allowed" : ""} flex flex-col items-center justify-center cursor-pointer p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group`}>
                                                            {icon}
                                                            <div className="text-xs mt-1 text-gray-900 dark:text-white">{title}</div>
                                                        </a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        
                        {
                            user && (
                                <button type="button" onClick={toggleProfileDropdown} className="flex items-center justify-center mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                    <Image className="w-8 h-8 rounded-full ml-2" width={30} height={30} src={user?.profile_image || "https://wanderlust-extension.s3.us-west-2.amazonaws.com/no-user.webp"} alt={`${user?.name} Profile Picture`} />
                                </button>
                            )
                        }
                        {/* <!-- Dropdown menu --> */}
                        {
                            profileDropdownOpen && (
                                <div className="relative">
                                    <div className="absolute right-0 top-0 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <div className="py-3 px-4">
                                            <span className="block text-sm font-semibold text-gray-900 dark:text-white">{user.name}</span>
                                            <span className="block text-sm font-light text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                                        </div>
                                        <ul className="py-1 font-light text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                                            {
                                                profileTabs.map(({ title, icon, path, hideIfLoggedIn }) => {
                                                    if (hideIfLoggedIn && user) return null;
                                            
                                                    return (
                                                        <li key={`menuTabs-mobile-${title}`}>
                                                            <a onClick={() => changePage(path)} className="flex cursor-pointer items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                {icon}
                                                                <span className="ml-2">{title}</span>
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                            }
                                            {
                                                !user?.premium && (
                                                    <li>
                                                        <a onClick={() => changePage('/pro')} className="flex cursor-pointer justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                            <span className="flex items-center">
                                                                <svg aria-hidden="true" className="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path></svg> Pro version
                                                            </span>
                                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                                        </a>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                        <ul className="py-1 font-light text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                                            <li>
                                                <a onClick={logout} className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </nav>

            {/* DESKTOP SIDEBAR  */}
            <nav className={`hidden sm:fixed sm:flex sm:visible h-full ${expanded ? user?.premium ? 'w-52' : 'w-64' : 'w-16'} top-0 bottom-0 left-0`} style={{ zIndex: 3000 }} aria-label="Sidebar">
                <div className={`overflow-hidden relative flex flex-col bg-blend-overlay justify-between h-full px-3 py-4 overflow-y-auto rounded backdrop-blur-sm ${expanded ? user?.premium ? 'w-52' : 'w-64' : 'w-16'} transition-all ${expanded ? 'dark:bg-gray-800/80' : "dark:bg-gray-800/50"} ${expanded ? 'bg-gray-200/80' : "bg-gray-200/50"}`}>
                    <div className={`absolute overflow-visible cursor-pointer top-4 ${expanded ? "-right-6" : "-right-8"}`} onClick={toggleSidebar}>
                        {
                            expanded ? <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                        }
                    </div>
                    <ul className="mt-10 space-y-2">
                        {
                            navbarTabs.map((item) => {
                                if (item.adminOnly && user?.role !== 'superadmin') return null
                                if (item.authRequired && !user) return null
                                if (item.hideIfPremium && user?.premium) return null

                                return (
                                    <li key={`navbarTabs-desktop-${item.title}`} className="flex items-center relative">
                                        <a onClick={() => { changePage(item.path) }  } className={`${item.premiumRequired && !user?.premium ? "disabled pointer-events-none" : ""} flex items-center p-2 text-sm font-normal text-gray-900 rounded-lg cursor-pointer dark:text-white hover:bg-gray-100 w-full dark:hover:bg-gray-700 ${currentPath === item.path ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                                            {item.icon}
                                            {expanded && <span className="ml-5">{item.title}</span>}
                                        </a>
                                        {
                                            item.premiumRequired && !user?.premium && expanded && <span className="absolute right-0 inline-flex items-center justify-center px-2 h-6 text-sm font-medium text-gray-100 bg-primary-600 rounded-full dark:bg-primary-700 dark:text-gray-200">Pro</span>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <ul className="pt-4 mt-auto space-y-2">
                        {
                            profileTabs.map((item) => {
                                if (item.authRequired && !user) return null;
                                if (item.hideIfLoggedIn && user) return null;

                                return (
                                    <li key={`profileTabs-desktop-${item.title}`}>
                                        <a onClick={() => changePage(item.path)} className="flex items-center p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                            {item.icon}
                                            {expanded && <span className={`ml-5 ${item.authRequired && user ? "text-gray-400" : ""}`}>{item.title}</span>}
                                        </a>
                                    </li>
                                )
                            })
                        }
                        <li>
                            <a onClick={toggleTheme} className="flex items-center p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                                {
                                    theme === 'dark' ? <svg xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 w-6 h-6 text-gray-800 transition duration-75 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-600 transition-colors`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" className={`flex-shrink-0 w-6 h-6 text-gray-800 transition duration-75 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-600 transition-colors`} viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                        </svg>
                                }
                                {expanded && <span className="ml-3">Theme</span>}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Sidebar;