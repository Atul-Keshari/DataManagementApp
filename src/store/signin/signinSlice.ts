import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SigninState {
  loading: boolean;
  error: string | null;
  success: boolean;
  userData: any; // Define the type for user data received from the API
}

const initialState: SigninState = {
  loading: false,
  error: null,
  success: false,
  userData: null,
};

const signinSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    signinRequested: state => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    signinSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.userData = action.payload;
    },
    signinFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {signinRequested, signinSuccess, signinFailure} =
  signinSlice.actions;
export default signinSlice.reducer;
