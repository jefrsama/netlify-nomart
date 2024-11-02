// store/types.ts
export interface StoreState {
    store: {
      // Define the shape of your store slice state
      data: any; // Replace with the actual type of your data
      loading: boolean;
      error: string | null;
    };
  }
  