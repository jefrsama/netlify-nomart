'use client';

import React, {useEffect, useState} from 'react';
import ProductCard from '@/components/ProductCard';
import {Tabs, Button, Row, Col, Space, Avatar, Spin, Alert} from 'antd';
import {useParams, useRouter, useSearchParams} from 'next/navigation';
import Image from 'next/image';
import { UserOutlined, StarFilled, WhatsAppOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { getStoreByName } from '@/services/storeService';

const StorePage = ({ params }: { params: { name: string } }) => {
  const storeName = params.name;

  const [storeData, setStoreData] = useState<any | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

   const router = useRouter();

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const data = await getStoreByName(storeName);
        setStoreData(data);
        setProducts(
            data.StoreProducts.map((p: any) => ({
              id: p.product_id,
              product_id: p.id,
              name: p.product.name,
              price: p.store_price,
              image: p.product.images[0] || "https://via.placeholder.com/150",
              description: p.product.other || "Описание отсутствует",
              availableQuantity: 100,
              rating: 4.5,
            }))
        );
      } catch (err) {
        setError("Ошибка при получении данных магазина.");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [storeName]);

  if (loading) {
    return <Spin tip="Загрузка..." style={{ textAlign: 'center', marginTop: '20px' }} />;
  }

  if (error) {
    return <Alert message={error} type="error" showIcon style={{ marginTop: '20px' }} />;
  }

  const handleProductClick = (product: any) => {
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    router.push(`/product/${product.product_id}`);
  };

  return (
      <div style={{
        backgroundColor: 'var(--background)',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        height: '100vh',
      }} className="">

        {/* Store Header */}
        <div style={{ }}>
          <div style={{ position: 'relative', width: '100%', height: '150px', overflow: 'hidden' }}>
            {/* Background image */}
            <Image
                src="/background.jpg"
                alt="Store Background"
                layout="fill"
                objectFit="cover"
                priority={true}
            />
          </div>

          <div style={{backgroundColor: '#fff'}}>
            <div style={{width: '100%', padding: '20px', display: 'flex', gap: '20px'}}>
              <div style={{width: '30%'}}>
                <Avatar size={90} icon={storeData?.logo ?
                    <Image src={storeData?.logo} alt={storeData?.name} width={64} height={64}/> : <UserOutlined/>}/>
              </div>
              <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <div style={{fontSize: '16px'}}>{storeData?.subscribers || 0} Подписчиков</div>
                <div style={{fontSize: '16px'}}>{products.length} Товаров</div>
              </div>
            </div>

            <div style={{padding: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '6px'}}>
              {/* Store name */}
              <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                <h1 style={{fontSize: '24px', fontWeight: 'bold', maxWidth: '100%'}}>{storeData?.name}</h1>
                {storeData?.is_verified && <CheckCircleOutlined style={{color: '#34eb43', fontSize: '24px'}}/>}
              </div>
              <p>
                {storeData?.description}
              </p>
              {/* Store rating */}
            </div>

            <div style={{padding: '20px', width: '100%', display: 'flex', gap: '20px', alignItems: 'center'}}>
              <WhatsAppOutlined style={{color: 'orange', fontSize: '26px'}}/>
              <Button block type="primary"
                      style={{padding: '20px 30px', fontSize: '16px', width: '100%'}}>Подписаться</Button>
            </div>
            {/* Tabbed Content */}
            <Tabs defaultActiveKey="1" centered style={{padding: '0 20px'}}>
              <Tabs.TabPane tab="Все" key="1">
                <Row gutter={[16, 16]}>
                  {products.length > 0 ? products.map((product) => (
                      <Col key={product.id} xs={12} sm={12} lg={12} onClick={() => handleProductClick(product)}>
                        <ProductCard product={product}/>
                      </Col>
                  )) : (
                      <Col span={24} style={{ textAlign: 'center' }}>
                        <p>Добавить товар</p>
                      </Col>
                  )}
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Акции" key="2">
                <p>Здесь будут акции.</p>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Гарантия" key="3">
                <p>Гарантийная информация.</p>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Отзывы" key="4">
                <p>Отзывы покупателей.</p>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
  );
};

export default StorePage;
