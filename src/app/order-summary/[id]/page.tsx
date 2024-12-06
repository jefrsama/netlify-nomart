"use client";

import React, {useEffect, useState} from "react";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {Alert, Button, Spin} from "antd";
import Image from 'next/image';
import axios from "axios";
import { useLoading } from '@/contexts/LoadingContext';
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {StoreProduct} from "@/store/types";

const OrderSummary = () => {
    const searchParams = useSearchParams();
    const params = useParams();
    const router = useRouter();

    const orderId = params?.id;

    const storeData = useSelector((state: RootState) => state.store.store);

    const [quantity, setQuantity] = useState(Number(searchParams.get("quantity")) || 1);
    const [productPrice] = useState(Number(searchParams.get("totalPrice")) || 0);
    const [deliveryCost] = useState(7233);
    const [productId] = useState(searchParams.get("productId") || "");

    // Поиск продукта в storeData
    const product = storeData?.storeProducts?.find((p: StoreProduct) => p.product_id === productId);

    if (!product) {
        return <div>Продукт не найден</div>;
    }

    // Получение данных из query-параметров


    const { setIsLoading } = useLoading();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const calculatedTotalPrice = productPrice * quantity;

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Обновление query-параметров в URL при изменении количества
    const updateQueryParams = (newQuantity: number) => {
        const queryParams = new URLSearchParams({
            quantity: newQuantity.toString(),
            totalPrice: (productPrice * newQuantity).toString(),
            productId,
        });

        router.replace(`/order-summary/${orderId}?${queryParams.toString()}`);
    };

    const handleIncreaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQueryParams(newQuantity);
    };

    const handleDecreaseQuantity = () => {
        const newQuantity = Math.max(1, quantity - 1);
        setQuantity(newQuantity);
        updateQueryParams(newQuantity);
    };

    const handleBack = () => router.back();

    if (loading) {
        return <Spin tip="Загрузка..." style={{ textAlign: 'center', marginTop: '20px' }} />;
    }

    const handleOrder = async () => {
        try {
            const totalCost = calculatedTotalPrice + deliveryCost;

            console.log('Итоговая стоимость заказа:', totalCost);

            const id = Array.isArray(orderId) ? orderId[0] : orderId || "";

            const queryParams = new URLSearchParams({
                totalCost: totalCost.toString(),
            }).toString();

            const fullPath = `/payment/${id}?${queryParams}`;

            router.push(fullPath);
        } catch (err) {
            console.error('Ошибка при оформлении заказа:', err);
        }
    };


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
                        <Image src={'https://placehold.co/500'} alt={product.product.name} width={80} height={80}
                               style={{borderRadius: '8px', marginRight: '15px'}}/>
                        <div style={{flexGrow: 1}}>
                            <p style={{fontWeight: '500', marginBottom: '5px'}}>{product.product.other}</p>

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
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{display: 'flex', gap: '10px',}}>
                            <p style={{fontSize: '12px', color: '#999'}}>{/*product.product.color ||*/} { 'color'}</p>
                            <p style={{fontSize: '12px', color: '#999'}}>{/*product.product.weight ||*/}{ 'weight'}</p>
                        </div>
                        <div style={{fontWeight: '600', fontSize: '18px', color: 'black'}}>
                            {calculatedTotalPrice} т
                        </div>
                    </div>
                </div>
                {/* Стоимость и доставка */}
                <div style={{padding: '15px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '20px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                        <span style={{color: '#999'}}>Стоимость товаров</span>
                        <span style={{fontWeight: '600'}}>{productPrice} т</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                        <span style={{color: '#4BAB00'}}>Доставка</span>
                        <span style={{fontWeight: '600', color: '#4BAB00'}}>{deliveryCost} т</span>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                        <span style={{fontWeight: '700'}}>Общая стоимость</span>
                        <span style={{fontWeight: '700', color: '#FF6A00'}}>{productPrice + deliveryCost} т</span>
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

// @ts-ignore
export default OrderSummary;
