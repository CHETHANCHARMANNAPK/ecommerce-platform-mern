import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const items = localStorage.getItem('cartItems');
        if (items) {
            setCartItems(JSON.parse(items));
        }
    }, []);

    const addToCart = (product, qty) => {
        const existItem = cartItems.find((x) => x.product === product._id);

        if (existItem) {
            const updatedCart = cartItems.map((x) =>
                x.product === existItem.product ? { ...product, qty, product: product._id } : x
            );
            setCartItems(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        } else {
            const newCart = [...cartItems, { ...product, qty, product: product._id }];
            setCartItems(newCart);
            localStorage.setItem('cartItems', JSON.stringify(newCart));
        }
    };

    const removeFromCart = (id) => {
        const newCart = cartItems.filter((x) => x.product !== id);
        setCartItems(newCart);
        localStorage.setItem('cartItems', JSON.stringify(newCart));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
