import { Product } from '../types';

export interface CartItem extends Product {
  quantity: number;
  price: number;
  image: string;
  name: string;
  unit: string;
}

export const cartStore = {
  getCart: (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  },

  setCart: (cart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  addItem: (product: Product) => {
    const cart = cartStore.getCart();
    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      cartStore.setCart(updatedCart);
    } else {
      cartStore.setCart([...cart, { ...product, quantity: 1 }]);
    }
  },

  updateQuantity: (productId: string, delta: number) => {
    const cart = cartStore.getCart();
    const updatedCart = cart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);
    cartStore.setCart(updatedCart);
  },

  clearCart: () => {
    localStorage.removeItem('cart');
  }
};
