import { configureStore } from '@reduxjs/toolkit';
//API SLICES
import { authApiSlice } from './slices/auth/authApiSlice.js';
import { productsApiSlice } from './slices/products/productsApiSlice.js';
//REDUCERS
import authReducer  from './slices/auth/authSlice.js';
import cartReducer from './slices/cart/cartSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware, productsApiSlice.middleware), 
});


