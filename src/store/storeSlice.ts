'use client';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getStoreByName } from '@/services/storeService';
import { StoreProduct } from '@/store/types';

// Интерфейс для данных магазина
interface Store {
    logo?: string | null;
    name?: string;
    is_verified?: boolean;
    description?: string;
    rating?: number;
    user?: {
        avatar?: string | null;
        [key: string]: any;
    };
    storeProducts: StoreProduct[];
}

// Интерфейс для состояния Redux
interface StoreState {
    store: Store | null;
    isLoading: boolean;
    error: string | null;
}

// Начальное состояние
const initialState: StoreState = {
    store: null,
    isLoading: false,
    error: null,
};

// Асинхронный thunk для загрузки данных магазина
export const fetchStoreData = createAsyncThunk(
    'store/fetchStoreData',
    async (name: string, { rejectWithValue }) => {
        try {
            const data: Store = await getStoreByName(name); // Указываем тип данных для результата
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice для управления состоянием магазина
const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStoreData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchStoreData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.store = action.payload as Store;
            })
            .addCase(fetchStoreData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default storeSlice.reducer;
