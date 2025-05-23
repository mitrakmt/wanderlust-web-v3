import { useState, useEffect } from 'react';

// Utils
import request from '../utils/request';

export default function PlacesMap({ updateFavoritesList, currentFavorites = [], showAddToFavorites = false, closePlaceOverlay, isPublicMap, removePlace, selectedMarker }) {
    const [mobileNumber, setMobileNumber] = useState('');
    const [showMobileTerms, setShowMobileTerms] = useState(false);
    const [acceptedMobileTerms, setAcceptedMobileTerms] = useState(false);
    const [isAlreadyFavorited, setIsAlreadyFavorited] = useState(false);
    const [mobileMessageSentSuccess, setMobileMessageSentSuccess] = useState(false);
    const [mobileSendInProgress, setMobileSendInProgress] = useState(false);

    // UseEffects
    useEffect(() => {
        // Search currentFavorites for selectedMarker.id
        if (selectedMarker) {
            setMobileMessageSentSuccess(false);
            if (hasMarkerId(currentFavorites, selectedMarker.google_id)) {
                setIsAlreadyFavorited(true)
            } else {
                setIsAlreadyFavorited(false)
            }
        }
    }, [selectedMarker, currentFavorites]);

    // Functions
    function hasMarkerId(markers, google_id) {
        return markers.some(marker => marker.google_id === google_id);
    }
    
    const viewPlace = () => {
        window.open(`https://www.google.com/maps/place/?q=place_id:${selectedMarker.google_id}`, '_blank');
    }

    const sendPlaceToMobile = () => {
        if (mobileSendInProgress) {
            return;
        }
        
        setMobileSendInProgress(true);
        if (!acceptedMobileTerms) {
            return;
        }

        request(`/sms/place`, {
            method: 'POST',
            body: JSON.stringify({
                name: selectedMarker.name,
                link: `https://www.google.com/maps/place/?q=place_id:${selectedMarker.google_id}`,
                address: selectedMarker.address,
                phoneNumber: mobileNumber,
                note: selectedMarker.note,
                google_place_id: selectedMarker.google_id
            })
        }).then(status => {
            if (status.data.success) {
                // Show success message, disable button
                setMobileMessageSentSuccess(true)
            }
            setMobileSendInProgress(false);
        })
    }

    const triggerAcceptMobileTerms = function () {
        setAcceptedMobileTerms(true);
        setShowMobileTerms(false)
    }

    const addToFavorites = () => {
        // Request to add selectedMarker to favorites
        request('/placesToTry/convertToFavorite', {
            method: 'PUT',
            body:  JSON.stringify({
                placeId: selectedMarker.id
            })
        }).then(response => {
            if (response.data) {
                // Remove the selectedMarker from placesToTry list
                updateFavoritesList([...currentFavorites, ...[selectedMarker]]);
                removePlace(selectedMarker.id, true)
                // remove selectedMarker from state
                closePlaceOverlay()
            }
        })
    }

    return (
        <div style={{ zIndex: 1000 }} className={`absolute top-0 ${selectedMarker ? "right-0" : "-right-80"} w-80 h-screen p-4 transition-all bg-white dark:bg-gray-800`} tabIndex="-1">
            <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Place</h5>
            <button type="button" onClick={closePlaceOverlay} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close menu</span>
            </button>
            <div className="w-full">
                <div className="flex flex-col items-center pb-4">
                    <h5 className="mb-1 text-lg text-center font-medium text-gray-900 dark:text-white">{`${selectedMarker?.name}`}</h5>
                    <p className="text-sm text-center text-gray-700 dark:text-gray-200 mt-4">Notes:</p>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">{`${selectedMarker?.note || "None"}`}</p>
                    <p className="text-sm text-center text-gray-700 dark:text-gray-200 mt-4">Address:</p>
                    <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-4">{`${selectedMarker?.address || "None"}`}</p>
                    <div className="flex flex-wrap items-center justify-center my-4">
                        {
                            selectedMarker?.tags.map((tag) => (
                                <span key={`placeCard-tags-${selectedMarker.id}-${tag}`} className={`bg-primary-100 mr-1 mb-1 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300`}>{tag}</span>
                            ))
                        }
                    </div>
                    <div className="flex mt-4 justify-center w-full">
                        <a onClick={viewPlace} className="cursor-pointer inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700">View on Google</a>
                        {
                            !isPublicMap && (
                                <a onClick={() => { removePlace(selectedMarker.id); closePlaceOverlay(); }} className="cursor-pointer inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700">Remove</a>
                            )
                        }
                    </div>
                    {
                        showAddToFavorites && !isAlreadyFavorited && (
                            <a onClick={addToFavorites} className="cursor-pointer mt-4 inline-flex items-center mx-1 px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700">Remove & Add to Favorites</a>
                        )
                    }
                </div>

                <div className="mt-4 mb-8">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Send to Mobile</label>
                        <input type="confirm-password" onChange={(e) => {
                            setMobileNumber(e.target.value)
                            setMobileMessageSentSuccess(false)
                        }} name="confirm-password" id="confirm-password" placeholder="Phone number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary-500" />
                    </div>
                    <div className="flex items-start my-2">
                        <div className="flex items-center h-5">
                            <input checked={acceptedMobileTerms} onChange={() => setAcceptedMobileTerms(!acceptedMobileTerms)} aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                        <div className="ml-3 text-sm cursor-pointer">
                            <label onClick={() => setShowMobileTerms(true)} className="cursor-pointer font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">Terms and Conditions</a></label>
                        </div>
                    </div>
                    {
                        mobileMessageSentSuccess ?
                            <button className="cursor-auto w-full text-white bg-green-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sent</button>
                            : <button type="submit" onClick={sendPlaceToMobile} className="w-full flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">{mobileSendInProgress ? 
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div> : "Send"}</button>
                    }
                </div>

                <div className="flex justify-center w-full pb-4 space-x-4 md:px-4 mt-4">
                    <button type="button" onClick={closePlaceOverlay} className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-5 h-5 -ml-1 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        Close
                    </button>
                </div>
            </div>

            {/* MODAL */}
            <div tabIndex="-1" aria-hidden="true" className={`fixed flex flex-col items-center justify-center top-0 left-0 bg-gray-100/80 dark:bg-gray-800/80 z-50 ${!showMobileTerms && "hidden"} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
                <div className="relative w-full h-full max-w-2xl md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Terms of Service
                            </h3>
                            <button type="button" onClick={() => setShowMobileTerms(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-6 space-y-6 overflow-scroll h-64">
                            <p className="text-sm italic font-extrabold leading-relaxed text-gray-500 dark:text-gray-400">
                                TLDR: You give us permission to send a message to your mobile number and you agree to not abuse this feature.
                            </p>
                            <p className="text-xl font-extrabold leading-relaxed text-gray-500 dark:text-gray-400">
                                Terms of Service
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                These terms of service (&quot;Terms&quot;) apply to your use of the &quot;Send to Mobile&quot; functionality (&quot;Functionality&quot;) provided by wanderlustapp.io (&quot;Website&quot;). By using the Functionality, you agree to be bound by these Terms.
                            </p>
                            <p className="text-xl font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                                Description of Functionality
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The Functionality allows you to send a Google location from the Website to your mobile device by entering your mobile phone number and clicking &quot;Send&quot;. The Functionality uses your phone number to send you a text message with a link to the Google location.
                            </p>
                            <p className="text-xl font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                                User Representations and Warranties
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                By using the Functionality, you represent and warrant that:
                            </p>
                            <ul className="ml-4">
                                <li className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                    - You are at least 18 years old or have parental consent to use the Functionality.
                                </li>
                                <li className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                    - You have the legal capacity to enter into these Terms.
                                </li>
                                <li className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                    - You are the authorized user of the mobile phone number you provide.
                                </li>
                            </ul>
                            <p className="text-xl font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                                Limitations of Liability
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The Website is not responsible for any costs or charges associated with your use of the Functionality, including but not limited to data usage or messaging fees charged by your mobile carrier. The Functionality is provided &quot;as is&quot; and the Website makes no representations or warranties of any kind, express or implied, regarding the accuracy, reliability, or availability of the Functionality.
                            </p>

                            <p className="text-xl font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                                User Conduct
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                You agree to use the Functionality only for lawful purposes and in accordance with these Terms. You may not use the Functionality to send unsolicited messages, spam, or any other form of harassing or objectionable content.
                            </p>

                            <p className="text-xl font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                                Indemnification
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                You agree to indemnify, defend, and hold harmless the Website and its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, damages, liabilities, and expenses arising from or in connection with your use of the Functionality or any breach of these Terms.
                            </p>
                            <p className="text-xl font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                                Modification of Terms
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The Website may modify these Terms at any time by posting the modified Terms on the Website. Your continued use of the Functionality after the posting of the modified Terms constitutes your acceptance of the modified Terms.
                            </p>
                            <p className="text-xl font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                                Governing Law
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                These Terms shall be governed by and construed in accordance with the laws of the United States of America. Any dispute arising out of or in connection with these Terms shall be resolved in accordance with the dispute resolution procedures set forth in the Website&apos;s Terms of Use.
                            </p>
                            <p className="text-xl font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                                Entire Agreement
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">    
                                These Terms constitute the entire agreement between you and the Website regarding the Functionality and supersede all prior agreements or understandings, whether written or oral, regarding the Functionality.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                If you have any questions about these Terms, please contact us at hello@wanderlustapp.io.
                            </p>
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="defaultModal" onClick={triggerAcceptMobileTerms} type="button" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">I accept</button>
                            <button data-modal-hide="defaultModal" onClick={() => setShowMobileTerms(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}