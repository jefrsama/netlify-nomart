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
            <div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {productColors.map((color, index) => (
                        <div
                            key={color.id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'relative',
                                cursor: 'pointer',
                            }}
                            onClick={() => onColorClick(index)}
                        >
                            {selectedColorIndex === index && (
                                <span style={{margin: '5px 0'}}>Цвет:  <span
                                    style={{fontWeight: 'bold'}}>{color.name}</span></span>
                            )}
                        </div>
                    ))}
                </div>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                    {productColors.map((color, index) => (
                        <div
                            key={color.id}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '2px',
                                border: selectedColorIndex === index ? '2px solid #FF5720' : '2px solid transparent',
                                borderRadius: '4px',
                                position: 'relative',
                                cursor: 'pointer',
                            }}
                            onClick={() => onColorClick(index)}
                        >
                            <Image src={color.image} alt={color.name} width={60} height={60}
                                   style={{borderRadius: '4px'}}/>

                            {/*{color.isPopular && (*/}
                            {/*    <div style={{position: 'absolute', bottom: '-2px', left: '0px'}}>*/}
                            {/*        <FireOutlined style={{fontSize: '16px'}}/>*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

export default ProductColorSelector;
