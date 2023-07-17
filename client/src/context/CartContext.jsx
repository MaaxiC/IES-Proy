import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext({});

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    // const [cartItems, setCartItems] = useState([]);
    const [cartItems, setCartItems] = useLocalStorage("cart", []);

    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);

    const getItemQuantity = (id) => {
        return cartItems.find((item) => item.id === id)?.quantity || 0
    };

    const increaseCartQuantity = (id, qty) => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, {id, quantity: qty}];
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + qty};
                    } else {
                        return item;
                    }
                });
            }
        })
    }

    const decreaseCartQuantity = (id) => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1};
                    } else {
                        return item;
                    }
                });
            }
        })
    }

    const removeFromCart = (id) => {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id);
        })
    }

    const clearCart = () => {
        setCartItems([]);
    }

  return <CartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, clearCart, cartItems, cartQuantity }}>{children}</CartContext.Provider>;
};
