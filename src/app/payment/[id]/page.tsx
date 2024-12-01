"use client";

import React, {useEffect, useState} from 'react';
import { Button } from 'antd';
import {useParams, useRouter} from 'next/navigation';
import axios from "axios";

const PaymentPage: React.FC = () => {
    const router = useRouter();

    const params = useParams();
    const orderId = params?.id; // Получение ID заказа из маршрута
    const [orderData, setOrderData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        fetchOrderData();
    }, [orderId]);

    const handleBack = () => router.back();
    const handlePayment = async () => {
        if (!orderId) {
            alert("Ошибка: ID заказа отсутствует.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Пользователь не авторизован.");
            }

            const response = await axios.post(
                "https://api.nomart.kz/order/payment-url",
                { order_id: orderId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success && response.data.paymentUrl) {
                // Переход на страницу оплаты
                window.location.href = response.data.paymentUrl;
            } else {
                throw new Error(response.data.message || "Не удалось получить ссылку на оплату.");
            }
        } catch (err: any) {
            console.error("Ошибка при обработке оплаты:", err);
            alert(err.response?.data?.message || "Ошибка при обработке оплаты.");
        }
    };

    const [hoveredOption, setHoveredOption] = useState<string | null>(null);

    return (
        <div style={{backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%', position: 'relative'}}>
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
                <h3 style={{flexGrow: 1, textAlign: 'center', margin: 0}}>Выберите способ оплаты</h3>
            </div>

            <div style={{
                padding: '20px',
                height: 'auto',
            }}>
                <div style={{
                    backgroundColor: '#fff',
                    padding: '16px 10px',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                    <p style={{
                        color: '#99A2AD',
                        fontSize: '14px',
                    }}>Выберите способ оплаты</p>
                    <div style={{
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer',
                            backgroundColor:
                                hoveredOption === 'oneVision' ? '#f5f5f5' : 'transparent',
                            padding: '10px',
                            borderRadius: '8px',
                        }}
                             onMouseEnter={() => setHoveredOption('oneVision')}
                             onMouseLeave={() => setHoveredOption(null)}
                             onClick={handlePayment}
                        >
                            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                <img src="/Icon2.svg" alt="one vision" style={{width: '24px', height: '24px'}}/>
                                <div>
                                    <span style={{
                                        fontSize: '14px',
                                    }}>Оплата картой One Vision</span>
                                    <div style={{
                                        display: 'flex',
                                        gap: '8px',
                                    }}>
                                        <img src="/Visa.svg" alt=""/>
                                        <img src="/MasterCard.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <Button type="link" style={{color: '#FF5720', fontWeight: 'bold'}}>
                                <img src="/next.svg" alt=""/>
                            </Button>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer',
                            backgroundColor:
                                hoveredOption === 'kaspi' ? '#f5f5f5' : 'transparent',
                            padding: '10px',
                            borderRadius: '8px',
                        }}
                             onMouseEnter={() => setHoveredOption('kaspi')}
                             onMouseLeave={() => setHoveredOption(null)}
                             onClick={() => alert('Оплата kaspi, в будущем!')}
                        >
                            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                <img src="/image1.svg" alt="Kaspi Payments" style={{width: '24px', height: '24px'}}/>
                                <span style={{
                                        fontSize: '14px',
                                    }}>Kaspi платежи</span>
                            </div>
                            <Button type="link" style={{color: '#FF5720', fontWeight: 'bold'}}>
                                <img src="/next.svg" alt=""/>
                            </Button>
                        </div>
                    </div>
                </div>

                <div style={{
                    marginTop: '20px',
                    backgroundColor: '#fff',
                    padding: '16px 10px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <span style={{fontSize: '18px', fontWeight: '500', color: '#212121'}}>К оплате</span>
                    <span style={{fontSize: '16px', fontWeight: '500', color: '#FF5720'}}>12 233 т</span>
                </div>
            </div>

            <div style={{
                position: 'absolute',
                width: '100%',
                bottom: '2vh',
                padding: '20px'
            }}>
                <Button
                    type="primary"
                    block
                    style={{
                        backgroundColor: '#FF5720',
                        color: '#fff',
                        fontSize: '16px',
                        padding: '8px 16px',
                        height: '48px',
                    }}
                    onClick={handlePayment}
                >
                    Оплатить заказ
                </Button>
            </div>
        </div>
    );
};

export default PaymentPage;
