import React from "react";
import Image from "next/image";

function LoadingSidebar() {
    return (
        <header>
            {/* MOBILE NAVBAR  */}
            <nav className="block sm:hidden bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                        <a className="flex mr-4 cursor-pointer">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Wanderlust</span>
                        </a>
                    </div>
                    <div className="flex items-center lg:order-2">
                        
                        {/* {
                            !user && (
                                <div className="flex items-center">
                                    <a onClick={() => router.push('/login')} className="cursor-pointer mr-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zM10 2a8 8 0 100 16A8 8 0 0010 2z" clipRule="evenodd"></path></svg>
                                        Sign in
                                    </a>
                                </div>
                            )
                        } */}
                        {/* <!-- Menu --> */}
                        {/* <button onClick={toggleMenuDropdown} className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg aria-hidden="true" className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Toggle sidebar</span>
                        </button> */}
                    </div>
                </div>
            </nav>

            {/* DESKTOP SIDEBAR  */}
            <nav className={`hidden sm:fixed sm:flex sm:visible h-full top-0 bottom-0 left-0 w-16 transition-all`} aria-label="Sidebar">
                <div className={`overflow-hidden relative flex flex-col bg-blend-overlay w-20 justify-between h-full px-3 py-4 overflow-y-auto rounded backdrop-blur-sm dark:bg-gray-800/50 bg-gray-200/50`}>
                    <div className={`absolute overflow-visible cursor-pointer top-4 -right-8}`}>
                        {/* {
                            expanded ? <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-8 text-gray-800 transition duration-75 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                        } */}
                    </div>
                    <ul className="mt-10 space-y-2">
                        {/* {
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
                                            item.premiumRequired && !user?.premium && expanded && <span className="absolute right-0 inline-flex items-center justify-center px-2 h-6 text-sm font-medium text-gray-100 bg-primary-600 rounded-full dark:bg-primary-700 dark:text-gray-200">Premium</span>
                                        }
                                    </li>
                                )
                            })
                        } */}
                    </ul>
                    <ul className="pt-4 mt-auto space-y-2">
                        {/* {
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
                        } */}
                        {/* <li>
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
                        </li> */}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default LoadingSidebar;