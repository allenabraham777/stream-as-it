import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { brand as brandConstants } from '@/constants/brand';

const initialState: Brand.IBrand = {
    background: brandConstants.backgrounds.default,
    color: brandConstants.colors.default,
    shape: brandConstants.shapes.RECTANGLE
};

const brandSlice = createSlice({
    name: 'app/brand',
    initialState,
    reducers: {
        setBrandBackground(state, action: PayloadAction<string>) {
            state.background = action.payload;
        },
        setBrandColor(state, action: PayloadAction<string>) {
            state.color = action.payload;
        },
        setBrandShape(state, action: PayloadAction<string>) {
            state.shape = action.payload;
        }
    }
});

export const { setBrandBackground, setBrandColor, setBrandShape } = brandSlice.actions;

export default brandSlice.reducer;
