import api from './api';

export const getStoreNameFromURL = (): string | null => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    if (parts.length < 3) {
        console.error('Некорректный URL, storename отсутствует');
        return null;
    }
    return parts[0];
};

export const getStoreByName = async (name: string) => {
    try {
        const response = await api.get(`/store/get-by-name/${name}`);
        return response.data;
    } catch (error: any) {
        console.error('Ошибка при получении данных магазина:', error);
        throw new Error(error.response?.data?.error || 'Ошибка при получении данных');
    }
};