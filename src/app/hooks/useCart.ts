import { useState, useEffect } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const CART_KEY = "carts";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CART_KEY);
      if (stored) setCart(JSON.parse(stored));
    }
  }, []);

  // Save cart to localStorage when cart changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }, [cart]);



  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Get total price
  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Get total quantity
  const getTotalQuantity = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getTotalQuantity,
    
  };
}