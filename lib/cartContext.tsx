'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  cartItemId: string;
  id: string;
  name: string;
  category: string;
  description: string;
  quantity: number;
  farmSize?: string;
  location?: string;
  customNotes?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'cartItemId' | 'quantity'> & { quantity?: number }) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('drip-quote-cart');
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('drip-quote-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, 'cartItemId' | 'quantity'> & { quantity?: number }) => {
    setItems(prev => {
      const existing = prev.find(i => 
        i.id === item.id && 
        i.farmSize === item.farmSize && 
        i.location === item.location && 
        i.customNotes === item.customNotes
      );
      if (existing) {
        return prev.map(i => i.cartItemId === existing.cartItemId ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i);
      }
      return [...prev, { ...item, quantity: item.quantity || 1, cartItemId: crypto.randomUUID() }];
    });
  };

  const removeItem = (cartItemId: string) => {
    setItems(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    setItems(prev => prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount: items.reduce((sum, i) => sum + i.quantity, 0) }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
