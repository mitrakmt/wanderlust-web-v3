import { useState, useEffect } from 'react';
import Image from 'next/image'
import Head from 'next/head'

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

// Utils
import trackClick from "../utils/trackClick";

export default function NomadTools() {
    const [offers] = useState([
        {
            name: "Safetywing",
            type: "Insurance",
            link: "https://safetywing.com/nomad-insurance/?referenceID=thebalibabe&utm_source=thebalibabe&utm_medium=Ambassador",
            image: "https://wanderlust-extension.s3.us-west-2.amazonaws.com/61df6a9e4e1ac4fac07cbdd4_safetywing+logo+2.jpeg",
            description: "$42 / month for travel & health insurance for travelers, nomads and anyone in between.",
            details: "42 / month"
        },
        {
            name: "Wise",
            type: "Money",
            link: "https://wise.prf.hn/l/eYNoY28",
            image: "https://wanderlust-extension.s3.us-west-2.amazonaws.com/wise_logo.jpg",
            description: "Send & receive money internationally to any currency, at the real exchange rate. No hidden fees.",
            details: "Free $600 Transfer"
        },
        {
            name: "Surfshark VPN",
            type: "VPN",
            link: "https://surfshark.club/friend/M8XZbMJZ",
            image: "https://wanderlust-extension.s3.us-west-2.amazonaws.com/surfshark_logo.png",
            description: "Surfshark is a VPN that keeps you safe online and lets you access any content you want.",
            details: "83% Off"
        },
        {
            name: "Airalo",
            type: "Cell Phone",
            link: "https://ref.airalo.com/3PwH",
            image: "https://wanderlust-extension.s3.us-west-2.amazonaws.com/airalo_logo.png",
            description: "Airalo is a virtual SIM card that allows you to use your phone number in any country.",
            details: "$3 off your first SIM Card"
        }
    ]);

    // Hooks
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        trackClick('nomad-view')
    }, [])

    useEffect(() => {
        if (!user?.premium) {
            router.push('/pro')
        }
    }, [user])

    // Offers to check - flights? airbnb? hotels? vrbo? digital nomad services?
    
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <Head>
                <title>Maximize Your Nomad Lifestyle | Wanderlust App Nomad Tools</title>
                <meta name="description" content="Make the most of your digital nomad lifestyle with Wanderlust App's Nomad Tools page. Gain access to exclusive deals and resources to help you save money and stay productive on the road. Discover the best coworking spaces, travel insurance, and other essential tools for digital nomads. Explore the world without limitations and enhance your nomad experience with Wanderlust App's Nomad Tools." />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Maximize Your Nomad Lifestyle | Wanderlust App Nomad Tools" />
                <meta property="og:url" content="https://www.wanderlustapp.io/nomad" />
                <meta property="og:description" content="Make the most of your digital nomad lifestyle with Wanderlust App's Nomad Tools page. Gain access to exclusive deals and resources to help you save money and stay productive on the road. Discover the best coworking spaces, travel insurance, and other essential tools for digital nomads. Explore the world without limitations and enhance your nomad experience with Wanderlust App's Nomad Tools." />
                {/* <meta property="og:image" content={blog?.image_url} /> */}

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Maximize Your Nomad Lifestyle | Wanderlust App Nomad Tools" />
                <meta property="twitter:url" content="https://www.wanderlustapp.io/nomad" />
                <meta property="twitter:description" content="Make the most of your digital nomad lifestyle with Wanderlust App's Nomad Tools page. Gain access to exclusive deals and resources to help you save money and stay productive on the road. Discover the best coworking spaces, travel insurance, and other essential tools for digital nomads. Explore the world without limitations and enhance your nomad experience with Wanderlust App's Nomad Tools." />
                {/* <meta property="twitter:image" content={blog?.image_url} /> */}
            </Head>
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="max-w-screen-md mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Deals & Tools for Nomads</h2>
                    <p className="text-gray-500 sm:text-xl dark:text-gray-400">We find the best deals on the market for tools that travelers and nomads get the most benefit from.</p>
                </div>
                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    {
                        offers.map((offer) => (
                            <div key={`nomad-tools-${offer.name}`} href={offer.link} taraget="_blank">
                                <div className="flex justify-center items-center overflow-hidden mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                    <Image src={offer.image} alt={offer.name} width={50} height={50} className="h-full" />
                                </div>
                                <h3 className="mb text-xl font-bold dark:text-white">{offer.name}</h3>
                                <p className="text-gray-500 text-xs dark:text-gray-400 mb-2">{offer.type}</p>
                                <p className="text-gray-500 dark:text-gray-400">{offer.description}</p>
                                <button className="mt-4 px-4 py-2 bg-primary-500 rounded-lg text-sm font-semibold text-gray-200 dark:text-gray-200">{offer.details}</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}