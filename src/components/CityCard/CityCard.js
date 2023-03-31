/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'

// Components
import FavoriteControl from '../../icons/likeIcon';

export default function CityCard({ data, keyId, favorites, index, toggleFavorite, hideLikeCount }) {
  // State
  const [isFavorited, setIsFavorited] = useState(false);

  // UseEffect
  useEffect(() => {
    setIsFavorited(checkIfCityFavorited(data.city?.id));
  }, [favorites]);

  // Functions
  const checkIfCityFavorited = (cityId) => {
    // Check if cityId is included in favorites array
    if (favorites?.length > 0) {
      const isFound = favorites.some(favorite => {
        if (favorite?.city?.id === cityId) {
          return true;
        }

        return false;
      });

      if (isFound) {
        return true;
      }
    }
    return false;
  }

  const clickFavorite = () => {
    // toggleFavorite(data.city?.id, checkIfCityFavorited(data.city?.id), data.city);
    toggleFavorite(data.city?.id, isFavorited, data.city);
    setIsFavorited(!isFavorited);
  }

  return (
    <span className="relative transition-all hover:scale-105">
      <div style={{ top: 0, right: 0, padding: '10px 15px', zIndex: 100 }} className="absolute z-20 flex">
          <FavoriteControl
            toggleFavorite={clickFavorite}
            hideTooltip={true}
            currentImageFavoriteStatus={isFavorited}
            noBackground={true}
          />
        {
          !hideLikeCount && <h3 className="z-20 flex pointer-events-none items-center justify-center text-lg font-extrabold text-white" style={{ textShadow: '1px 1px 0 rgb(0 0 0 / 35%), 1px 1px 5px rgb(0 0 0 / 50%)' }}>{data?.city?.favorite_count}</h3>
        }
      </div>
      <Link
        href={{
          pathname: `/city/${data.city?.slug}`,
          query: { breadcrumb: 'search' },
        }}
      >
        <div key={keyId} className="flex items-center w-full text-center cursor-pointer group space-between brightness-150 hover:brightness-125 dark:brightness-100 dark:hover:brightness-75" style={{ height: '200px', width: '100%', position: 'relative' }}>
            <div className="z-20 flex flex-col items-center justify-center w-full mt-4 text-center">
                <div>
                    <h3 className="z-20 text-xl font-extrabold text-white" style={{ textShadow: '1px 1px 0 rgb(0 0 0 / 35%), 1px 1px 5px rgb(0 0 0 / 50%)' }}>
                    <span aria-hidden="true" className="absolute inset-0" />
                        {data.city?.name}
                    </h3>
                    <p className="font-extrabold text-white text-md" style={{ textShadow: '1px 1px 0 rgb(0 0 0 / 35%), 1px 1px 5px rgb(0 0 0 / 50%)' }}>{data.city?.country.name}</p>
                </div>
            </div>
            <div style={{ top: 0, left: 0, padding: '15px' }} className="absolute z-20">
                <h3 className="z-20 text-xl font-extrabold text-white" style={{ textShadow: '1px 1px 0 rgb(0 0 0 / 35%), 1px 1px 5px rgb(0 0 0 / 50%)' }}>
                    {index + 1}
                </h3>
            </div>
            <div style={{ bottom: 0, left: 0, padding: '15px' }} className="absolute z-20">
                <h3 className="z-20 overflow-hidden text-lg font-extrabold text-white" style={{ textShadow: '1px 1px 0 rgb(0 0 0 / 35%), 1px 1px 5px rgb(0 0 0 / 50%)' }}>
                    {
                      data?.city?.cost_score >= 4 ?
                      '$' : data.city?.cost_score >= 3 ?
                      '$$' : data.city?.cost_score >= 2 ?
                      '$$$' : data.city?.cost_score >= 1 ?
                      '$$$$' : data.city?.cost_score >= 0 ?
                      '$$$$$' : '$$$$$$'
                    }
                </h3>
            </div>
            <div className="w-full bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 lg:h-80 lg:aspect-none" style={{ position: 'absolute', height: "100%" }}>
                <Image
                    src={data.city?.image_url_thumb}
                    alt={data.city?.name}
                    fill
                    quality={90}
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