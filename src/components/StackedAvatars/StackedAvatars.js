import Image from 'next/image'

export default function StackedAvatars({ count }) {
    return(
        <>
            <div className="flex -space-x-4">
                <Image height={30} width={30} className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/docs/images/people/profile-picture-5.jpg" alt="template profile picture" />
                <Image height={30} width={30} className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/docs/images/people/profile-picture-2.jpg" alt="template profile picture" />
                <Image height={30} width={30} className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/docs/images/people/profile-picture-3.jpg" alt="template profile picture" />
                <a className="flex items-center justify-center w-10 h-10 text-xs font-medium bg-gray-700 border-2 border-white rounded-full dark:text-white hover:bg-gray-600 dark:border-gray-800" href="#">+{count - 3}</a>
            </div>
        </>
    )
}