import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '../../utils/constants';
import { Category } from '../../lib/types';

interface CategoryState {
  categoriesList: Category[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categoriesList: [],
  isLoading: false,
  error: null,
};

export const getCategories = createAsyncThunk('categories/getCategories', async (_, thunkAPI) => {
  const res = await axios.get(`${API_URL}/categories`);
  return res.data;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categoriesList = payload;
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
      toast.error('Something went wrong!');
    });
  },
});

export default categoriesSlice.reducer;
