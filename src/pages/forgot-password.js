import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import CustomHead from '../shared_components/CustomHead';

// Utils
import request from "../utils/request";

function ForgotPassword() {
    // Change password state
    const [resetPasswordError, setResetPasswordError] = useState(null);
    const [email, setEmail] = useState("");
    const [resetPasswordSent, setResetPasswordSent] = useState(false);

    const sendResetPassword = () => {
        if (!email) {
            return;
        }

        request(`/auth/forgot-password`, {
            method: "POST",
            body: {
                email
            }
        })
            .then(response => {
                setResetPasswordSent(true);
            })
    }

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8 flex justify-center items-center min-h-screen">
            <CustomHead 
                title="Forgot Your Wanderlust App Password? | Account Recovery"
                description="Don't worry if you've forgotten your Wanderlust App password. Our account recovery page makes it easy to reset your password and regain access to your account. Enter your email address and follow the instructions to reset your password and get back to planning your travels. Don't let a forgotten password stop you from exploring the world. Reset your Wanderlust App password now."
                url="https://www.wanderlustapp.io/forgot-password"
                image="https://uploads-ssl.webflow.com/62893f6b6c73c80d757c8d0d/629378f07e3c95055ebae0ca_Screen%20Shot%202022-05-29%20at%204.38.07%20PM%20(1).jpg"
                alt="Forgot Password - Wanderlust App"
            />

            <Head>
                <title>Forgot Your Wanderlust App Password? | Account Recovery</title>
                <meta key="description" name="description" content="Don't worry if you've forgotten your Wanderlust App password. Our account recovery page makes it easy to reset your password and regain access to your account. Enter your email address and follow the instructions to reset your password and get back to planning your travels. Don't let a forgotten password stop you from exploring the world. Reset your Wanderlust App password now." />

                {/* <!-- Open Graph / Facebook --> */}
                <meta key="type" property="og:type" content="website" />
                <meta key="title" property="og:title" content="Forgot Your Wanderlust App Password? | Account Recovery" />
                <meta key="url" property="og:url" content="https://www.wanderlustapp.io/forgot-password" />
                <meta key="description" property="og:description" content="Don't worry if you've forgotten your Wanderlust App password. Our account recovery page makes it easy to reset your password and regain access to your account. Enter your email address and follow the instructions to reset your password and get back to planning your travels. Don't let a forgotten password stop you from exploring the world. Reset your Wanderlust App password now." />
                {/* <meta property="og:image" content={blog?.image_url} /> */}

                {/* <!-- Twitter --> */}
                <meta key="card" property="twitter:card" content="summary_large_image" />
                <meta key="title" property="twitter:title" content="Forgot Your Wanderlust App Password? | Account Recovery" />
                <meta key="url" property="twitter:url" content="https://www.wanderlustapp.io/forgot-password" />
                <meta key="description" property="twitter:description" content="Don't worry if you've forgotten your Wanderlust App password. Our account recovery page makes it easy to reset your password and regain access to your account. Enter your email address and follow the instructions to reset your password and get back to planning your travels. Don't let a forgotten password stop you from exploring the world. Reset your Wanderlust App password now." />
                {/* <meta property="twitter:image" content={blog?.image_url} /> */}
            </Head>
            <Image
                src="https://images.unsplash.com/photo-1531804226530-70f8004aa44e?crop=entropy&cs=srgb&fm=webp&ixid=MnwxNzkyODZ8MHwxfGFsbHx8fHx8fHx8fDE2MTY3Mjc5OTE&ixlib=rb-1.2.1&q=85"
                fill
                alt="Lake Pukaki, New Zealand"
                priority
                className="fixed top-0 left-0 w-full h-full bg-cover opacity-40 z-0"
            />
            <div className="max-w-lg bg-gray-100/90 dark:bg-gray-800/90 rounded-lg p-4 w-full space-y-8 z-10">
                <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                    Forgot Password
                </h1>
                <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="your@email.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
                    {
                        resetPasswordError && <p className="text-sm text-red-700">{resetPasswordError}</p>
                    }
                    {
                        resetPasswordSent && <p className="text-sm text-green-700">Password reset email sent!</p>
                    }
                    <div>
                        <div className="flex items-center justify-between my-4">
                            <div className="flex items-center">
                                <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                                    Login
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={sendResetPassword}
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
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;
