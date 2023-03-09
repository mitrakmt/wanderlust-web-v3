import Image from 'next/image'

export default function Avatar({ image, alt = "profile image" }) {
    return(
        <Image className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" width={30} src={image} priority alt={alt} />
    )
}