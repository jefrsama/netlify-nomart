import api from './api';

export const sendAuthCode = async (data: { email: string; fcm_token?: string; is_seller?: boolean }) => {
    const response = await api.post('/auth/code', data);
    return response.data;
};

export const loginWithCode = async (data: { email: string; code: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};