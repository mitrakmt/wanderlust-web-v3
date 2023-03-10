import { useState, useEffect } from 'react';
import Image from 'next/image'

// Components
import TextH1 from '../components/Text/TextH1';
import Button from '../components/Button/Button';

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
        }
    ]);

    // Hooks
    const { user, userLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user?.premium) {
            router.push('/pro')
        }
    }, [user])

    // Offers to check - flights? airbnb? hotels? vrbo? digital nomad services?
    
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            {/* Page header  */}
            <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">Nomad Tools</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only"></span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Benefit
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Link
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            offers?.map((offer) => (
                                <tr key={`nomadTools-${offer.name}`} className="bg-white border-b h-28 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="flex w-32 h-full p-4 overflow-hidden justify-center">
                                        <Image height={80} width={80} src={offer.image} alt={offer.name} className="mt-auto mb-auto relative w-20 h-20 rounded-full" />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {offer.name}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {offer.description}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {offer.details}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button text="Get Offer" onClick={() => window.open(offer.link, "_blank")} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}