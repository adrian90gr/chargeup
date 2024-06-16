import React, { useEffect, useState, useRef } from "react";
import Tesla from '../../../public/images/coche_tesla.webp';
import CocheCarga from '../../../public/images/coche_cargando.webp';
import CarreteraNaturaleza from '../../../public/images/carretera_naturaleza.webp';
import Images from "../../public/images"

export const CarruselComponent = () => {{{Images}}
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const slides = [
    { src: {Tesla}, alt: "Coche Tesla" },
    { src: {CocheCarga}, alt: "Coche Cargando" },
    {
      src: {CarreteraNaturaleza},
      alt: "Coche Cargando",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 8000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${
        currentIndex * 100
      }%)`;
    }
  }, [currentIndex]);

  return (
    <div className="w-full bg-white  shadow-md dark:bg-neutral-800">
      <div className="relative overflow-hidden w-full h-80 bg-white ">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-in-out"
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex-shrink-0 w-full h-80">
              {slide.src ? (
                <img
                  className="w-full h-full object-cover"
                  src={slide.src}
                  alt={slide.alt}
                />
              ) : (
                <div className="flex justify-center items-center h-full bg-gray-300 dark:bg-neutral-700">
                  {slide.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-80 overflow-hidden top-[110px]  text-gray-800 hover:bg-gray-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10"
        onClick={() =>
          setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)
        }
      >
        <span className="text-2xl" aria-hidden="true">
          <svg
            className="flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </span>
        <span className="sr-only">Previous</span>
      </button>
      <button
        type="button"
        className="absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-80 overflow-hidden top-[110px]  text-gray-800 hover:bg-gray-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10"
        onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
      >
        <span className="sr-only">Next</span>
        <span className="text-2xl" aria-hidden="true">
          <svg
            className="flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </span>
      </button>
    </div>
  );
};
