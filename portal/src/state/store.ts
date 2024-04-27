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
  add = "ADD",
  subtract = "SUBTRACT",
}

type StoreState = {
  searchString: string;
  category: Category | undefined;
  setCategory: (payload: Category | undefined) => void;
  setSearchString: (payload: string) => void;
  cartItems: CartItemI[];
  setCartItem: (payload: CartItemI) => void;
  updateCartItemQuantity: (payload: {
    action: cartQuantityUpdate;
    id: number;
  }) => void;
  removeCartItem: (payload: number) => void;
};

const useStore = create<StoreState>((set, get) => ({
  searchString: "",
  category: undefined,
  cartItems: [
    {
        productId: 18,
        name: "Pot Flower Roses Multiple",
        price: 12,
        img: "https://flowerbox.s3.ca-central-1.amazonaws.com/products/1713941386838_1_Section%20%C3%A2%C2%86%C2%92%20shop-10-img.jpg.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU6GD3PPKE3IZQEL3%2F20240424%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240424T170928Z&X-Amz-Expires=3600&X-Amz-Signature=18f62b154d23cab198792a7f571a7f3265abf97473020a45c69918dcb82ce360&X-Amz-SignedHeaders=host&x-id=GetObject",
        quantity: 0
    },
    {
        productId: 17,
        name: "Pot Flower Roses Multiple",
        price: 12,
        img: "https://flowerbox.s3.ca-central-1.amazonaws.com/products/1713941386838_1_Section%20%C3%A2%C2%86%C2%92%20shop-10-img.jpg.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU6GD3PPKE3IZQEL3%2F20240424%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240424T170928Z&X-Amz-Expires=3600&X-Amz-Signature=18f62b154d23cab198792a7f571a7f3265abf97473020a45c69918dcb82ce360&X-Amz-SignedHeaders=host&x-id=GetObject",
        quantity: 0
    },
    {
        productId: 16,
        name: "Pot Flower Roses Multiple",
        price: 12,
        img: "https://flowerbox.s3.ca-central-1.amazonaws.com/products/1713941386838_1_Section%20%C3%A2%C2%86%C2%92%20shop-10-img.jpg.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAU6GD3PPKE3IZQEL3%2F20240424%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240424T170928Z&X-Amz-Expires=3600&X-Amz-Signature=18f62b154d23cab198792a7f571a7f3265abf97473020a45c69918dcb82ce360&X-Amz-SignedHeaders=host&x-id=GetObject",
        quantity: 0
    },
  ],
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
    const existingItem = get().cartItems.find(
      (item) => item.productId === payload.productId,
    );

    if (existingItem) {
      alert("This item is already added to the cart.");
    } else {
      set({
        cartItems: [...get().cartItems, { ...payload, quantity: 1 }],
      });
    }
  },
  updateCartItemQuantity: ({ action, id }) => {
    const cartItems = get().cartItems;
    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === id) {
        if (action === cartQuantityUpdate.add) {
          return { ...item, quantity: item.quantity + 1 };
        } else if (
          action === cartQuantityUpdate.subtract &&
          item.quantity > 1
        ) {
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
  },
}));

export default useStore;
