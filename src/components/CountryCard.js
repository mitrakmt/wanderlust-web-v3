/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import Image from 'next/image'

export default function CountryCard({ country }) {
  return (
    <span className="relative transition-all hover:scale-105 w-52 h-32">
      <div style={{ top: 0, right: 0, padding: '10px 15px', zIndex: 100 }} className="absolute z-20 flex">
        {/* Something can go here  */}
      </div>
      <Link
        href={{
          pathname: `/countries/${country?.slug}`,
          query: { breadcrumb: 'countries' },
        }}
      >
        <div className="flex items-center w-full text-center cursor-pointer group space-between brightness-150 hover:brightness-125 dark:brightness-100 dark:hover:brightness-75" style={{ height: '100%', width: '100%', position: 'relative' }}>
            <div className="z-20 flex flex-col items-center justify-center w-full mt-4 text-center">
                <div>
                    <h2 className="font-extrabold text-white text-xl" style={{ textShadow: '1px 1px 0 rgb(0 0 0 / 35%), 1px 1px 5px rgb(0 0 0 / 50%)' }}>{country?.name}</h2>
                </div>
            </div>
            <div style={{ top: 0, left: 0, padding: '15px' }} className="absolute z-20">
                {/* something can go here  */}
            </div>
            <div style={{ bottom: 0, left: 0, padding: '15px' }} className="absolute z-20">
                {/* something can go here  */}
            </div>
            <div className="w-full bg-gray-200 rounded-md min-h-60 aspect-w-1 aspect-h-1 lg:h-80 lg:aspect-none" style={{ position: 'absolute', height: "100%" }}>
                {
                    country?.image_url_thumb &&
                        <Image
                            src={country?.image_url_small}
                            alt={country?.name}
                            quality={60}
                            width={220}
                            height={140}
                            className="object-cover absolute object-center w-full h-full rounded-md lg:w-full lg:h-full brightness-50"
                        />  
                }
            </div>
        </div>
      </Link>
    </span>
  )
}