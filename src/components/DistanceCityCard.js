import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'

export default function CityCard({ city, keyId, index, currentCity, measurements = 'us' }) {
    const [distance, setDistance] = useState(false);

    useEffect(() => {
        fetchDistanceBetweenCities();
    }, []);

    // FUNCTIONS
    const fetchDistanceBetweenCities = async () => {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
                'X-RapidAPI-Host': 'distances1.p.rapidapi.com'
            },
            body: JSON.stringify({
                "lon1": currentCity.longitude,
                "lat1": currentCity.latitude,
                "lon2": city.longitude,
                "lat2": city.latitude
            })
        };
        
        fetch('https://distances1.p.rapidapi.com/distance', options)
            .then(response => response.json())
            .then(response => {
                setDistance({
                    miles: response.Distance.mi.toFixed(1),
                    kilometers: response.Distance.kms.toFixed(1),
                    nauticalMiles: response.Distance.nmi.toFixed(1)
                })
                // TODO: return or something
            })
            .catch(err => console.error(err));
    }

  return (
    <span className="relative transition-all hover:scale-105">
      <div style={{ top: 0, right: 0, padding: '10px 15px', zIndex: 100 }} className="absolute z-20 flex">
        {
            distance && <h3 className="z-20 flex pointer-events-none items-center justify-center text-lg font-extrabold text-white" style={{ textShadow: '1px 1px 0 rgb(0 0 0 / 35%), 1px 1px 5px rgb(0 0 0 / 50%)' }}>{measurements === 'metric' ? distance.kilometers : distance.miles} { measurements === 'metric' ? "km" : "mi"}</h3>
        }
      </div>
      <Link
        href={{
          pathname: `/city/${city?.slug}`,
          query: { breadcrumb: 'search' },
        }}
      >
        <div key={keyId} className="flex items-center w-full text-center cursor-pointer group space-between brightness-150 hover:brightness-125 dark:brightness-100 dark:hover:brightness-75" style={{ height: '200px', width: '100%', position: 'relative' }}>
            <div className="z-20 flex flex-col items-center justify-center w-full mt-4 text-center">
                <div>
                    <h3 className="z-20 text-xl font-extrabold text-white" style={{ textShadow: '1px 1px 0 rgb(0 0 0 / 35%), 1px 1px 5px rgb(0 0 0 / 50%)' }}>
                    <span aria-hidden="true" className="absolute inset-0" />
                        {city?.name}
                    </h3>
                    <p className="font-extrabold text-white text-md" style={{ textShadow: '1px 1px 0 rgb(0 0 0 / 35%), 1px 1px 5px rgb(0 0 0 / 50%)' }}>{city?.country.name}</p>
                </div>
            </div>
            <div style={{ bottom: 0, left: 0, padding: '15px' }} className="absolute z-20">
                <h3 className="z-20 overflow-hidden text-lg font-extrabold text-white" style={{ textShadow: '1px 1px 0 rgb(0 0 0 / 35%), 1px 1px 5px rgb(0 0 0 / 50%)' }}>
                    {
                      city?.cost_score >= 4 ?
                        '$' : city?.cost_score >= 3 ?
                        '$$' : city?.cost_score >= 2 ?
                        '$$$' : city?.cost_score >= 1 ?
                        '$$$$' : city?.cost_score >= 0 ?
                        '$$$$$' : '$$$$$$'
                    }
                </h3>
            </div>
            <div className="w-full bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 lg:h-80 lg:aspect-none" style={{ position: 'absolute', height: "100%" }}>
                <Image
                    src={city?.image_url_small}
                    alt={city?.name}
                    fill
                    quality={80}
                    sizes="(max-width: 768px) 30vw,
                      (max-width: 1200px) 20vw,
                      33vw"
                    className="object-cover object-center w-full h-full rounded-md lg:w-full lg:h-full brightness-50"
                />
          </div>
        </div>
      </Link>
    </span>
  )
}