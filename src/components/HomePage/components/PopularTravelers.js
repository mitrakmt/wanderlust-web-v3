import Image from 'next/image';
import Link from 'next/link';

export default function PopularTravelers() {
    const travelers = [
        {
            name: 'Michael Mitrakos',
            title: '39 countries',
            username: "mike",
            description: 'Michael is a full-time traveler and digital nomad. He has been traveling for 5 years and has visited 39 countries. He is currently in the Bali.',
            avatar: 'https://wanderlust-extension.s3.us-west-2.amazonaws.com/629cc831bf9ed82b91d4c111',
            twitterUrl: 'https://twitter.com/mike_mitrakos',
            instagramUrl: 'https://instagram.com/mike_mitrakos',
            socials: [
                {
                    name: 'Twitter',
                    url: 'https://twitter.com/mike_mitrakos',
                    icon: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/icons/twitter.svg'
                },
                {
                    name: 'Instagram',
                    url: 'https://instagram.com/mike_mitrakos',
                    icon: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/icons/instagram.svg'
                }
            ]
        },
    ]

    return (
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 my-8">
            <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Popular Nomads</h2>
                <p className="font-normal text-gray-800 lg:mb-16 sm:text-xl dark:text-gray-200">Every traveler has a wealth of information waiting to be shared</p>
            </div>
            <div className="grid gap-8 mb-6 lg:mb-16 lg:grid-cols-2">
                {travelers.map((traveler) => (
                    <div key={`popularTravelers-${traveler.username}`} className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                        <Link href={`/profile/${traveler.username}`}>
                            <Image className="w-48 sm:w-80 rounded-lg sm:rounded-none h-36 object-cover sm:rounded-l-lg" src={traveler.avatar} alt={`${traveler.name} Avatar`} width={80} height={80} />
                        </Link>
                        <div className="p-5">
                            <div className="flex justify-between">
                            <Link href={`/profile/${traveler.username}`}>
                                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {traveler.name}
                                </h3>
                                </Link>
                                {/* button to view profile  */}
                                <Link href={`/profile/${traveler.username}`}>
                                    <p className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gray-500 dark:bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                                        View Profile
                                    </p>
                                </Link>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400">{traveler.title}</span>
                            <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{traveler.description}</p>
                            <ul className="flex space-x-4 sm:mt-0">
                                <li>
                                    <a href={traveler.instagramUrl} target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 30 30" aria-hidden="true">
                                        <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"/>                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href={traveler.twitterUrl} target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}