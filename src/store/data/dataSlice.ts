// dataSlice.js

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {fetchDataStart, fetchDataSuccess, fetchDataFailure} =
  dataSlice.actions;

export default dataSlice.reducer;
