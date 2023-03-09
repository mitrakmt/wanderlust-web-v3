import { useState, useEffect, useContext } from "react";

// Components
import Sidebar from '../shared_components/Sidebar/Sidebar';
import OfflineSnackbar from '../components/OfflineSnackbar/OfflineSnackbar';
// import CookiesBar from '../src/components/CookiesBar/CookiesBar';
import Toasts from '../components/Toasts/Toasts';
import request from '../utils/request';

// Context
import { themeContext } from '../context/ThemeProvider';
import { toastsContext } from '../context/ToastsProvider';
import { countriesContext } from '../context/CountriesProvider';

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
    // State
    const [showOfflineSnackbar, setShowOfflineSnackbar] = useState(false);
    const [, setCookiesBarOpen] = useState(false);

    // Context
    const [, setTheme] = useContext(themeContext);
    const [toasts] = useContext(toastsContext);
    const [, setCountries] = useContext(countriesContext);

    // Hooks
    const { login, user, userLoading, setUserLoading, logout } = useAuth();
    const router = useRouter();

    // UseEffects
    // Set theme if localStorage has theme set
    useEffect(() => {
        const theme = localStorage.getItem("color-theme");
        if (theme && theme === 'dark') {
            setTheme(theme)
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            setTheme('light')
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    }, [])

    useEffect(() => {
        // Check if user is logged in and JWT not expired
        let accessToken;
        let forwardPath;
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.has("accessToken")) {
            // Check path for accessToken param
            accessToken = urlParams.get("accessToken");
            const theme = urlParams.get("colorTheme");
            const refreshToken = urlParams.get("refreshToken");
            forwardPath = urlParams.get("forwardPath");
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("color-theme", theme);
        } else {
            accessToken = localStorage.getItem("accessToken");
        }

        if (accessToken) {
            const decodedJwt = parseJwt(accessToken);

            if (!decodedJwt || decodedJwt.exp * 1000 < Date.now()) {
                // Remove accessToken from localStorage
                localStorage.removeItem("accessToken");
                
                // remove refresh token
                localStorage.removeItem("refreshToken");

                setUserLoading(false);
                
                // refresh page
                window.location.reload();
            } else {
                checkAuth(forwardPath);
            }
        } else {
            setUserLoading(false);
        }
    }, [])

    // useEffect(() => {
    //     if (!localStorage.getItem('cookiesAccepted')) {
    //         setCookiesBarOpen(true);
    //     }
    // }, [])
    
    useEffect(() => {
        async function fetchData() {
            const response = await request(`/countries`)
            setCountries(response.data)
        }
        fetchData();
    }, []);

    useEffect(() => {
        window.addEventListener('offline', (e) => {
            setShowOfflineSnackbar(true)
        });
        window.addEventListener('online', (e) => {
            setShowOfflineSnackbar(false)
        });
    }, [])

    // Functions
    const acceptCookies = () => {
        localStorage.setItem('cookiesAccepted', true);
        setCookiesBarOpen(false);
    }

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    const checkAuth = (forwardPath) => {
        if (localStorage.getItem('accessToken')) {
            request(`/users`)
            .then(response => {
                if (!response?.data) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    setUserLoading(false);
                    return;
                }

                login({
                    ...response.data,
                    ...{
                        isLoggedIn: true,
                        role: response?.data?.role
                    }
                }, forwardPath || window.location.pathname);
            })
        } else {
            setUserLoading(false);
        }
    }
    
    
  return (
    <div className="overflow-scroll scroll-smooth bg:bg-gray-200 dark:bg-gray-900 min-h-screen w-full">
        {
            showOfflineSnackbar && <OfflineSnackbar closeSnackbar={() => setShowOfflineSnackbar(false)} />
        }
        <Toasts toasts={toasts} />
        <Sidebar user={user} router={router} userLoading={userLoading} logout={logout} />
        <main className="overflow-scroll scroll-smooth">{children}</main>
    </div>
  )
}