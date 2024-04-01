import { Category } from "@/types/productTypes";
import { create } from "zustand";

interface CartItemI {
    productId: number;
    quantity: number;
    price: number;
    img: string;
    name: string;
}

export enum cartQuantityUpdate {
    add = 'ADD',
    subtract = 'SUBTRACT'
}

type StoreState = {
    searchString: string;
    category: Category | undefined;
    setCategory: (payload: Category | undefined) => void;
    setSearchString: (payload: string) => void;
    cartItems: CartItemI[];
    setCartItem: (payload: CartItemI) => void;
    updateCartItemQuantity: (payload: { action: cartQuantityUpdate, id: number }) => void;
    removeCartItem: (payload: number) => void;
};

const useStore = create<StoreState>((set, get) => ({
    searchString: "",
    category: undefined,
    cartItems: [],
    setCategory: (payload) => {
        set({
            category: payload,
        });
    },
    setSearchString: (payload) => {
        set({
            searchString: payload,
        });
    },
    setCartItem: (payload) => {
        const existingItem = get().cartItems.find(item => item.productId === payload.productId);

        if (existingItem) {
            alert('This item is already added to the cart.');
        } else {
            set({
                cartItems: [...get().cartItems, { ...payload, quantity: 1 }]
            });
        }
    },
    updateCartItemQuantity: ({ action, id }) => {
        const cartItems = get().cartItems;
        const updatedCartItems = cartItems.map((item) => {
            if (item.productId === id) {
                if (action === cartQuantityUpdate.add) {
                    return { ...item, quantity: item.quantity + 1 };
                } else if (action === cartQuantityUpdate.subtract && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
            }
            return item;
        });
        set({ cartItems: updatedCartItems });
    },
    removeCartItem: (id: number) => {
        const cartItems = get().cartItems;
        const updatedCartItems = cartItems.filter((item) => item.productId !== id);
        set({ cartItems: updatedCartItems });
    }
}));

export default useStore;
