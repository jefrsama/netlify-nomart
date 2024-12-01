import api from './api';

// export const createOrder = async (orderData: {
//     order_items: { store_product_id: string; product_amount: number; }[];
// }, p0: { headers: { Authorization: string; }; }) => {
//     const response = await api.post('/order/create', orderData);
//     return response.data;
// };

export const createOrder = async (data: any, config = {}) => {
    const response = await api.post('/order/create', data, config);
    return response.data;
};