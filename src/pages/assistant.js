import { useEffect, useState } from 'react';

// New Components
import InputWithAddon from '../components/InputWithAddon/InputWithAddon';
import TextH2 from '../components/Text/TextH2';

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

// Utils
import request from '../utils/request';
import trackStat from '../utils/trackStat';

export default function Trips() {
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

    if (!user?.premium) {
        router.push('/pro')
    }
    
    // UseEffects
    useEffect(() => {
        trackStat({ type: 'tabViews', property: 'trips' })
    }, [])

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
            <TextH2>AI Travel Assistant</TextH2>
            {/* chatbox  */}
            <div className="p-2 md:p-6 bg-gray-200 dark:bg-gray-700 w-full rounded-lg overflow-scroll scroll" style={{ height: '80vh' }}>
                {
                    chatThread.map((message, index) => {
                        return (
                            <p key={`chatThread-${message.from}-${index}`} className={`text-gray-800 dark:text-gray-200 my-2 w-full md:w-9/12 px-4 py-2 rounded-lg ${message.from === 'user' ? "ml-auto bg-gray-300 dark:bg-gray-900" : "bg-blue-300 dark:bg-blue-900"}`}>{message.message}</p>
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
                        <button type="button" onClick={nextQuestion} className="mt-2 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Next Question</button>
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
                        <button type="button" onClick={nextQuestion} className="mt-2 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Next Question</button>
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
                        <button type="button" onClick={nextQuestion} className="mt-2 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Next Question</button>
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
                        <button type="button" onClick={nextQuestion} className="mt-2 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Submit</button>
                    </div>
                }
                {
                    searchLoading && <div className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 my-2 w-9/12 px-4 py-2 rounded-lg animate-pulse bg-blue-300 dark:bg-blue-900"><p className="text-gray-800 dark:text-gray-200 rounded-lg">. . .</p></div>
                }
                {
                    currentQuestion === "" && !searchLoading && <button type="button" onClick={startNextTripSearch} className="mt-2 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Start a new trip search</button>
                }
            </div>
        </section>
    )
}