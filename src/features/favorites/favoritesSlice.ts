import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '../../utils/constants';
import { Product, ProductWithQuantity } from '../../lib/types';
import { loadFavoritesFromLocalStorage } from '../../utils/common';

interface FavoritesSlice {
  favorites: Product[];
}

const initialState: FavoritesSlice = {
  favorites: loadFavoritesFromLocalStorage(),
};

export const getCategories = createAsyncThunk('favorites/getCategories', async (_, thunkAPI) => {
  const res = await axios.get(`${API_URL}/categories`);
  return res.data;
});

const favoritesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addToFavorites: (state, { payload }: PayloadAction<Product>) => {
      state.favorites = [...state.favorites, payload];
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    removeFromFavorites: (state, { payload }: PayloadAction<number>) => {
      const productIndex = state.favorites.findIndex((product) => product.id === payload);

      if (productIndex !== -1) {
        state.favorites.splice(productIndex, 1);

        localStorage.setItem('favorites', JSON.stringify(state.favorites));
        toast.success('Deleted!');
      }
    },
  },
});
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
