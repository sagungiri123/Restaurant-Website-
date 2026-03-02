import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

function loadCart() {
    try {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(loadCart);

    // Persist whenever items change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (menuItem) => {
        setItems((prev) => {
            const existing = prev.find((i) => i._id === menuItem._id);
            if (existing) {
                return prev.map((i) =>
                    i._id === menuItem._id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...menuItem, quantity: 1 }];
        });
    };

    const removeItem = (id) => {
        setItems((prev) => prev.filter((i) => i._id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return removeItem(id);
        setItems((prev) => prev.map((i) => (i._id === id ? { ...i, quantity } : i)));
    };

    const clearCart = () => setItems([]);

    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalPrice, totalItems }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
