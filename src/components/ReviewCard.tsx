// components/ReviewCard.tsx
import React from 'react';
import { Avatar, Rate } from 'antd';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Image from 'next/image';

interface ReviewCardProps {
    user: string;
    rating: number;
    comment: string;
    date: string;
    images?: string[];
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <div style={{ display: 'flex', gap: '3px' }}>
            {[...Array(fullStars)].map((_, index) => (
                <FaStar key={`full-${index}`} style={{ color: '#FFD43A' }} />
            ))}
            {[...Array(halfStars)].map((_, index) => (
                <FaStarHalfAlt key={`half-${index}`} style={{ color: '#FFD43A' }} />
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <FaRegStar key={`empty-${index}`} style={{ color: '#FFD43A' }} />
            ))}
        </div>
    );
};

const ReviewCard: React.FC<ReviewCardProps> = ({ user, rating, comment, date, images }) => {
    return (
        <div
            style={{
                backgroundColor: '#F2F2F2',
                padding: '15px',
                marginBottom: '15px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Верхняя часть с информацией о пользователе */}
            <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Avatar size={40} icon={<FaRegStar />} />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                }}>
                    <strong>{user}</strong>
                    <div style={{
                        color: '#99A2AD',
                        fontSize: '14px',
                    }}>Красный, XS</div>
                </div>
                <div style={{marginLeft: 'auto', color: 'gray', fontSize: '14px', textAlign: 'end'}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                    }}>
                        <span style={{color: '#99A2AD', fontSize: '16px',}}>{date}</span>
                        <div style={{display: 'flex', gap: '5px'}}>
                            <RatingStars rating={rating}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Текст отзыва */}
            <div style={{marginBottom: '10px'}}>
                <p>{comment}</p>
            </div>

            {/* Изображения, если есть */}
            {images && images.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {images.map((image, index) => (
                        <div key={index} style={{ width: '50px', height: '50px', overflow: 'hidden', borderRadius: '8px' }}>
                            <Image src={image} alt={`Review Image ${index}`} width={50} height={50} objectFit="cover" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewCard;
