import { selector } from "recoil";
import { Products } from '@/state/atom/products';

export const ProductSelector = selector({
    key: 'productSelector',
    get: ({ get }) => {
        const product = get(Products);
        return product.length;
    },
});