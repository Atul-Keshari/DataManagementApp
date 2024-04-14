// formSlice.js

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    submitFormStart(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.message = '';
    },
    submitFormSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.message = action.payload;
    },
    submitFormFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearFormState(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = '';
    },
  },
});

export const {
  submitFormStart,
  submitFormSuccess,
  submitFormFailure,
  clearFormState,
} = formSlice.actions;

export default formSlice.reducer;
