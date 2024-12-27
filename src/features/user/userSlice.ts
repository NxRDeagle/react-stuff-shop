import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '../../utils/constants';
import { Cart, CartItem, ErrorResponse, User } from '../../lib/types';
import { loadCartFromLocalStorage, loadUserFromLocalStorage } from '../../utils/common';
import { UserLoginFormValues } from '../../hooks/useLoginForm';
import { UserSignUpFormValues } from '../../hooks/useSignUpForm';
import { UpdateUserValues } from '../../hooks/useUserProfile';

interface UserState {
  currentUser: User | null;
  cart: Cart;
  isLoading: boolean;
  showForm: boolean;
  formType: string;
  error: string | null;
}

const initialState: UserState = {
  currentUser: loadUserFromLocalStorage(),
  showForm: false,
  formType: 'signup',
  cart: loadCartFromLocalStorage(),
  isLoading: false,
  error: null,
};
export const createUser = createAsyncThunk<User, UserSignUpFormValues>(
  'users/createUsers',
  async (payload, thunkAPI) => {
    const res = await axios.post(`${API_URL}/users/`, payload);
    return res.data;
  },
);
export const loginUser = createAsyncThunk<User, UserLoginFormValues>(
  'users/loginUser',
  async (payload, thunkAPI) => {
    const res = await axios.post(`${API_URL}/auth/login`, payload);
    const login = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${res.data.access_token}`,
      },
    });
    return login.data;
  },
);
export const updateUser = createAsyncThunk<User, UpdateUserValues, { rejectValue: ErrorResponse }>(
  'users/updateUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${API_URL}/users/${payload.id}`, payload);
      return res.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
      }
      return thunkAPI.rejectWithValue({
        message: ['Something went wrong'],
        error: 'Unknown Error',
        statusCode: 500,
      });
    }
  },
);

const setCurrentUser = (state: UserState, { payload }: { payload: User }) => {
  state.currentUser = payload;
  localStorage.setItem('user', JSON.stringify(payload));
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addItemToCart: (state, { payload }: PayloadAction<CartItem>) => {
      let cartItems = [...state.cart.cartItems];
      const itemFound = cartItems.find(({ id }) => id === payload.id);
      if (itemFound) {
        cartItems = cartItems.map((item) => {
          return item.id === payload.id ? { ...item, quantity: item.quantity + 1 } : item;
        });
      } else {
        cartItems.push({ id: payload.id, quantity: 1 });
      }
      state.cart.cartItems = cartItems;

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    decreaseQuantity: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.cart.cartItems = state.cart.cartItems.map((cartItem) =>
        cartItem.id === payload.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
      );
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    increaseQuantity: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.cart.cartItems = state.cart.cartItems.map((cartItem) =>
        cartItem.id === payload.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      );
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.cart.cartItems = state.cart.cartItems.filter((cartItem) => cartItem.id !== payload.id);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    logOut: (state) => {
      state.currentUser = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, setCurrentUser)
      .addCase(loginUser.fulfilled, setCurrentUser)
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        localStorage.setItem('user', JSON.stringify(payload));
        toast.success('User updated!');
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        if (payload) {
          const errorMessage = Array.isArray(payload.message)
            ? payload.message.join(', ')
            : payload.message || 'An unknown error occurred';

          toast.error('Error: ' + errorMessage);
        }
      });
  },
});

export const { addItemToCart, removeFromCart, decreaseQuantity, increaseQuantity, logOut } =
  userSlice.actions;

export default userSlice.reducer;
