import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserDetails } from "@/store/thunks/authThunk";
import { AxiosResponse } from "axios";

interface AuthState {
  loading: boolean;
  user: Auth.User | null;
}

const initialState: AuthState = {
  loading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state: AuthState) => {
        state.loading = true;
      })
      .addCase(
        getUserDetails.fulfilled,
        (state: AuthState, action: PayloadAction<Auth.User>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(getUserDetails.rejected, (state: AuthState) => {
        state.user = null;
        state.loading = true;
      });
  },
});

export default authSlice.reducer;
