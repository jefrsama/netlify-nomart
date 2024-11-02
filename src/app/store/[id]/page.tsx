'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoreData, fetchStoreProducts } from '@/store/storeSlice';
import { RootState } from '@/store/';
import ProductCard from '@/components/ProductCard';
import { Tabs, Button, Row, Col, Space, Avatar } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import Image from 'next/image';
import { UserOutlined, StarFilled, WhatsAppOutlined, CheckCircleOutlined } from '@ant-design/icons';

const StorePage: React.FC = () => {
  const params = useParams();
  const id = params?.id;
  const dispatch = useAppDispatch();

  // const products = useSelector((state: RootState) => state.store.products);
  const isLoading = useSelector((state: RootState) => state.store.isLoading);

  const router = useRouter();

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const store = {
    id: 1,
    name: 'Название магазина',
    description: 'dsadasda',
    logo: null,
    rating: 5.0,
    subscribers: 0,
    products: [
      {
        id: 1,
        name: 'Красивая белая кофта, осенняя',
        price: 1600,
        image: 'https://placehold.co/32',
        description: 'Красивая белая кофта, осенняя, изящная свободного кроя',
        availableQuantity: 4000,
        colors: ['#D1B48C', '#FFF'],
        rating: 4.8,
        store: {
          name: 'Айнур магазин',
          rating: 4.8,
        },
        characteristics: {
          'Силуэт': 'свитер',
          'Модель': 'свитер',
          'Материал': 'свитер',
        },
      },
      {
        id: 1,
        name: 'Красивая белая кофта, осенняя',
        price: 1600,
        image: 'https://placehold.co/400',
        description: 'Красивая белая кофта, осенняя, изящная свободного кроя',
        availableQuantity: 4000,
        colors: ['#D1B48C', '#FFF'],
        rating: 4.8,
        store: {
          name: 'Айнур магазин',
          rating: 4.8,
        },
        characteristics: {
          'Силуэт': 'свитер',
          'Модель': 'свитер',
          'Материал': 'свитер',
        },
      }
    ],
  };


  const products  = store.products;
  useEffect(() => {
    if (id) {
      dispatch(fetchStoreData(id as string));
      dispatch(fetchStoreProducts(id as string));
    }
  }, [id, dispatch]);

  return (
      <div style={{ backgroundColor: 'var(--background)' }}>
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
          <div style={{width: '100%', padding: '20px', display: 'flex', gap: '20px'}}>
            <div style={{width: '30%'}}>
              <Avatar size={64} icon={store.logo ? <Image src={store.logo} alt={store.name} width={64} height={64} /> : <UserOutlined />} />
            </div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
              <div style={{ fontSize: '16px' }}>0 Подписчиков</div>
              <div style={{ fontSize: '16px' }}>0 Товаров</div>
            </div>
          </div>

          <div style={{ padding: '20px', width: '100%' }}>
            {/* Store name */}
            <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold'}}>{store.name}</h1>
              <CheckCircleOutlined style={{color: '#34eb43', fontSize: '24px'}}/>
            </div>
            <p>
              {store.description}
            </p>
            {/* Store rating */}
          </div>
          <div style={{ padding: '20px', width: '100%', display: 'flex', gap: '20px' }}>
            <WhatsAppOutlined style={{ color: '#34eb43', fontSize: '24px' }}/>
            <Button block type="primary" style={{ padding: '10px 30px', fontSize: '16px', width: '100%' }}>Подписаться</Button>
          </div>
        </div>

        {/* Tabbed Content */}
        <Tabs defaultActiveKey="1" centered style={{ padding: '0 20px' }}>
          <Tabs.TabPane tab="Все" key="1">
            <Row gutter={[16, 16]}>
              {products.length > 0 ? products.map((product) => (
                  <Col key={product.id} xs={12} sm={12} lg={12} onClick={() => handleProductClick(product.id)}>
                    <ProductCard product={product}/>
                  </Col>
              )) : (
                  // Placeholder when no products exist
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
  );
};

export default StorePage;
