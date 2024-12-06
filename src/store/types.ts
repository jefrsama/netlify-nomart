// store/types.ts
import {Store} from "redux";

export interface StoreState {
    store: {
      // Define the shape of your store slice state
      data: Store | null; // Replace with the actual type of your data
      loading: boolean;
      error: string | null;
    };
  }

export interface StoreProduct {
    id: string;
    store_id: string;
    product_id: string;
    store_price: number;
    self_supplied: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    product: {
        _id: string;
        name: string;
        price: number;
        ctx: Record<string, any>;
        other: string;
        id: string;
        images: string[];
        __v: number;
    };
}

export interface Product {
    id: string;
    store_id: string;
    product_id: string;
    store_price: number;
    self_supplied: boolean;
    createdAt: string;
    updatedAt: string;
    product: {
        id: string;
        name: string;
        price: number;
        images: string[];
    };
}