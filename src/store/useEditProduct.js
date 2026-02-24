import {create} from "zustand";

export const useEditProduct = create((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
  clearProduct: () => set({ product: null }),
}));