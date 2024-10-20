import { createSlice } from '@reduxjs/toolkit';

const getCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : { cartItems: [], totalAmount: 0, totalQuantity: 0 };
};

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const initialState = getCartFromLocalStorage();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.cartItems.push({
                    ...action.payload,
                    quantity: action.payload.quantity,
                });
            }
            state.totalQuantity += action.payload.quantity;
            state.totalAmount += action.payload.price * action.payload.quantity;

            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.price * existingItem.quantity;
                state.cartItems = state.cartItems.filter(item => item.id !== id);
            }

            saveCartToLocalStorage(state);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);
            if (existingItem) {
                const quantityDifference = quantity - existingItem.quantity;
                existingItem.quantity = quantity;
                state.totalQuantity += quantityDifference;
                state.totalAmount += existingItem.price * quantityDifference;
            }

            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;

            saveCartToLocalStorage(state);
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
