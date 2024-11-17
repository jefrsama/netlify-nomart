import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import styles from '@/styles/carousel.module.css';

interface CarouselProps {
    images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
    const [zoomed, setZoomed] = useState<boolean>(false);
    const [cursorPosition, setCursorPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    // Константа для смещения лупы (в пикселях)
    const lensOffset = 40;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, imgRef: HTMLImageElement) => {
        const rect = imgRef.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setCursorPosition({ x, y });
    };

    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            loop={true}
            pagination={{
                clickable: true,
            }}
            style={{ position: 'relative' }}
        >
            {images.map((img, index) => (
                <SwiperSlide key={index} style={{ position: 'relative', height: '30vh' }}>
                    <div
                        className={styles['image-container']}
                        onMouseEnter={() => setZoomed(true)}
                        onMouseLeave={() => setZoomed(false)}
                    >
                        <Image
                            src={img}
                            alt={`Product Image ${index + 1}`}
                            layout="fill"
                            className={styles['zoom-image']}
                            objectFit="cover"
                            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                        />
                        {zoomed && (
                            <div
                                className={styles['zoom-lens']}
                                style={{
                                    right: `${cursorPosition.x - 10}px`,
                                    top: `${cursorPosition.y + 50}px`,
                                }}
                            >
                                <div
                                    className={styles['zoomed-image']}
                                    style={{
                                        backgroundImage: `url(${img})`,
                                        backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;
