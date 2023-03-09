import { useEffect, useState } from 'react';
import Image from 'next/image';

const LoadImage = ({ smallImageSrc, largeImageSrc, city, country }) => {
    const [blur, setBlur] = useState(true);

    useEffect(() => {
        setBlur(true);
    }, [smallImageSrc])

    return (
        <div className={`fixed w-full h-full ${blur ? "blur" : "unblur"}`}>
            <Image
                src={smallImageSrc}
                className="placeholder-image"
                alt={`${city} ${country}`}
                blurDataURL={smallImageSrc}
                fill
                priority
            />
            <Image
                className="wanderlustImage"
                src={largeImageSrc}
                alt={`${city} ${country}`}
                onLoadingComplete={() => setBlur(false)}
                priority
                fill
            />
        </div> 
    )
}

export default LoadImage;