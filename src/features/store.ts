import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categories/categoriesSlice';
import favoritesReducer from './favorites/favoritesSlice';
import productsReducer from './products/productsSlice';
import userReducer from './user/userSlice';
import scrollbarReducer from './scrollbar/scrollbarSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    favorites: favoritesReducer,
    scrollbar: scrollbarReducer,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getMiddleware) => getMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
