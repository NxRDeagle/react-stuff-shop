import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '../../utils/constants';
import { Product } from '../../lib/types';
import { shuffle } from '../../utils/common';

interface ProductState {
  productsList: Product[];
  isLoading: boolean;
  filtered: Product[];
  related: Product[];
}

const initialState: ProductState = {
  productsList: [],
  isLoading: false,
  filtered: [],
  related: [],
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, thunkAPI): Promise<Product[]> => {
    const res = await axios.get<Product[]>(`${API_URL}/products`);
    return res.data.map((product) => ({
      ...product,
      images: product.images.map((item: string) => item.replace(/[\[\]\"]/g, '')),
    }));
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.productsList.filter((product) => product.price < payload);
    },
    getRelatedProducts: (state, { payload }) => {
      state.related = shuffle(
        state.productsList
          .filter((item) => item.id !== payload.productId)
          .filter((product) => product.category.id === payload.categoryId),
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.productsList = payload;
    });
    builder.addCase(getProducts.rejected, (state, { payload }) => {
      toast.error('Something went wrong!');
    });
  },
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;
export default productsSlice.reducer;
