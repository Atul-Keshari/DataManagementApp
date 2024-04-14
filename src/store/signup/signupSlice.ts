
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SignupState {
  loading: boolean;
  error: string | null;
  success: boolean;
  userData: any; // Define the type for user data received from the API
}

const initialState: SignupState = {
  loading: false,
  error: null,
  success: false,
  userData: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signupRequested: state => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    signupSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.userData = action.payload;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {signupRequested, signupSuccess, signupFailure} =
  signupSlice.actions;
export default signupSlice.reducer;
