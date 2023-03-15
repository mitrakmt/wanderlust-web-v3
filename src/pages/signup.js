import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Utils
import request from "../utils/request";
import trackClick from "../utils/trackClick";
import trackStat from "../utils/trackStat";

// Hooks
import { useAuth } from "../hooks/useAuth";

function Signup() {
    // hooks
    const { login } = useAuth();
    
    // Components
    const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

    // UseState
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasExistingAccount, setHasExistingAccount] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [resetPasswordSent, setResetPasswordSent] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        trackClick('register')
    }, [])

    const register = async () => {
        if (hasExistingAccount || !email || !password) {
            return;
        }
        trackStat({ type: 'general', property: 'signups' })

        setAuthLoading(true);

        request('/auth/register', {
            method: 'POST',
            body: {
                email,
                password,
                username: uniqueNamesGenerator({
                    dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
                    length: 2
                })
            }
        })
        .then((response) => {
            setAuthLoading(false);

            if (response.message) {
                setAuthError(response.message);

                return;
            }

            setAuthError(null);

            if (response?.data?.tokens) {
                localStorage.setItem("accessToken", response?.data?.tokens.access.token);
                localStorage.setItem("refreshToken", response?.data?.tokens.refresh.token);
                  
                login({
                    ...response.data.user,
                    ...{
                        isLoggedIn: true,
                        role: response?.data?.role
                    }
                }, '/')

                // Reset auth data
                setEmail(null);
                setPassword(null);
                setAuthError(null);
                setAuthLoading(false);
                setResetPasswordSent(false);
                setTermsChecked(false);
            }
        });
    }

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8 flex justify-center items-center min-h-screen">
                <Image
                    src="https://images.unsplash.com/photo-1531804226530-70f8004aa44e?crop=entropy&cs=srgb&fm=webp&ixid=MnwxNzkyODZ8MHwxfGFsbHx8fHx8fHx8fDE2MTY3Mjc5OTE&ixlib=rb-1.2.1&q=85"
                    fill
                    alt="Lake Pukaki, New Zealand"
                    priority
                    className="fixed top-0 left-0 w-full h-full bg-cover opacity-40 z-0"
                />
                <div className="max-w-lg bg-gray-100/90 dark:bg-gray-800/90 rounded-lg p-4 w-full space-y-8 z-10">
                    <div>
                        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                            Sign Up
                        </h1>
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                    </div>
                    {
                        authError && (
                                <div className="text-red-500 text-sm">
                                    {authError}
                            </div>
                            )
                    }
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                                Login
                            </Link>
                        </div>

                        <div className="text-sm">
                            <Link href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={register}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg
                                className="h-5 w-5 text-primary-500 group-hover:text-primary-400 transition ease-in-out duration-150"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M3.707 9.707a1 1 0 0 1 0-1.414L7.586 4H10a1 1 0 1 1 0 2H8.414l2.293 2.293a1 1 0 0 1-1.414 1.414l-2.5-2.5a1 1 0 0 1 0-1.414l2.5-2.5a1 1 0 1 1 1.414 1.414L8.414 7H10a3 3 0 1 1 0 6 1 1 0 0 1 0-2 1 1 0 0 0 0-2H7.586l-2.293-2.293a1 1 0 0 1 1.414-1.414l2.5 2.5a1 1 0 0 1 0 1.414l-2.5 2.5z"
                                    clipRule="evenodd"
                                />
                                </svg>
                            </span>
                            Sign Up
                        </button>
                    </div>
                </div>
        </section>
    );
}

export default Signup;
