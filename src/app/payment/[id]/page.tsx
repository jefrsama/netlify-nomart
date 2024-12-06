"use client";

import React, { useEffect, useState } from 'react';
import {Button, Alert, Spin} from 'antd';
import {useParams, useRouter, useSearchParams} from 'next/navigation';

const PaymentPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const orderId = params?.id;

    const totalCost = searchParams.get('totalCost');

    const [loading, setLoading] = useState<boolean>(true); // Лоадер для процесса загрузки
    const [error, setError] = useState<string | null>(null); // Ошибка при оплате
    const [selectedOption, setSelectedOption] = useState<string | null>(null); // Выбранный способ оплаты
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);

    useEffect(() => {
        if (!orderId) {
            setError("ID заказа отсутствует.");
            setLoading(false);
            return;
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [orderId]);

    const handleBack = () => router.back();

    const handlePayment = async () => {
        if (!orderId || !selectedOption) {
            alert("Ошибка: Выберите способ оплаты.");
            return;
        }

        setLoading(true);

        try {
            if (selectedOption === 'oneVision') {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Пользователь не авторизован.");
                }

                const response = await fetch(
                    "https://api.nomart.kz/order/payment-url",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ order_id: orderId }),
                    }
                );

                const data = await response.json();

                if (data.success && data.paymentUrl) {

                    window.location.href = data.paymentUrl;
                } else {
                    throw new Error(data.message || "Не удалось получить ссылку на оплату.");
                }
            } else if (selectedOption === 'kaspi') {

                alert("Оплата через Kaspi пока недоступна.");
            }
        } catch (err: any) {
            console.error("Ошибка при обработке оплаты:", err);
            setError(err.message || "Ошибка при обработке оплаты.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spin tip="Загрузка..." style={{ textAlign: 'center', marginTop: '20px' }} />;
    }

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%', position: 'relative' }}>
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div className="loading-spinner"></div> {/* Здесь можно использовать любой спиннер */}
                </div>
            )}

            {!loading && (
                <>
                    <div style={{
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        height: 'auto'
                    }}>
                        <Button type="link" onClick={handleBack} style={{ fontSize: '24px', padding: 0, color: 'black' }}>
                            ←
                        </Button>
                        <h3 style={{ flexGrow: 1, textAlign: 'center', margin: 0 }}>Выберите способ оплаты</h3>
                    </div>

                    <div style={{ padding: '20px', height: 'auto' }}>
                        <div style={{
                            backgroundColor: '#fff',
                            padding: '16px 10px',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}>
                            <p style={{ color: '#99A2AD', fontSize: '14px' }}>Выберите способ оплаты</p>
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
                                    backgroundColor: hoveredOption === 'oneVision' ? '#f5f5f5' : 'transparent',
                                    padding: '10px',
                                    borderRadius: '8px',
                                }}
                                     onMouseEnter={() => setHoveredOption('oneVision')}
                                     onMouseLeave={() => setHoveredOption(null)}
                                     onClick={() => setSelectedOption('oneVision')}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <img src="/Icon2.svg" alt="one vision" style={{ width: '24px', height: '24px' }} />
                                        <div>
                                            <span style={{ fontSize: '14px' }}>Оплата картой One Vision</span>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <img src="/Visa.svg" alt="Visa" />
                                                <img src="/MasterCard.svg" alt="MasterCard" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'background-color 0.3s',
                                    cursor: 'pointer',
                                    backgroundColor: hoveredOption === 'kaspi' ? '#f5f5f5' : 'transparent',
                                    padding: '10px',
                                    borderRadius: '8px',
                                }}
                                     onMouseEnter={() => setHoveredOption('kaspi')}
                                     onMouseLeave={() => setHoveredOption(null)}
                                     onClick={() => setSelectedOption('kaspi')}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <img src="/image1.svg" alt="Kaspi Payments" style={{ width: '24px', height: '24px' }} />
                                        <span style={{ fontSize: '14px' }}>Kaspi платежи</span>
                                    </div>
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
                            <span style={{ fontSize: '18px', fontWeight: '500', color: '#212121' }}>К оплате</span>
                            <span style={{ fontSize: '16px', fontWeight: '500', color: '#FF5720' }}>{totalCost} ₸</span>
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
                                opacity: selectedOption ? 1 : 0.5, // Эффект прозрачности, когда кнопка не активна
                                cursor: selectedOption ? 'pointer' : 'not-allowed', // Устанавливаем курсор
                            }}
                            onClick={handlePayment}
                            disabled={!selectedOption} // Кнопка будет заблокирована, пока не выбран способ оплаты
                        >
                            Оплатить заказ
                        </Button>
                    </div>
                </>
            )}

            {error && (
                <Alert
                    message="Ошибка"
                    description={error}
                    type="error"
                    showIcon
                    style={{ marginTop: '20px' }}
                />
            )}
        </div>
    );
};

export default PaymentPage;
