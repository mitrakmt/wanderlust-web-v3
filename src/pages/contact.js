import { useState } from 'react';

// Components
import Footer from '../components/Footer';

// Utils
import request from '../utils/request';

export default function Contact() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    // Functions
    const submitForm = async () => {
        if (!email || !message || !subject) {
            setError(true);
            return;
        }

        setError(false);

        const response = await request('/contact', {
            method: 'POST',
            body: {
                email,
                message,
                subject,
            },
        });

        setEmail('');
        setMessage('');
        setSubject('');
        setSuccess(true);

        setTimeout(() => {
            setSuccess(false);
        }, 5000);
    };   

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Pro plan? Let us know.</p>
                <div className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@wanderlustapp.io" required />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                        <input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                    </div>
                    {/* show success message */}
                    {
                        success && (
                            <div className="flex items-center justify-between px-4 py-3 text-sm font-medium text-green-900 bg-green-100 rounded-md border border-green-300">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M5 10a1 1 0 011.707 0L10 13.293l3.293-3.292a1 1 0 111.414 1.414l-3.999 3.999a1 1 0 01-1.414 0l-2-2A1 1 0 015 10z" clipRule="evenodd" />
                                    </svg>
                                    <span>Message sent successfully!</span>
                                </div>
                            </div>
                        )
                    }

                    {/* show error message */}
                    {
                        error && (
                            <div className="flex items-center justify-between px-4 py-3 text-sm font-medium text-red-900 bg-red-100 rounded-md border border-red-300">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M5 10a1 1 0 011.707 0L10 13.293l3.293-3.292a1 1 0 111.414 1.414l-3.999 3.999a1 1 0 01-1.414 0l-2-2A1 1 0 015 10z" clipRule="evenodd" />
                                    </svg>
                                    <span>Please fill out all fields</span>
                                </div>
                            </div>
                        )
                    }
                    
                    <button type="submit" onClick={submitForm} className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
                </div>
            </div>
            <Footer />
        </section>
    )
}