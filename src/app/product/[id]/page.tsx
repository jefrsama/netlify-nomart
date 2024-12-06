'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Rate, Select, message, Spin, Alert} from 'antd';
import Image from 'next/image';
import { CarOutlined, CarryOutOutlined, FireOutlined } from '@ant-design/icons';
import ProductColorSelector from "@/components/ProductColorSelector";
import Carousel from '@/components/Carousel';
import Modal from '@/components/Modal';
import axios, {AxiosError} from "axios";
import { createOrder } from '@/services/orderService';
import AuthModal from "@/components/AuthModal";
import { useLoading } from '@/contexts/LoadingContext';
import {getStoreByName} from "@/services/storeService";
import {useSelector} from "react-redux";
import {RootState, store} from "@/store";
import {fetchStoreData} from "@/store/storeSlice";
import { StoreProduct } from '@/store/types';
import RatingStars from "@/components/RatingStars";

const ProductDetail: React.FC = () => {
    const params = useParams();
    const productId = params?.id;
    const router = useRouter();
    const { setIsLoading } = useLoading();

    // States
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Получение данных из store
    const storeData = useSelector((state: RootState) => state.store.store);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // 1 секунда

        return () => clearTimeout(timer); // Очистка таймера при размонтировании
    }, []);

    // Поиск продукта в storeData
    const product = storeData?.storeProducts?.find((p: StoreProduct) => p.product_id === productId);

    if (!product) {
        return <div>Продукт не найден</div>;
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleColorClick = (index: any) => setSelectedColorIndex(index);

    const handleOrder = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setIsAuthModalVisible(true);
            return;
        }

        const payload = {
            order_items: [
                {
                    store_product_id: product.id,
                    product_amount: Math.max(1, Number(quantity)),
                },
            ],
        };

        console.log('Payload для создания заказа:', payload);

        try {
            const orderData = await createOrder(payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Order создан успешно:', orderData);

            // Формируем URL с query-параметрами
            const queryParams = new URLSearchParams({
                quantity: quantity.toString(),
                totalPrice: (product.product.price * quantity).toString(),
                productId: product.product_id,
                total_price: orderData.total_price.toString(),
            });

            router.push(`/order-summary/${orderData.id}?${queryParams.toString()}`);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error('Ошибка сервера:', err.response?.data);

                if (err.response?.status === 400) {
                    message.error(
                        `Ошибка в запросе: ${
                            err.response?.data?.message || 'Проверьте переданные данные'
                        }`
                    );
                } else {
                    message.error('Ошибка при оформлении заказа!');
                }
            } else if (err instanceof Error) {
                console.error('Неизвестная ошибка:', err.message);
                message.error('Произошла ошибка: ' + err.message);
            } else {
                console.error('Неизвестная ошибка:', err);
                message.error('Произошла неизвестная ошибка.');
            }
        }
    };

    const handleAuthComplete = () => {
        setIsAuthModalVisible(false);
        handleOrder();
    };

    const toggleExpand = () => setIsExpanded(!isExpanded);

    // Example product data
    const product1 = {
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

    if (loading) {
        return <Spin tip="Загрузка..." style={{ textAlign: 'center', marginTop: '20px' }} />;
    }

    if (error) {
        return <Alert message={error} type="error" showIcon style={{ marginTop: '20px' }} />;
    }

    return (
        <div className="page-container" style={{
            backgroundColor: 'var(--background)',
            minHeight: '100vh',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            height: '100vh',
        }}>
            <div style={{
                width: '100%',
                height: '30vh',
                flexShrink: 0
            }}>
                <Carousel images={product1.image}/>
            </div>

            <div style={{
                position: 'relative',
                width: '100%',
                flexGrow: 1,
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
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
                        <p style={{color: '#653AD7', fontSize: '28px', lineHeight: '33px', fontWeight: '600'}}>{product.product.price} ₸</p>
                        <div style={{
                            color: '#999',
                            fontSize: '10px',
                            border: '0.5px solid #CBCFD4',
                            padding: '4px',
                            borderRadius: '4px'
                        }}>
                            <p>В наличии: {/*product?.product.availableQuantity ||*/}{'0'} шт.</p>
                        </div>
                    </div>

                    <p style={{fontSize: '1.25rem', color: '#212121',}}>{product.product.other}</p>

                    <div style={{display: 'flex', gap: '20px'}}>
                        <div style={{
                            color: '#653AD7',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img src="/Best-seller-16.svg" alt=""/>
                            <span style={{fontSize: '1rem'}}>Хит товар</span>
                        </div>
                        <div style={{
                            color: '#4BAB00',
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img src="/car_outline_20.svg" alt=""/>
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
                        productColors={product1.product_colors}
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
                            {Object.entries(product1.characteristics).map(([key, value]) => (
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
                        <p
                            onClick={toggleExpand}
                            style={{
                                marginTop: '10px',
                                color: '#FF5720',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                        >
                            {isExpanded ? 'Скрыть' : 'Показать полностью'}
                        </p>
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
                        <Image src={product1.store.image} alt={product1.store.name} width={42} height={42} style={{borderRadius: '4px',}}/>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                            overflow: 'hidden',
                        }}>
                            <h4 style={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                maxWidth: '100%',
                                whiteSpace: 'normal',
                                lineHeight: '1.5',
                            }}>
                                {storeData?.name}
                            </h4>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}>
                                <p style={{
                                    fontSize: '14px',
                                    fontWeight: '400',
                                }}>{storeData?.rating}</p>
                                <RatingStars rating={storeData?.rating || 0} />
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
                        {product.product.price} ₸ Купить
                    </Button>
                </div>
                {/* Модальное окно для выбора деталей продукта */}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div style={{display: 'flex', top: '0', margin: '20px 0', width: '100%'}}>
                        <Image
                            src={product1.product_colors[selectedColorIndex].image}
                            alt={product1.product_colors[selectedColorIndex].name}
                            width={70}
                            height={70}
                            style={{borderRadius: '4px', marginRight: '10px'}}
                        />
                        <div style={{margin: '2px 0', width: '100%'}}>
                            <p style={{
                                fontSize: '18px',
                                fontWeight: '400',
                                lineHeight: '16.71px',
                                textAlign: 'left'
                            }}>{product.product.other}</p>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <div style={{textAlign: 'end'}}>
                                    <p style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        lineHeight: '19px',
                                        textAlign: 'left'
                                    }}>{product.product.price} ₸</p>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                    <Button
                                        onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                                        style={{
                                            borderRadius: '50%',
                                            width: '30px',
                                            height: '30px',
                                            backgroundColor: '#EBEDF0',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            lineHeight: '1',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <img src="/Minus.svg" width={12.5} height={12.5} alt=""/>
                                    </Button>
                                    <span style={{fontSize: '18px', fontWeight: 'bold'}}>{quantity}</span>
                                    <Button
                                        onClick={() => setQuantity((prev) => prev + 1)}
                                        style={{
                                            borderRadius: '50%',
                                            width: '30px',
                                            height: '30px',
                                            backgroundColor: '#FF5720',
                                            color: '#FFFFFF',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            lineHeight: '1',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <img src="/plus.svg" width={12.5} height={12.5} alt=""/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Блок для выбора цвета */}
                    <ProductColorSelector
                        productColors={product1.product_colors}
                        selectedColorIndex={selectedColorIndex}
                        onColorClick={handleColorClick}
                    />
                    <div style={{margin: '10px 0'}}>
                        <div style={{display: 'flex', gap: '10px'}}>
                            {product1.colors.map((color, index) => (
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
                    <div style={{margin: '20px 0'}}>
                        <h3 style={{margin: '10px 0'}}>Размер:</h3>
                        <div style={{display: 'flex', gap: '10px'}}>
                            {product1.sizes.map((size) => (
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

                {/* Модальное окно для аутентификации */}
                {isAuthModalVisible && <AuthModal onClose={() => setIsAuthModalVisible(false)} />}
            </div>
        </div>
    );
};

export default ProductDetail;
