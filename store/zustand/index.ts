import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { SugarProductSchema } from '@/types/sugar-product-schema';

type ProductCardType = {
  title: string;
  id: string;
};

interface CartState {
  carts: SugarProductSchema[];
  addToCart: (
    id: string,
    title: string,
    brand: string,
    coverImage: string,
    stock: number
  ) => void;
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        carts: [],
        addToCart: (id, title, brand, coverImage, stock) =>
          set((state) => ({
            carts: [...state.carts, { id, title, brand, coverImage, stock }],
          })),
      }),
      {
        name: 'cart-storage',
      }
    )
  )
);

export default useCartStore;

// const useBearStore = create<BearState>()(
//   devtools(
//     persist(
//       (set) => ({
//         bears: 0,
//         increase: (by) => set((state) => ({ bears: state.bears + by })),
//       }),
//       {
//         name: 'bear-storage',
//       }
//     )
//   )
// )
