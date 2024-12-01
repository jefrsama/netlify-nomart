"use client";

import React, {useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {Button} from "antd";
import Image from 'next/image';
import axios from "axios";

const OrderSummary = () => {
    const params = useParams();
    const orderId = params?.id;
    const [orderData, setOrderData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [totalPrice, setTotalPrice] = useState(4200);
    const [deliveryCost, setDeliveryCost] = useState(7233);
    const [quantity, setQuantity] = useState(1);

    const handleIncreaseQuantity = () => setQuantity(quantity + 1);
    const handleDecreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
    const handleBack = () => router.back();
    const handleOrder = () => router.push(`/payment/${orderId}`);

    const fetchOrderData = async () => {
        if (!orderId) {
            setError("ID заказа отсутствует в маршруте.");
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Пользователь не авторизован.");
            }

            const response = await axios.get(`/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOrderData(response.data);
        } catch (err: any) {
            console.error("Ошибка при загрузке данных заказа:", err);
            setError(
                err.response?.data?.message || "Не удалось загрузить данные заказа."
            );
        } finally {
            setLoading(false);
        }
    };

    const product = {
        name: 'Красивый и современный декор для дома, кошка с поднятой лапой.',
        price: 3624,
        weight: '300 гр',
        color: 'Красный',
        image: 'https://placehold.co/100x100',
        description: 'Красивый и современный декор для дома, кошка с поднятой лапой.',
    };
    const calculatedTotalPrice = product.price * quantity;

    return (
        <div style={{backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%', position: 'relative'}}>
            {/* Кнопка "Назад" и заголовок */}
            <div style={{
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fff',
                height: 'auto'
            }}>
                <Button type="link" onClick={handleBack} style={{fontSize: '24px', padding: 0, color: 'black'}}>
                    ←
                </Button>
                <h3 style={{flexGrow: 1, textAlign: 'center', margin: 0}}>Оформление заказа</h3>
            </div>

            <div style={{
                padding: '20px',
                height: 'auto',
            }}>
                {/* Информация о продукте */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px 10px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }}>
                        <Image src={product.image} alt={product.name} width={80} height={80}
                               style={{borderRadius: '8px', marginRight: '15px'}}/>
                        <div style={{flexGrow: 1}}>
                            <p style={{fontWeight: '500', marginBottom: '5px'}}>{product.description}</p>

                            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
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
                                    -
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
                                    +
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{display: 'flex', gap: '10px',}}>
                            <p style={{fontSize: '12px', color: '#999'}}>{product.color}</p>
                            <p style={{fontSize: '12px', color: '#999'}}>{product.weight}</p>
                        </div>
                        <div style={{fontWeight: '600', fontSize: '18px', color: 'black'}}>{calculatedTotalPrice} т
                        </div>
                    </div>
                </div>
                {/* Стоимость и доставка */}
                <div style={{padding: '15px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                        <span style={{color: '#999'}}>Стоимость товаров</span>
                        <span style={{fontWeight: '600'}}>{totalPrice} т</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                        <span style={{color: '#4BAB00'}}>Доставка</span>
                        <span style={{fontWeight: '600', color: '#4BAB00'}}>{deliveryCost} т</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                        <span style={{fontWeight: '700'}}>Общая стоимость</span>
                        <span style={{fontWeight: '700', color: '#FF6A00'}}>{totalPrice + deliveryCost} т</span>
                    </div>
                </div>

                {/* Кнопка "Оформить заказ" */}
                <Button
                    type="primary"
                    block
                    style={{
                        backgroundColor: '#FF6A00',
                        color: '#fff',
                        fontSize: '16px',
                        padding: '8px 16px',
                        height: '48px'
                    }}
                    onClick={handleOrder}
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
};

export default OrderSummary;
