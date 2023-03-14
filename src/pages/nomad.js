import { useState, useEffect } from 'react';
import Image from 'next/image'

// Hooks
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

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
        }
    ]);

    // Hooks
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.premium) {
            router.push('/pro')
        }
    }, [user])

    // Offers to check - flights? airbnb? hotels? vrbo? digital nomad services?
    
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="max-w-screen-md mb-8 lg:mb-16">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Deals & Tools for Nomads</h2>
                    <p className="text-gray-500 sm:text-xl dark:text-gray-400">We find the best deals on the market for tools that travelers and nomads get the most benefit from.</p>
                </div>
                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    {
                        offers.map((offer) => (
                            <div key={`nomad-tools-${offer.name}`}>
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