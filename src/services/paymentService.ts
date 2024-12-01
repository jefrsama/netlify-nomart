import api from './api';

export const createPayment = async (data: { amount: number; method: string }) => {
    const response = await api.post('/payments', data);
    return response.data;
};

export const getPaymentMethods = async () => {
    const response = await api.get('/payments/methods');
    return response.data;
};
