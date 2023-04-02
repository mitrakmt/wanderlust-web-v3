/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Image from 'next/image';

// New Components
import InputWithAddon from '../components/InputWithAddon/InputWithAddon';
import TextH2 from '../components/Text/TextH2';
import CustomHead from '../shared_components/CustomHead';

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

// Utils
import request from '../utils/request';

export default function Assistant() {
    // State search
    const [currentQuestion, setCurrentQuestion] = useState("countries");
    const [tripParameters, setTripParameters] = useState({});
    const [searchLoading, setSearchLoading] = useState(false);
    const [chatThread, setChatThread] = useState([
        {
            message: "Hi, I'm here to help you plan your next trip. What countries do you want to travel to?",
            from: "bot"
        }
    ]);

    // Hooks
    const { user } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
        if (!user?.premium) {
            router.push('/pro');
        }
    }, [user])
    
    // Functions
    const updateParameters = (key, value) => {
        setTripParameters({
            ...tripParameters,
            [key]: value
        })
    }

    const searchItinerary = () => {
        setSearchLoading(true);
        
        request(`/travel`, {
            method: 'POST',
            body: tripParameters
        })
            .then(res => {
                setChatThread([
                    ...chatThread,
                    {
                        message: res.data,
                        from: "bot"
                    },
                ]);
                setSearchLoading(false);
                setTripParameters({})
            })
    }

    const startNextTripSearch = () => {
        setChatThread([
            ...chatThread,
            {
                message: "What countries do you want to travel to?",
                from: "bot"
            },
        ]);
        setCurrentQuestion("countries");
    }

    const nextQuestion = () => {
        if (currentQuestion === 'countries') {
            setCurrentQuestion("length");
            setChatThread([
                ...chatThread,
                {
                    message: tripParameters.countries,
                    from: "user"
                },
                {
                    message: "How many weeks do you want to travel for?",
                    from: "bot"
                },
            ]);
        } else if (currentQuestion === 'length') {
            setCurrentQuestion("month");
            setChatThread([
                ...chatThread,
                {
                    message: tripParameters.length,
                    from: "user"
                },
                {
                    message: "What month do you want to start you trip?",
                    from: "bot"
                },
            ]);
        } else if (currentQuestion === 'month') {
            setCurrentQuestion("budget");
            setChatThread([
                ...chatThread,
                {
                    message: tripParameters.month,
                    from: "user"
                },
                {
                    message: "Do you have a budget for this trip? Leave blank if you don't have a budget.",
                    from: "bot"
                },
            ]);
        } else {
            setChatThread([
                ...chatThread,
                {
                    message: tripParameters.budget,
                    from: "user"
                }
            ]);
            setCurrentQuestion("");
            searchItinerary();
        }
    }

    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <CustomHead
                title="Your Personal Travel Assistant | Wanderlust App AI Assistant"
                description="Say hello to your personal travel assistant - Wanderlust App AI Assistant. Our AI-powered assistant helps you plan your trips in detail, from finding the best flights and accommodations to creating custom itineraries based on your interests. Our assistant is always learning and improving, so you can trust that your travel plans will be optimized for the best experience. Let Wanderlust App AI Assistant take the stress out of travel planning and help you create unforgettable journeys."
                url="https://www.wanderlustapp.io/assistant"
                image={'/assistantDark1.png'}
                alt="Wanderlust App AI Assistant"
            />

            <TextH2>AI Travel Assistant</TextH2>
            {/* chatbox  */}
            <div className="p-2 md:p-6 bg-gray-200 dark:bg-gray-800 dark:border-gray-700 w-full rounded-lg overflow-scroll scroll" style={{ height: '80vh' }}>
                {
                    chatThread.map((message, index) => {
                        return (
                            <div key={`chatThread-${message.from}-${index}`}>
                                {
                                    message.from === 'user' ?
                                        <div className="chat chat-end">
                                            <div className="chat-image avatar">
                                                <div className="w-10 rounded-full">
                                                    <Image src={user?.profile_image} alt={`${user?.username} profile image`} height={80} width={80} />
                                                </div>
                                            </div>
                                            <div className="chat-header">
                                                {user?.username}
                                                {/* <time className="text-xs opacity-50">{Date.now()}</time> */}
                                            </div>
                                            <div className="chat-bubble">{ message.message }</div>
                                            {/* <div className="chat-footer opacity-50">
                                                Seen at 12:46
                                            </div> */}
                                        </div> :
                                        <div className="chat chat-start">
                                            <div className="chat-image avatar">
                                                <div className="w-10 rounded-full">
                                                    <Image src="/favicon-256x256.png" alt="Wanderlust App Logo" height={80} width={80} />
                                                </div>
                                            </div>
                                            <div className="chat-header">
                                                Wanderlust Bot
                                                {/* <time className="text-xs opacity-50">12:45</time> */}
                                            </div>
                                            <div className="chat-bubble">{message.message}</div>
                                            <div className="chat-footer opacity-50">
                                                Delivered
                                            </div>
                                        </div>
                                }
                            </div>
                        )
                    })
                }
                {
                    currentQuestion === "countries" && <div className="flex flex-col w-full md:w-9/12 ml-auto">
                        <InputWithAddon
                            placeholder="Enter one or multiple countries comma separated"
                            value={tripParameters.countries || ""}
                            autofocus
                            onKeyUp={nextQuestion}
                            onChange={(e) => updateParameters('countries', e.target.value)}
                            symbol="🌎"
                        />
                        <button type="button" onClick={nextQuestion} className="mt-2 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Next Question</button>
                    </div>
                }
                {
                    currentQuestion === "length" && <div className="flex flex-col w-9/12 ml-auto">
                        <InputWithAddon
                            placeholder="Enter the number of weeks"
                            value={tripParameters.length || ""}
                            autofocus
                            onChange={(e) => updateParameters('length', e.target.value)}
                            onKeyUp={nextQuestion}
                            symbol="📅"
                        />
                        <button type="button" onClick={nextQuestion} className="mt-2 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Next Question</button>
                    </div>
                }
                {
                    currentQuestion === "month" && <div className="flex flex-col w-9/12 ml-auto">
                        <InputWithAddon
                            placeholder="Enter the month you want to start your travels."
                            value={tripParameters.month || ""}
                            onKeyUp={nextQuestion}
                            autofocus
                            onChange={(e) => updateParameters('month', e.target.value)}
                            symbol="📅"
                        />
                        <button type="button" onClick={nextQuestion} className="mt-2 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Next Question</button>
                    </div>
                }
                {
                    currentQuestion === "budget" && <div className="flex flex-col w-9/12 ml-auto">
                        <InputWithAddon
                            placeholder="Enter your budget"
                            value={tripParameters.budget || ""}
                            onKeyUp={nextQuestion}
                            autofocus
                            onChange={(e) => updateParameters('budget', e.target.value)}
                            symbol="💰"
                            rightSymbol={"USD"}
                        />
                        <button type="button" onClick={nextQuestion} className="mt-2 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Submit</button>
                    </div>
                }
                {
                    searchLoading && <div className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 my-2 w-9/12 px-4 py-2 rounded-lg animate-pulse bg-primary-300 dark:bg-primary-900"><p className="text-gray-800 dark:text-gray-200 rounded-lg">. . .</p></div>
                }
                {
                    currentQuestion === "" && !searchLoading && <button type="button" onClick={startNextTripSearch} className="mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Start a new trip search</button>
                }
            </div>
        </section>
    )
}