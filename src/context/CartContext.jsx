import { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('quickcart-cart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  function addToCart(product) {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(id, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  function toggleCart() {
    setIsCartOpen((prev) => !prev);
  }

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        cartItemCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleCart,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
