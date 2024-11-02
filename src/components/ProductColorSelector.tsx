import React from 'react';
import Image from 'next/image';
import { FireOutlined } from '@ant-design/icons';

interface ProductColorSelectorProps {
    productColors: { id: number; name: string; image: string; isPopular: boolean }[];
    selectedColorIndex: number;
    onColorClick: (index: number) => void;
}

const ProductColorSelector: React.FC<ProductColorSelectorProps> =
    ({
         productColors,
         selectedColorIndex,
         onColorClick,
     }) => {

        return (
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {productColors.map((color, index) => (
                    <div
                        key={color.id}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '5px',
                            border: selectedColorIndex === index ? '2px solid orange' : '2px solid transparent',
                            borderRadius: '4px',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                        onClick={() => onColorClick(index)}
                    >
                        {selectedColorIndex === index && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    backgroundColor: 'orange',
                                    color: '#fff',
                                    padding: '5px',
                                    borderRadius: '4px',
                                }}
                            >
                                {color.name}
                            </div>
                        )}

                        <Image src={color.image} alt={color.name} width={60} height={60} style={{ borderRadius: '4px' }} />

                        {color.isPopular && (
                            <div style={{ position: 'absolute', bottom: '-2px', right: '0px' }}>
                                <FireOutlined style={{ fontSize: '16px' }} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

export default ProductColorSelector;
