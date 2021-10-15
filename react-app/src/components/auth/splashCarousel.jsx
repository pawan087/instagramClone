import { useState, useEffect } from 'react';
import images from './splashPhotos'

function SplashCarousel() {

    const slidePresentationTime = 4000;
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const sliderInterval = setInterval(() => {
            setCurrentSlide((currentSlide + 1) % images.length);
        }, slidePresentationTime);

        return () => {
            clearInterval(sliderInterval)
        }
    })


    return (
        <>
            <div className='carousel'>
                {images.map((image, index) => (
                    <img
                        id={index}
                        key={index}
                        className={index === currentSlide ? 'image active' : 'image'}
                        src={image}
                        style={{ zIndex: `-${index + 1}` }}
                        alt='splash'
                    />
                ))}
            </div>
        </>
    )

}

export default SplashCarousel;
