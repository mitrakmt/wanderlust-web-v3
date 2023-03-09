import { useState, useRef, useEffect } from 'react';

const Carousel = ({ images, propertyName }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="w-full mx-auto my-12 carousel">
      <div className="relative overflow-hidden">
        <div className="absolute flex justify-between w-full h-full top left">
          <button
            onClick={movePrev}
            className="z-10 w-10 h-full p-0 m-0 text-center text-white transition-all duration-300 ease-in-out opacity-75 hover:bg-blue-900/75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed"
            disabled={isDisabled('prev')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-12 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="z-10 w-10 h-full p-0 m-0 text-center text-white transition-all duration-300 ease-in-out opacity-75 hover:bg-blue-900/75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed"
            disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-12 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="relative z-0 flex gap-8 overflow-hidden carousel-container scroll-smooth snap-x snap-mandatory touch-pan-x"
        >
          {images.map((image, index) => {
            return (
              <div
                key={index}
                className="relative h-64 text-center rounded-md w-80 cover carousel-item snap-start"
              >
                <a
                  href={image.link}
                  className="z-0 block h-full bg-left-top bg-no-repeat bg-cover rounded-md w-80 aspect-square bg-origin-padding"
                  style={{ backgroundImage: `url(${image[propertyName]})` }}
                >
                  <img
                    src={image[propertyName]}
                    alt={image.title}
                    className="hidden rounded-md w-80 cover"
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
