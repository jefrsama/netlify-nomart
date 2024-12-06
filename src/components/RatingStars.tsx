import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface RatingStarsProps {
    rating: number;
    maxRating?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, maxRating = 5 }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = maxRating - fullStars - halfStar;

    const stars = [
        ...Array(fullStars).fill('full'),
        ...Array(halfStar).fill('half'),
        ...Array(emptyStars).fill('empty'),
    ];

    return (
        <div style={{ display: 'flex', gap: '5px' }}>
            {stars.map((star, index) => {
                if (star === 'full') {
                    return <FaStar key={index} style={{ color: '#FFD43A' }} />;
                } else if (star === 'half') {
                    return <FaStarHalfAlt key={index} style={{ color: '#FFD43A' }} />;
                } else {
                    return <FaRegStar key={index} style={{ color: '#FFD43A' }} />;
                }
            })}
        </div>
    );
};

export default RatingStars;
