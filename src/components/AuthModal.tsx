import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { sendAuthCode, loginWithCode } from '@/services/authService';
import { createAddress } from '@/services/addressService';

const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [step, setStep] = useState(1); // Шаги (1 - ввод email, 2 - ввод кода, 3 - ввод адреса)
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    // Поля для адреса
    const [street, setStreet] = useState('');
    const [region, setRegion] = useState('');
    const [district, setDistrict] = useState('');
    const [house, setHouse] = useState('');
    const [flat, setFlat] = useState('');
    const [x, setX] = useState<number | undefined>(undefined); // Широта
    const [y, setY] = useState<number | undefined>(undefined); // Долгота

    // Отправка кода
    const handleSendCode = async () => {
        setLoading(true);
        try {
            const response = await sendAuthCode({ email, fcm_token: '', is_seller: false });
            message.success(response.message);
            setStep(2); // Переход на шаг 2
        } catch (error: any) {
            console.error('Error sending code:', error);
            if (error.response?.status === 404) {
                message.error('Пользователь не найден!');
            } else {
                message.error('Ошибка при отправке кода!');
            }
        } finally {
            setLoading(false);
        }
    };

    // Вход с кодом
    const handleLoginWithCode = async () => {
        setLoading(true);
        try {
            const response = await loginWithCode({ email, code });
            const { token } = response;

            localStorage.setItem('token', token); // Сохраняем токен в localStorage

            message.success('Вы успешно авторизованы!');
            setStep(3); // Переход на шаг 3 (ввод адреса)
        } catch (error: any) {
            console.error('Error logging in:', error);
            if (error.response?.status === 404) {
                message.error('Пользователь не найден или неверный код!');
            } else {
                message.error('Ошибка входа!');
            }
        } finally {
            setLoading(false);
        }
    };

    // Создание адреса
    const handleCreateAddress = async () => {
        setLoading(true);
        try {
            const xValue = x !== undefined ? x : 0;
            const yValue = y !== undefined ? y : 0;

            const addressData = {
                street,
                region,
                district,
                house,
                flat,
                x: xValue,
                y: yValue,
                address_en: `${region}, ${district}, ${street}, ${house}, ${flat}`,
                address_ru: `${region}, ${district}, ${street}, ${house}, ${flat}`,
                address_kz: `${region}, ${district}, ${street}, ${house}, ${flat}`,
                type: 'CURRENT',
            };

            const response = await createAddress(addressData);
            message.success('Адрес успешно добавлен!');
            onClose(); // Закрываем модальное окно
        } catch (error: any) {
            console.error('Error creating address:', error);
            message.error('Ошибка при добавлении адреса!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={
                step === 1
                    ? 'Введите ваш Email'
                    : step === 2
                        ? 'Введите код подтверждения'
                        : 'Введите данные адреса'
            }
            visible={true}
            onCancel={onClose}
            footer={null}
            centered
        >
            {step === 1 && (
                <div>
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: '16px' }}
                    />
                    <Button
                        type="primary"
                        block
                        onClick={handleSendCode}
                        loading={loading}
                    >
                        Отправить код
                    </Button>
                </div>
            )}
            {step === 2 && (
                <div>
                    <Input
                        placeholder="Код подтверждения"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        style={{ marginBottom: '16px' }}
                    />
                    <Button
                        type="primary"
                        block
                        onClick={handleLoginWithCode}
                        loading={loading}
                    >
                        Войти
                    </Button>
                </div>
            )}
            {step === 3 && (
                <div>
                    <Input
                        placeholder="Улица"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        style={{ marginBottom: '8px' }}
                    />
                    <Input
                        placeholder="Регион"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        style={{ marginBottom: '8px' }}
                    />
                    <Input
                        placeholder="Район"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        style={{ marginBottom: '8px' }}
                    />
                    <Input
                        placeholder="Дом"
                        value={house}
                        onChange={(e) => setHouse(e.target.value)}
                        style={{ marginBottom: '8px' }}
                    />
                    <Input
                        placeholder="Квартира"
                        value={flat}
                        onChange={(e) => setFlat(e.target.value)}
                        style={{ marginBottom: '8px' }}
                    />
                    <Input
                        placeholder="Широта (опционально)"
                        value={x?.toString() || ''}
                        onChange={(e) => setX(parseFloat(e.target.value))}
                        style={{ marginBottom: '8px' }}
                    />
                    <Input
                        placeholder="Долгота (опционально)"
                        value={y?.toString() || ''}
                        onChange={(e) => setY(parseFloat(e.target.value))}
                        style={{ marginBottom: '8px' }}
                    />
                    <Button
                        type="primary"
                        block
                        onClick={handleCreateAddress}
                        loading={loading}
                    >
                        Добавить адрес
                    </Button>
                </div>
            )}
        </Modal>
    );
};

export default AuthModal;
