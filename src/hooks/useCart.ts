"use client";

import { useEffect, useRef, useState } from "react";
import { CartItem } from "@/types/Cart";


const CART_KEY = "cart";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const initializedRef = useRef(false);
  

useEffect(() => {
  if (typeof window === "undefined") return;
  const saved = localStorage.getItem(CART_KEY);
  if (saved) {
    try {
      setCart(JSON.parse(saved));
    } catch (e) {
      console.error("Error parsing cart:", e);
      setCart([]);
    }
  }
  // chỉ đánh dấu đã sẵn sàng sau khi load xong
  setIsReady(true);
}, []);

useEffect(() => {
  // chỉ khi đã load xong và state đã sẵn sàng mới được ghi vào localStorage
  if (!isReady) return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}, [cart, isReady]);


  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const found = prev.find((i) => i.pet.pet_id === item.pet.pet_id);
      let newCart;
      if (found) {
        newCart = prev.map((i) =>
          i.pet.pet_id === item.pet.pet_id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        newCart = [...prev, item];
      }
      
      return newCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.pet.pet_id !== id);
      
      return newCart;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) => {
      const newCart = prev.map((item) =>
        item.pet.pet_id === id ? { ...item, quantity } : item
      );
      
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    
    localStorage.removeItem(CART_KEY);
  };

  const getTotal = () =>
    cart.reduce((s, it) => s + (it.pet.price || 0) * it.quantity, 0);

  const getTotalQuantity = () =>
    cart.reduce((s, it) => s + it.quantity, 0);

  return {
    cart,
    isReady,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getTotalQuantity, 
    totalQuantity,
  };
}
