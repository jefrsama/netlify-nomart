'use client';

import React from 'react';
import { Card } from 'antd';

const defaultProduct: Product = {
  id: 0,
  name: "Unnamed product",
  price: 0,
  image: "https://via.placeholder.com/150",
  description: "No description",
  availableQuantity: 0,
  colors: [],
  rating: 0,
  store: {
    name: "Unknown store",
    rating: 0,
  },
  characteristics: {}
};

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;  // Сделаем поля опциональными временно
  description?: string;
  availableQuantity?: number;
  colors?: string[];
  rating?: number;
  store?: {
    name: string;
    rating: number;
  };
  characteristics?: Record<string, string>;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product = defaultProduct }) => {
  return (
      <Card hoverable cover={<img alt={product.name} src={product.image} style={{width: '100%'}}/>}>
        <Card.Meta title={product.name} description={`${product.price} ₽`} />
      </Card>
  );
};

export default ProductCard;
