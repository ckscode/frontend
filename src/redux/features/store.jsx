import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import productReducer from './Product/ProductSlice';
import filterReducer from './Product/FilterSlice';

export const store = configureStore({
    reducer:{
       auth:authReducer,
       product:productReducer,
       filter:filterReducer
    }
})
