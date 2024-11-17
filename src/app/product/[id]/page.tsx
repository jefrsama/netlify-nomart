'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Row, Col, Button, Rate, Select } from 'antd';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { CarOutlined, CarryOutOutlined, FireOutlined } from '@ant-design/icons';
import ProductColorSelector from "@/components/ProductColorSelector";
import Carousel from '@/components/Carousel'; // Импортируем компонент карусели
import Modal from '@/components/Modal';

const ProductDetail: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleColorClick = (index: any) => {
        setSelectedColorIndex(index);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOrder = () => {
        // Переход на страницу с параметрами
        router.push(`/order-summary?product=${JSON.stringify(product)}&totalPrice=3624&deliveryCost=7233`);
    };

    // Example product data
    const product = {
        id,
        name: 'Красивая белая кофта, осенняя',
        price: '1600т',
        image: [
            'https://placehold.co/500',
            'https://placehold.co/500',
            'https://placehold.co/500',
            'https://placehold.co/500',
        ],
        description: 'Красивая белая кофта, осенняя, изящная свободного кроя',
        availableQuantity: 4000,
        colors: ['#D1B48C', '#FFF'],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        rating: 4.8,
        store: {
            name: 'Айнур магазин',
            rating: 4.8,
            image: 'https://placehold.co/32',
        },
        characteristics: {
            'Силуэт': 'свитер',
            'Модель': 'свитер',
            'Материал': 'свитер',
        },
        product_colors: [
            {
                id: 1,
                name: 'Красный',
                image: 'https://placehold.co/32',
                isPopular: true,
            },
            {
                id: 2,
                name: 'Черный',
                image: 'https://placehold.co/32',
                isPopular: false,

            }
        ]
    };

    return (
        <div className="page-container" style={{
            backgroundColor: 'var(--background)',
            minHeight: '100vh',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
            <div style={{
                width: '100%',
                height: '30vh',
                flexShrink: 0
            }}>
                <Carousel images={product.image}/>
            </div>

            <div style={{
                position: 'relative',
                width: '100%',
                flexGrow: 1,
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
            }}>
                <div style={{
                    position: 'relative',
                    padding: '20px 20px',
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    gap: '0.5rem',
                }}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <p style={{color: '#653AD7', fontSize: '28px',}}>{product.price}</p>
                        <div style={{
                            color: '#999',
                            fontSize: '10px',
                            border: '0.5px solid #CBCFD4',
                            padding: '4px',
                            borderRadius: '4px'
                        }}>
                            <p>В наличии: {product.availableQuantity} шт.</p>
                        </div>
                    </div>

                    <p style={{fontSize: '1.25rem', color: '#212121',}}>{product.description}</p>

                    <div style={{display: 'flex', gap: '20px'}}>
                        <div style={{
                            color: '#653AD7',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CarryOutOutlined style={{}}/>
                            <span style={{fontSize: '1rem'}}>Хит товар</span>
                        </div>
                        <div style={{
                            color: '#4BAB00',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CarOutlined/>
                            <span style={{fontSize: '1rem'}}>Бесплатная доставка</span>
                        </div>
                    </div>
                </div>

                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: 'auto',
                    padding: '10px 20px',
                    backgroundColor: '#FFFFFF',
                    margin: '10px 0'
                }}>
                    <ProductColorSelector
                        productColors={product.product_colors}
                        selectedColorIndex={selectedColorIndex}
                        onColorClick={handleColorClick}
                    />
                </div>

                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: 'auto',
                    padding: '20px 20px',
                    background: '#FFFFFF'
                }}>
                    {/* Characteristics */}
                    <div>
                        <h3 style={{fontSize: '18px', marginBottom: '10px'}}>Характеристика</h3>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                            {Object.entries(product.characteristics).map(([key, value]) => (
                                <div key={key} style={{display: 'flex'}}>
                                    <span style={{
                                        width: '40%',
                                        color: '#99A2AD',
                                        fontSize: '1rem',
                                        fontWeight: '400',
                                    }}>{key}</span>
                                    <span style={{
                                        width: '60%',
                                        color: '#212121',
                                        fontSize: '1rem',
                                        fontWeight: '400',
                                    }}>{value}</span>
                                </div>
                            ))}
                        </div>
                        <p style={{
                            marginTop: '10px',
                            color: '#FF5720',
                            fontSize: '1rem',
                            fontWeight: '600',
                            font: 'SF Pro Display',
                        }}>Показать полностью</p>
                    </div>
                </div>

                <div style={{
                    position: 'relative',
                    bottom: '0',
                    width: '100%',
                    height: 'auto',
                    padding: '20px 20px',
                    margin: '10px 0 0 0',
                    background: '#FFFFFF'
                }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                        <Image src={product.store.image} alt={product.store.name} width={42} height={42}/>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px'
                        }}>
                            <h3>
                                {product.store.name}
                            </h3>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                                {product.store.rating}
                                <Rate disabled defaultValue={product.store.rating}/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Purchase Button */}
                <div style={{
                    marginTop: '10px',
                    flexGrow: 1,
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '8px',
                }}>
                    <Button
                        type="primary"
                        block
                        onClick={openModal}
                        style={{
                            backgroundColor: '#FF6A00',
                            color: '#fff',
                            fontSize: '16px',
                            padding: '8px 16px',
                            height: '48px',
                            marginTop: '10px'
                        }}
                    >
                        {product.price} Купить
                    </Button>
                </div>

            </div>
            {/* Модальное окно для выбора деталей продукта */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                    <Image
                        src={product.product_colors[selectedColorIndex].image}
                        alt={product.product_colors[selectedColorIndex].name}
                        width={70}
                        height={70}
                        style={{borderRadius: '4px', marginRight: '10px'}}
                    />
                    <div style={{margin: '12px 0'}}>
                        <p style={{
                            fontFamily: 'SF Pro Text',
                            fontSize: '14px',
                            fontWeight: '400',
                            lineHeight: '16.71px',
                            textAlign: 'left'
                        }}>{product.description}</p>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div style={{textAlign: 'end'}}>
                                <p style={{
                                    fontFamily: 'SF Pro Display',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    lineHeight: '19px',
                                    textAlign: 'left'
                                }}>{product.price}</p>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <Button
                                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                    style={{
                                        borderRadius: '50%',
                                        width: '34px',
                                        height: '34px',
                                        backgroundColor: '#EBEDF0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '15px',
                                        lineHeight: '1',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    -
                                </Button>
                                <span style={{fontSize: '18px', fontWeight: 'bold'}}>{quantity}</span>
                                <Button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{
                                        borderRadius: '50%',
                                        width: '34px',
                                        height: '34px',
                                        backgroundColor: '#FF5720',
                                        color: '#FFFFFF',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '15px',
                                        lineHeight: '1',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Блок для выбора цвета */}
                <ProductColorSelector
                    productColors={product.product_colors}
                    selectedColorIndex={selectedColorIndex}
                    onColorClick={handleColorClick}
                />
                <div style={{margin: '10px 0'}}>
                    <div style={{display: 'flex', gap: '10px'}}>
                        {product.colors.map((color, index) => (
                            <div
                                key={index}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    backgroundColor: color,
                                    border: selectedColorIndex === index ? '2px solid orange' : '1px solid #ccc',
                                    cursor: 'pointer',
                                    borderRadius: '50%',
                                }}
                                onClick={() => handleColorClick(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Выбор размера */}
                <div style={{margin: '10px 0'}}>
                    <h3 style={{margin: '5px 0'}}>Размер:</h3>
                    <div style={{display: 'flex', gap: '10px'}}>
                        {product.sizes.map((size) => (
                            <div
                                key={size}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    backgroundColor: selectedSize === size ? '#FF6A00' : '#f0f0f0',
                                    color: selectedSize === size ? '#fff' : '#333',
                                }}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Кастомная кнопка Оформить заказ */}
                <Button
                    type="primary"
                    block
                    style={{
                        backgroundColor: '#FF6A00',
                        color: '#fff',
                        fontSize: '16px',
                        padding: '8px 16px',
                        marginTop: '20px',
                        height: '48px'
                    }}
                    onClick={handleOrder}
                >
                    Оформить заказ
                </Button>
            </Modal>
        </div>
    );
};

export default ProductDetail;
