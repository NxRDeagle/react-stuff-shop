import { createSlice } from '@reduxjs/toolkit';

interface ScrollbarState {
  mobileNavOpen: boolean;
}

const initialState: ScrollbarState = {
  mobileNavOpen: false,
};

const scrollbarSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    toggleScrollbar: (state, { payload }) => {
      state.mobileNavOpen = payload;
    },
  },
});

export const { toggleScrollbar } = scrollbarSlice.actions;
export default scrollbarSlice.reducer;
