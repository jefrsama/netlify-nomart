import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './index';

interface StoreState {
  store: {
    name: string;
    id: string;
    logo?: string;
  };
  products: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
  }>;
  isLoading: boolean;
}

const initialState: StoreState = {
  store: {
    name: '',
    id: '',
  },
  products: [],
  isLoading: false,
};

// Асинхронный thunk для получения данных магазина
export const fetchStoreData = createAsyncThunk(
  'store/fetchStoreData',
  async (id: string) => {
    const response = await fetch(`/api/store/${id}`);
    const data = await response.json();
    return data;
  }
);

// Асинхронный thunk для получения товаров магазина
export const fetchStoreProducts = createAsyncThunk(
  'store/fetchStoreProducts',
  async (id: string) => {
    const response = await fetch(`/api/store/${id}/products`);
    const data = await response.json();
    return data;
  }
);

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Combined fulfilled case for fetchStoreData
    builder.addCase(fetchStoreData.fulfilled, (state, action) => {
      state.store = action.payload;
      state.isLoading = false; // Update both store and isLoading here
    });

    // Handle pending and rejected cases for fetchStoreData
    builder.addCase(fetchStoreData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStoreData.rejected, (state) => {
      state.isLoading = false;
    });

    // Separate fulfilled case for fetchStoreProducts
    builder.addCase(fetchStoreProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default storeSlice.reducer;
