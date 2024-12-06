'use client';

import React, { useEffect, useState } from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {Spin, Alert, Avatar, Card} from 'antd';
import { fetchStoreData } from '@/store/storeSlice';
import { RootState } from '@/store';
import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch } from '@/store';
import {useLoading} from "@/contexts/LoadingContext";
import {CheckCircleOutlined, UserOutlined} from "@ant-design/icons";
import {FaStar} from "react-icons/fa";
import reviews from "@/app/mocks/reviews";
import RatingStars from "@/components/RatingStars";
import ReviewCard from "@/components/ReviewCard";
import Image from 'next/image';
import { Product } from '@/store/types';

const StorePage = ({ params }: { params: { name: string } }) => {
    const { name } = params;
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { store, isLoading, error } = useSelector((state: RootState) => state.store);

     const { setIsLoading } = useLoading();
     const [activeTab, setActiveTab] = useState('1');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await dispatch(fetchStoreData(name));
            } catch (err) {
                console.error("Ошибка при загрузке данных магазина:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dispatch, name, setIsLoading]);

    // useEffect(() => {
    //     setIsLoading(true);
    //     dispatch(fetchStoreData(name));
    // }, [dispatch, name, setIsLoading]);

    if (isLoading) {
        return <Spin tip="Загрузка..." style={{ textAlign: 'center', marginTop: '20px' }} />;
    }

    if (error) {
        return <Alert message={error} type="error" showIcon style={{ marginTop: '20px' }} />;
    }

    const handleProductClick = (product: any) => {
        sessionStorage.setItem("selectedProduct", JSON.stringify(product));
        router.push(`/product/${product.product_id}`);
    };

    const tabStyle = {
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'border-bottom 0.3s ease, background-color 0.3s ease, opacity 0.3s ease',
        color: 'rgb(153, 153, 153)',
    };

    const activeTabStyle = {
        ...tabStyle,
        backgroundColor: 'rgba(255, 87, 32, 0.1)',
        color: '#FF5720',
        fontWeight: '500',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

  return (
      <div style={{
        backgroundColor: 'var(--background)',
        width: '100%',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        height: '100vh',
      }} className="">

        {/* Store Header */}
          <div className="scrollContainer" style={{
              flexGrow: 1,
              overflowY: 'auto',
          }}>
              <div style={{position: 'relative', width: '100%', height: '150px', overflow: 'hidden'}}>
                  {/* Background image */}
                  <Image
                      src="/store_background.jpg"
                      alt="Store Background"
                      layout="fill"
                      objectFit="cover"
                      priority={true}
                  />
              </div>

              <div style={{backgroundColor: '#fff', position: 'relative', top: '-10px'}}>
                  <div style={{width: '100%', padding: '10px 20px', display: 'flex', gap: '15px'}}>
                      <div style={{position: 'relative'}}>
                          <Avatar size={90} icon={store?.logo ?
                              <Image src={store?.logo} alt={store?.user?.avatar || 'User Avatar'} width={64} height={64}/> :
                              <UserOutlined/>}
                          />

                          <div style={{
                              backgroundColor: '#fff',
                              height: '25px',
                              position: 'absolute',
                              width: '50px',
                              left: '23%',
                              bottom: '-6px',
                              borderRadius: '30%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '4px',
                              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                          }}>
                              <FaStar style={{ color: '#FFD43A', fontSize: '16px' }} />
                              <p style={{
                                  fontSize: '14px',
                                  color: '#333',
                                  lineHeight: '1',
                                  fontWeight: 'bold',
                              }}>{store?.rating}</p>
                         </div>
                    </div>
              <div style={{
                  width: '70%',
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  margin: '0 8%',
              }}>
                          <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              fontSize: '16px',
                          }}>
                              <span>{/*{store?.subscribers || 0}*/} пока 0(надо добавить)</span>
                              <span style={{
                                  color: 'rgb(153, 153, 153)',
                              }}>Подписчиков</span>
                          </div>
                          <hr style={{
                              width: '1px',
                              height: '25px',
                              backgroundColor: '#000',
                              border: 'none',
                              margin: '0 auto',
                              opacity: '0.3'
                          }}/>
                          <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              fontSize: '16px',
                          }}>
                              <span>{store?.storeProducts?.length || 0}</span>
                              <span style={{
                                  color: 'rgb(153, 153, 153)',
                              }}>Товары</span>
                          </div>
                      </div>
                  </div>

                  <div style={{padding: '10px 20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '6px'}}>
                      {/* Store name */}
                      <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                          <h2 style={{
                              wordWrap: 'break-word',
                              overflowWrap: 'break-word',
                              maxWidth: '100%',
                              whiteSpace: 'normal',
                              lineHeight: '1.5',
                              fontSize: '20px'
                          }}>{store?.name}</h2>
                          {store?.is_verified &&
                              <CheckCircleOutlined style={{color: '#34eb43', fontSize: '24px'}}/>}
                      </div>
                      <p>
                          {store?.description}
                      </p>
                  </div>

                  {/* Навигация по вкладкам */}
                  <div style={{
                      display: 'flex',
                      width: '100%',
                      padding: '0 20px 5px 20px',
                      justifyContent: 'center',
                      gap: '20px',
                      alignItems: 'center',
                      fontSize: '14px',
                  }}>
                      <div
                          style={activeTab === '1' ? activeTabStyle : tabStyle}
                          onClick={() => setActiveTab('1')}
                      >
                          Все
                      </div>
                      <div
                          style={activeTab === '2' ? activeTabStyle : tabStyle}
                          onClick={() => setActiveTab('2')}
                      >
                          Гарантия
                      </div>
                      <div
                          style={activeTab === '3' ? activeTabStyle : tabStyle}
                          onClick={() => setActiveTab('3')}
                      >
                          Отзывы
                      </div>
                  </div>
              </div>

              <div style={{

              }}>
                  {/* Контент вкладки */}
                  <div style={{ overflow: 'hidden' }}>
                      {activeTab === '1' && (
                          <div style={{
                              padding: '10px 20px',
                              overflow: 'hidden',
                          }}>
                              <div style={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: '3%',
                              }}>
                                  {Array.isArray(store?.storeProducts) && store.storeProducts.length > 0 ? (
                                      store.storeProducts.map((product: Product) => (
                                          <div
                                              key={product.id}
                                              style={{
                                                  width: '48%',
                                                  cursor: 'pointer',
                                                  display: 'flex',
                                                  flexDirection: 'column',
                                                  justifyContent: 'space-between',
                                                  height: 'auto',
                                                  boxSizing: 'border-box',
                                                  overflow: 'hidden',
                                                  borderRadius: '10px',
                                                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                  backgroundColor: '#fff',
                                                  marginBottom: '10px',
                                              }}
                                              onClick={() => handleProductClick(product)}
                                          >
                                              <div style={{
                                                  position: 'relative',
                                                  overflow: 'hidden'
                                              }}>
                                                  <img
                                                      alt={product.product.name}
                                                      src={"https://via.placeholder.com/150"}
                                                      style={{
                                                          width: '100%',
                                                          height: 'auto',
                                                          objectFit: 'cover',
                                                      }}
                                                  />
                                              </div>
                                              <div style={{marginTop: '10px', textAlign: 'left', padding: '0 10px'}}>
                                                  <p
                                                      style={{
                                                          fontSize: '14px',
                                                          fontWeight: 'bold',
                                                          color: '#333',
                                                          margin: 0,
                                                          overflow: 'hidden',
                                                          whiteSpace: 'nowrap',
                                                          textOverflow: 'ellipsis',
                                                      }}
                                                  >
                                                      {product.product.name}
                                                  </p>
                                                  <p
                                                      style={{
                                                          fontSize: '16px',
                                                          fontWeight: 'bold',
                                                          color: '#7b4ddb',
                                                          margin: '5px 0',
                                                      }}
                                                  >
                                                      {`${product.product.price} ₸`}
                                                  </p>
                                              </div>
                                              <div
                                                  style={{
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      marginTop: '5px',
                                                      padding: '0 10px 10px 10px'
                                                  }}
                                              >
                                                  <FaStar
                                                      style={{color: '#FFD43A', fontSize: '14px', marginRight: '4px'}}/>
                                                  <span style={{
                                                      fontSize: '12px',
                                                      color: '#333'
                                                  }}>{store.rating}</span>
                                                  <span style={{fontSize: '12px', color: '#CBCFD4', marginLeft: '8px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                                                     <img src="/Ellipse.svg" alt=""/> {`${store.rating} отзыва`}
                                                  </span>
                                              </div>
                                          </div>

                                      ))
                                  ) : (
                                      <div style={{textAlign: 'center', width: '100%'}}>
                                          <p>Добавить товар</p>
                                      </div>
                                  )}
                              </div>
                          </div>
                      )}
                      {activeTab === '2' && (
                          <div style={{
                              padding: '10px 20px',
                              overflow: 'hidden',
                          }}>
                              <p>Гарантийная информация.</p>
                          </div>
                      )}
                      {activeTab === '3' && (
                          <div style={{
                              padding: '10px 20px',
                              overflow: 'hidden',
                              backgroundColor: '#fff',
                          }}>
                              {/* Если еще идет загрузка отзывов */}
                              {isLoading ? (
                                  <Spin tip="Загрузка отзывов..." style={{textAlign: 'center', marginTop: '20px'}}/>
                              ) : reviews.length === 0 ? (
                                  <p>Нет отзывов</p>
                              ) : (
                                  <div>
                                      <div style={{
                                          backgroundColor: '#F2F2F2',
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          flexDirection: 'column',
                                          padding: '15px',
                                          marginBottom: '15px',
                                          border: '1px solid #ddd',
                                          borderRadius: '8px',
                                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                          gap: '5px'
                                      }}>
                                          <p style={{
                                            color: '#99A2AD',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                          }}>
                                              Рейтинг магазина
                                          </p>
                                          <RatingStars rating={store?.rating || 0} />
                                          <p style={{
                                              color: '#212121',
                                              fontSize: '22px',
                                              fontWeight: '600',
                                              display: 'flex',
                                              gap: '5px',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                          }}>
                                              {store?.rating}
                                              <span style={{
                                                  color: '#99A2AD',
                                                  fontSize: '14px',
                                                  fontWeight: '500',
                                              }}>
                                                  / 5
                                              </span>
                                          </p>
                                      </div>

                                      {/* Карточки с отзывами */}
                                      {reviews.map((review, index) => (
                                          <ReviewCard
                                              key={index}
                                              user={review.user}
                                              rating={review.rating}
                                              comment={review.comment}
                                              date={review.date}
                                              images={review.images}
                                          />
                                      ))}
                                  </div>
                              )}
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </div>
  );
};

export default StorePage;