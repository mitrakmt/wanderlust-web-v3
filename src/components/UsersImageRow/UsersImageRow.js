import Image from 'next/image'

export default function UsersImageRow() {
  return (
    <div role="status" className="flex mt-5">
      <Image height={30} width={30} className="relative w-10 h-10 p-1 m-2 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/faces-1.jpeg" alt="Bordered avatar" />
      <Image height={30} width={30} className="relative w-10 h-10 p-1 m-2 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/faces--2.jpeg" alt="Bordered avatar" />
      <Image height={30} width={30} className="relative w-10 h-10 p-1 m-2 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/faces-3.jpeg" alt="Bordered avatar" />
      <Image height={30} width={30} className="relative w-10 h-10 p-1 m-2 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/faces-4.jpeg" alt="Bordered avatar" />
      <Image height={30} width={30} className="relative w-10 h-10 p-1 m-2 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://wanderlust-extension.s3.us-west-2.amazonaws.com/faces--5.jpeg" alt="Bordered avatar" />
    </div>
  )
}