import api from './api';

export const getStoreByName = async (name: string) => {
    try {
        const response = await api.get(`/store/get-by-name/${name}`);
        return response.data;
    } catch (error: any) {
        console.error('Ошибка при получении данных магазина:', error);
        throw new Error(error.response?.data?.error || 'Ошибка при получении данных');
    }
};