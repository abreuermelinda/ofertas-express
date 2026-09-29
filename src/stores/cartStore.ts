import { create } from "zustand";

import type { Offer } from "@/types/offer";

type CartState = {
  items: Offer[];
  addItem: (offer: Offer) => void;
  removeItem: (offerId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (offer) =>
    set((state) => {
      const alreadyExists = state.items.some(
        (item) => item.id === offer.id
      );

      if (alreadyExists) {
        return state;
      }

      return {
        items: [...state.items, offer],
      };
    }),

  removeItem: (offerId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== offerId),
    })),

  clearCart: () => set({ items: [] }),
}));