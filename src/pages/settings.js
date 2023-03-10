import { useContext, useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce';

// Utils
import request from '../utils/request'
import trackStat from '../utils/trackStat';

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

// Context
import { toastsContext } from '../context/ToastsProvider';

// Components
import InputWithValidation from '../components/InputWithValidation/InputWithValidation'
import CustomButton from '../components/Button/Button';
import DangerButton from '../components/Button/DangerButton';
import Button from '../components/Button/Button';
import TextH2 from '../components/Text/TextH2';
import TextH5 from '../components/Text/TextH5';
import StripeForm from '../components/StripeForm/StripeForm';

export default function Settings() {
    // Hooks
    const { logout, user, setUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/')
        }
    }, [user])

    // Context
    const [toasts, setToasts] = useContext(toastsContext);

    // State
    const [emailChanged, setEmailChanged] = useState(false);
    const [error, setError] = useState(null);
    const [formChanged, setFormChanged] = useState(false);
    const [emailTaken, setEmailTaken] = useState(false);
    const [showCancelMembershipModal, setShowCancelMembershipModal] = useState(false);
    
    // Loading stats
    const [loading, setLoading] = useState(false);

    // Change password state
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState(null);

    // UseEffects
    useEffect(() => {
        trackStat({ type: 'tabViews', property: 'settings' })
    }, [])

    // Functions
    const startLogout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('username')
        logout();
    }

    const deleteAccount = async () => {
        const response = await request(`/users/${user?.id}`, {
            method: 'DELETE',
        })
        
        if (response.message) {
            // TODO: instead of error text, show snackbar
            return;
        }
    
        logout();
    }

    const resetStates = () => {
        setEmailChanged(false);
    }

    const save = async () => {
        setLoading(true);

        let body = {}

        if (emailChanged) {
            body.email = user?.email;
            body.isEmailVerified = false;
        }

        const response = await request(`/users/${user?.id}`, {
            method: 'PUT',
            body
        })

        setLoading(false)

        if (response.message) {
            setError(response.message)
            return;
        }

        setEmailTaken(false);
        setFormChanged(false);
        resetStates(); 
        setUser(response.data)
    }

    const checkEmailTaken = async (email) => {
        if (email.length <= 3) {
            setError("Must be a valid email");
            return;
        }
        const response = await request('/auth/account-exists', {
            method: 'POST',
            body: {
                email,
            }
        })
        if (response.message) {
            setError(response.message);
            return;
        }

        setError(null)
        setEmailTaken(response.data.accountExists)
    }

    const updateEmail = async (e) => {
        setUser({ ...user, email: e.target.value })
        debouncedEmailCheck(e)
    }

    const debouncedEmailCheck = useDebouncedCallback(
        (e) => {
            setFormChanged(true)
            setEmailChanged(true)
            checkEmailTaken(e.target.value)
        },
        600
    );

    const changePassword = async () => {
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setNewPasswordError("Passwords don't match");
            return;
        }

        const response = await request('/auth/change-password', {
            method: 'POST',
            body: {
                oldPassword,
                newPassword,
            }
        })

        if (response.message) {
            setNewPasswordError(response.message);
            return;
        }

        setToasts([
            ...toasts,
            ...[{
              message: 'Password changed successfully',
              type: 'success'
            }]
        ])
        setTimeout(() => {
            let newToasts = [...toasts];
            newToasts.pop();
            setToasts(newToasts);
        }, 2000)
        setNewPasswordError(null);
        setNewPassword("");
        setConfirmNewPassword("");
        setOldPassword("");
    }

    const cancelMembership = async () => {
        const response = await request(`/users/customer`, {
            method: 'DELETE',
            body: {}
        })

        // TODO: check to make sure cancel is successful, if not send toast. try again in a few minutes or contact.
        setUser({
            ...user,
            ...{
                premium: false,
                subscriptionId: null,
                public: false
            }
        })

        setToasts([
            ...toasts,
            ...[{
              message: 'Membership canceled.',
              type: 'success'
            }]
        ])
        setTimeout(() => {
            let newToasts = [...toasts];
            newToasts.pop();
            setToasts(newToasts);
        }, 2000)

        setShowCancelMembershipModal(false);
    }

    // Fetch stripe membership info to show dashboard here

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
                <div className="flex items-center w-full space-between">
                    <TextH2>Settings</TextH2>
                    <div className="ml-auto">
                        <CustomButton onClick={startLogout} type="button" text="Logout" className="text-gray-400 dark:hover:text-white border border-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" />
                    </div>
                </div>
                <div className="grid grid-cols-1 mt-6 gap-y-10">
                    <dl>
                        <div className="mt-4">
                            <InputWithValidation value={user?.email} error={error ? error : emailTaken ? "Email already taken" : null} label="Email" onChange={updateEmail} />
                        </div>
                        {
                            !error && !emailTaken && formChanged && 
                                <button
                                    onClick={save}
                                    type="button"
                                    disabled={error || emailTaken || !formChanged}
                                    className="w-28 mt-4 text-gray-400 dark:hover:text-white border border-gray-800 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                >
                                    {loading ? 
                                        <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg> : 'save'
                                    }
                                </button>
                        }
                        <div className="flex">
                            <div className="w-full p-6 mt-8 mr-0 md:mr-8 bg-white rounded-lg shadow dark:border sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Change Password
                                </h2>
                                <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old password</label>
                                        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} name="old password" id="old-password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" />
                                    </div>
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
                                    <Button text="Change Password" onClick={changePassword} />
                                </div>
                            </div>
                        </div> 
                        <div className="w-full p-2 md:p-6 mt-8 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Membership: {user?.premium ? "Premium" : "Basic"}</h5>
                            <div className="">
                                <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400"></div>
                                    <TextH5 styles={{ margin: 0 }}>Basic</TextH5>
                                    <TextH5 styles={{ margin: 0 }}>Premium</TextH5>
                                </div>
                                <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">City Search</div>
                                    <div>
                                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">Public Profiles</div>
                                    <div>
                                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">City Reviews</div>
                                    <div>
                                        <svg className="w-5 h-5 text-red-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">Save your favorite places around the world</div>
                                    <div>
                                        <svg className="w-5 h-5 text-red-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">Track all thep places you want to travel to</div>
                                    <div>
                                        <svg className="w-5 h-5 text-red-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">Top Airbnbs in the best cities (COMING SOON)</div>
                                    <div>
                                        <svg className="w-5 h-5 text-red-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">Keep track of the countries you&apos;ve visited (<a href="https://www.wanderlustapp.io/blog/version-2" className="text-primary-600 hover:underline" target="_blank">view demo</a>)</div>
                                    <div>
                                        <svg className="w-5 h-5 text-red-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">Community Access</div>
                                    <div>
                                        <svg className="w-5 h-5 text-red-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">Meet premium members in your area (COMING SOON)</div>
                                    <div>
                                        <svg className="w-5 h-5 text-red-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                                    <div className="text-gray-500 dark:text-gray-400">New premium features added monthly!</div>
                                    <div>
                                        <svg className="w-5 h-5 text-red-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <div>
                                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </div>
                                </div>
                            </div>
                            {
                                user?.premium ?
                                    <button onClick={() => setShowCancelMembershipModal(true)} className="mt-8 block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="button">
                                        Cancel Membership
                                    </button> :
                                    <StripeForm stripeCustomerId={user?.stripeCustomerId} />
                            }
                        </div>
                        {
                            showCancelMembershipModal &&
                                <div id="popup-modal" tabIndex="-1" style={{ zIndex: 5000 }} className="fixed top-0 left-0 right-0 flex items-center justify-center w-full h-full overflow-x-hidden overflow-y-auto bg-gray-900/70 md:inset-0 md:h-full">
                                    <div className="relative w-full h-full max-w-md p-4 md:h-auto">
                                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                            <button type="button" onClick={() => setShowCancelMembershipModal(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                            <div className="p-6 text-center">
                                                <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to cancel? We&apos;ll be sad to see you go ☹️</h3>
                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Your membership cancelation will be effective immediately.</h3>
                                                <button type="button" onClick={cancelMembership} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                    Yes, I&apos;m sure
                                                </button>
                                                <button type="button" onClick={() => setShowCancelMembershipModal(false)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                        {/* Danger zone */}
                        <div className="z-50 flex w-full mt-20 h-25 opacity-60 flex-center align-center">
                            <div className="flex px-4 py-5 sm:px-6 w-60 flex-center align-center" style={{ marginLeft: 'auto' }} >
                                <DangerButton text="Delete Account" style={{ margin: 0, marginTop: 'auto' }} onClick={deleteAccount} />
                            </div>
                        </div>
                    </dl>
                </div>
        </section>
    )
}