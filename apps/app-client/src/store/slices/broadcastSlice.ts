import { createSlice } from '@reduxjs/toolkit';
import { fetchStreamById } from '../thunk';

const initialState: Broadcast.IBroadcast = {
    loading: false,
    stream: null
};

const slateSlice = createSlice({
    name: 'app/slate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStreamById.pending, (state) => {
                state.loading = true;
                state.stream = null;
            })
            .addCase(fetchStreamById.fulfilled, (state, action) => {
                console.log(action);

                state.loading = false;
                state.stream = action.payload;
            })
            .addCase(fetchStreamById.rejected, (state) => {
                state.loading = false;
                state.stream = null;
            });
    }
});

export default slateSlice.reducer;
