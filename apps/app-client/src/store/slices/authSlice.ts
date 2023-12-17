import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@stream-as-it/types';

import { getUserDetails } from '@/store/thunks/authThunk';

interface AuthState {
    loading: boolean;
    user: User | null;
}

const initialState: AuthState = {
    loading: true,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearUserDetails(state: AuthState) {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.pending, (state: AuthState) => {
                state.loading = true;
            })
            .addCase(getUserDetails.fulfilled, (state: AuthState, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserDetails.rejected, (state: AuthState) => {
                state.user = null;
                state.loading = true;
            });
    }
});

export const { clearUserDetails } = authSlice.actions;

export default authSlice.reducer;
