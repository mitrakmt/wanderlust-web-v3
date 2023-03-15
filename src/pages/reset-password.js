import { useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

// Utils
import request from "../utils/request";

function PasswordReset() {
    // Change password state
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState(null);

    // Params
    const searchParams = useSearchParams();

    // Hooks
    const router = useRouter();

    const resetPassword = async () => {
        if (!newPassword || !confirmNewPassword) {
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setNewPasswordError("Passwords don't match");
            return;
        }

        const response = await request('/auth/reset-password', {
            method: 'POST',
            query: `token=${searchParams.get("token")}`,
            body: {
                password: newPassword,
            },
        })

        if (response.message) {
            setNewPasswordError(response.message);
            return;
        }

        router.push("/login")
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
            <div className="max-w-md w-full space-y-8 z-10">
                <div>
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                        Password Reset
                    </h1>
                </div>
                <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
                    {
                        newPasswordError && <p className="text-sm text-red-700">{newPasswordError}</p>
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
                                onClick={resetPassword}
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

export default PasswordReset;
