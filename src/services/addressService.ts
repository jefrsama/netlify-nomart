import api from './api';

export const createAddress = async (data: {
    street: string;
    region: string;
    district: string;
    house: string;
    flat: string;
    x: number;
    y: number;
    address_en: string;
    address_ru: string;
    address_kz: string;
    type: string;
}) => {
    const response = await api.post('/address/create', data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};