import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage(STORAGE_KEYS.CART, []);
  const { showToast } = useToast();

  const addToCart = useCallback((item) => {
    setCartItems((prev) => {
      // For customized items, uniquely identify via combination key
      const itemKey = item.configKey || item.id;
      const existingIndex = prev.findIndex((i) => (i.configKey || i.id) === itemKey);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (item.quantity || 1),
        };
        showToast(`Updated quantity for "${item.title}" in quote cart`, 'success');
        return updated;
      } else {
        showToast(`Added "${item.title}" to quote cart`, 'success');
        return [...prev, { ...item, quantity: item.quantity || 1 }];
      }
    });
  }, [setCartItems, showToast]);

  const updateQuantity = useCallback((itemKey, delta) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          const key = item.configKey || item.id;
          if (key === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  }, [setCartItems]);

  const removeFromCart = useCallback((itemKey) => {
    setCartItems((prev) => {
      const removed = prev.find((i) => (i.configKey || i.id) === itemKey);
      if (removed) {
        showToast(`Removed "${removed.title}" from quote cart`, 'info');
      }
      return prev.filter((i) => (i.configKey || i.id) !== itemKey);
    });
  }, [setCartItems, showToast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    showToast('Quote cart emptied', 'info');
  }, [setCartItems, showToast]);

  const totals = useMemo(() => {
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.totalPrice * item.quantity), 0);
    return {
      totalCount,
      subtotal,
    };
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCount: totals.totalCount,
        subtotal: totals.subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
