'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Row, Col, Button, Rate, Carousel, Modal, Select } from 'antd';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { CarOutlined, CarryOutOutlined, FireOutlined } from '@ant-design/icons';
import ProductColorSelector from "@/components/ProductColorSelector";


const ProductDetail: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);

    const handleColorClick = (index: any) => {
        // Update the selected color index
        setSelectedColorIndex(index);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
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
        <div style={{backgroundColor: 'var(--background)'}}>
            <div style={{
                position: 'relative',
                width: '100%',
                height: 'auto',
                padding: '20px',
                backgroundColor: '#FFFFFF'
            }}>
                {/* Product Image */}
                <div style={{position: 'relative', width: '100%', marginBottom: '20px'}}>
                    <Carousel autoplay>
                        {product.image.map((img, index) => (
                            <div key={index}>
                                <Image src={img} alt={product.name} width={100} height={300} objectFit="cover"
                                       priority={true} style={{
                                    margin: 0,
                                    width: '100%',
                                    height: '100%',
                                    color: '#fff',
                                    lineHeight: '160px',
                                    textAlign: 'center',
                                }}/>
                            </div>
                        ))}
                    </Carousel>
                </div>
                {/* Product Info */}
                <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                    <div style={{fontSize: '40px', color: '#E91E63',}}>
                        {product.price}
                    </div>
                    <div style={{color: '#999', marginBottom: '20px', fontSize: '10px'}}>
                        В наличии: {product.availableQuantity} шт.
                    </div>
                </div>

                <h1 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '10px'}}>{product.name}</h1>
                <p style={{fontSize: '16px', color: '#666', marginBottom: '10px'}}>{product.description}</p>

                <div style={{display: 'flex', gap: '20px',}}>
                    <div style={{color: '#653AD7', display: 'flex', gap: '10px'}}>
                        <CarryOutOutlined style={{}}/>
                        <span>Хит товар</span>
                    </div>
                    <div style={{color: '#4BAB00', display: 'flex', gap: '10px'}}>
                        <CarOutlined/>
                        <span>Бесплатная доставка</span>
                    </div>
                </div>
            </div>

            <div style={{
                position: 'relative',
                width: '100%',
                height: 'auto',
                padding: '35px 20px',
                backgroundColor: '#FFFFFF',
                margin: '20px 0'
            }}>
                <ProductColorSelector
                    productColors={product.product_colors}
                    selectedColorIndex={selectedColorIndex}
                    onColorClick={handleColorClick}
                />
                {/*  выбор цветов вытащил как компоненту, это изначальный вариант
              <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>*/}
                {/*    {product.product_colors.map((color, index) => (*/}
                {/*        <div*/}
                {/*            key={index}*/}
                {/*            style={{*/}
                {/*                display: 'flex',*/}
                {/*                flexDirection: 'column',*/}
                {/*                alignItems: 'center',*/}
                {/*                padding: '5px',*/}
                {/*                border: selectedColorIndex === index ? '2px solid orange' : '2px solid transparent',*/}
                {/*                borderRadius: '4px',*/}
                {/*                position: 'relative',*/}
                {/*                cursor: 'pointer'*/}
                {/*            }}*/}
                {/*            onClick={() => handleColorClick(index)} // Handle click event*/}
                {/*        >*/}
                {/*            /!* Название цвета сверху *!/*/}

                {/*            {selectedColorIndex === index && (*/}
                {/*                <div style={{*/}
                {/*                    position: 'absolute',*/}
                {/*                    top: '-20px',*/}
                {/*                    backgroundColor: 'orange',*/}
                {/*                    color: '#fff',*/}
                {/*                    padding: '5px',*/}
                {/*                    borderRadius: '4px'*/}
                {/*                }}>*/}
                {/*                    {color.name}*/}
                {/*                </div>*/}
                {/*            )}*/}

                {/*            /!**/}
                {/*  <span style={{ marginBottom: '8px', fontSize: '14px', color: '#333' }}>*/}
                {/*      {color.name}*/}
                {/*  </span>*/}
                {/*  *!/*/}

                {/*            /!* Изображение цвета *!/*/}
                {/*            <Image*/}
                {/*                src={color.image}*/}
                {/*                alt={color.name}*/}
                {/*                width={60}*/}
                {/*                height={60}*/}
                {/*                style={{borderRadius: '4px'}}*/}
                {/*            />*/}

                {/*            /!* Популярность цвета (иконка огня) *!/*/}
                {/*            {color.isPopular && (*/}
                {/*                <div style={{position: 'absolute', bottom: '-2px', right: '0px'}}>*/}
                {/*                    /!* <img src="/flame-icon.png" alt="Популярный" width={16} height={16} /> *!/*/}
                {/*                    <FireOutlined style={{fontSize: '16px'}}/>*/}
                {/*                </div>*/}
                {/*            )}*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}

                {/* Color Selector */}
                <div style={{marginTop: '20px', display: 'flex', alignItems: 'center'}}>
                    <span style={{marginRight: '10px'}}>Цвета:</span>
                    {product.colors.map(color => (
                        <span
                            key={color}
                            style={{
                                display: 'inline-block',
                                width: '20px',
                                height: '20px',
                                backgroundColor: color,
                                borderRadius: '50%',
                                marginRight: '10px',
                                border: '1px solid var(--foreground)',
                            }}
                        />
                    ))}
                </div>
            </div>

            <div style={{
                position: 'relative',
                width: '100%',
                height: 'auto',
                padding: '20px',
                margin: '20px 0',
                background: '#FFFFFF'
            }}>
                {/* Characteristics */}
                <div>
                    <h3 style={{fontSize: '18px', marginBottom: '10px'}}>Характеристика</h3>
                    <div>
                        {Object.entries(product.characteristics).map(([key, value]) => (
                            <div key={key} style={{display: 'flex', marginBottom: '10px'}}>
                                <span style={{width: '40%'}}>{key}</span>
                                <span style={{width: '60%',}}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{
                position: 'relative',
                width: '100%',
                height: 'auto',
                padding: '20px',
                margin: '20px 0 0 0',
                background: '#FFFFFF'
            }}>

                <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                    <div>
                        <Image src={product.store.image} alt={product.store.name} width={32} height={32}/>
                    </div>
                    <div>
                        <h3>
                            {product.store.name}
                        </h3>
                        <div>
                            {product.store.rating}
                            <Rate disabled defaultValue={product.store.rating}/>
                        </div>
                    </div>
                </div>

                {/* Purchase Button */}
                <div style={{margin: '20px 0'}}>
                    <Button
                        type="primary"
                        block
                        size="large"
                        onClick={showModal}
                        style={{fontSize: '18px', padding: '15px 0', backgroundColor: '#ff4d4f'}}
                    >
                        {product.price} Купить
                    </Button>

                    {/* Модальное окно для выбора деталей продукта */}
                    <Modal
                        title={<div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Выберите детали</div>}
                        visible={isModalVisible}
                        footer={null}
                        onCancel={closeModal}
                    >

                        {/* Верхняя часть с изображением и описанием */}
                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                            <Image
                                src={product.product_colors[selectedColorIndex].image}
                                alt={product.product_colors[selectedColorIndex].name}
                                width={60}
                                height={60}
                                style={{borderRadius: '4px', marginRight: '10px'}}
                            />
                            <div style={{margin: '12px 0'}}>
                                <p style={{fontFamily: 'SF Pro Text', fontSize: '14px', fontWeight: '400', lineHeight: '16.71px', textAlign: 'left'}}>{product.description}</p>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <div style={{textAlign: 'end'}}>
                                        <p style={{fontFamily: 'SF Pro Display', fontSize: '16px', fontWeight: '600', lineHeight: '19px', textAlign: 'left'}}>{product.price}</p>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                        <Button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                                style={{borderRadius: '50%', width: '5px', height: '25px', backgroundColor: '#EBEDF0'}}>-</Button>
                                        <span>{quantity}</span>
                                        <Button onClick={() => setQuantity(quantity + 1)}
                                                style={{borderRadius: '50%', width: '5px', height: '25px', backgroundColor: '#FF5720', color: '#FFFFFF'}}>+</Button>
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
                        <div style={{marginBottom: '20px'}}>
                            <h3>Цвет:</h3>
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
                        <div style={{ marginBottom: '20px' }}>
                            <h3>Размер:</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
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
                            style={{ backgroundColor: '#FF6A00', color: '#fff', fontSize: '16px', padding: '8px 16px', marginTop: '20px', height: '48px'}}
                            onClick={handleOrder}
                        >
                            Оформить заказ
                        </Button>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
