'use client';

import React from 'react';
import { Card } from 'antd';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  availableQuantity: number;
  colors: string[];
  rating: number;
  store: {
    name: string;
    rating: number;
  };
  characteristics: Record<string, string>;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
      <Card hoverable cover={<img alt={product.name} src={product.image} style={{width: '100%'}}/>}>
        <Card.Meta title={product.name} description={`${product.price} ₽`} />
      </Card>
  );
};

export default ProductCard;
