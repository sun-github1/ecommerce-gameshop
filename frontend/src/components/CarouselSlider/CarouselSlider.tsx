'use client'
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

interface CarouselSliderProps {
    images: {_key: string, url: string }[];
    interval?: number
}

const CarouselSlider: FC<CarouselSliderProps> = (props) => {
    const { images, interval = 3000 } = props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex == images.length - 1) {
                return 0;
            }
            return prevIndex +1;
        });
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => {
            if (prevIndex == 0) {
                return images.length - 1;
            }
            return prevIndex - 1;
        });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            goToNextImage();
        }, interval);
        return () => clearInterval(timer);
    }, [interval, currentImageIndex]);

    return (
        <div className={CarouselSliderClassNames.container}>
            {images?.map((image, index) => (
                  <Image
                  key={image._key}
                  src={image.url}
                  alt={`Slide ${index}`}
                  height={700}
                  width={700}
                  className={`w-full h-full object-cover ${index!==currentImageIndex && "hidden"}`}
                  />
            ))}
            <button className={CarouselSliderClassNames.previousButton} onClick={goToNextImage}>
                <AiOutlineArrowLeft className="text-4xl"/>
            </button>
            <button className={CarouselSliderClassNames.nextButton} onClick={goToPreviousImage}>
                <AiOutlineArrowRight className="text-4xl"/>
            </button>
        </div>
    )
}

export default CarouselSlider


const CarouselSliderClassNames = {
    container: "relative h-[70vh]",
    previousButton:
        "absolute flex h-14 w-14 top-1/2 left-2 transform -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-full",
    nextButton:
        "absolute flex h-14 w-14 top-1/2 right-2 transform -translate-y-1/2 px-4 py-2 bg-primary text-white rounded-full",
};