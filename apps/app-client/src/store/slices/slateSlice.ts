import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Slate.ISlateSlice = {
    loadStatus: {
        video: false,
        audio: false,
        screen: false
    }
};

const slateSlice = createSlice({
    name: 'app/slate',
    initialState,
    reducers: {
        setCanvasVideoStatus(state, action: PayloadAction<boolean>) {
            state.loadStatus.video = action.payload;
        },
        setCanvasAudioStatus(state, action: PayloadAction<boolean>) {
            state.loadStatus.audio = action.payload;
        },
        setCanvasScreenStatus(state, action: PayloadAction<boolean>) {
            state.loadStatus.screen = action.payload;
        }
    }
});

export const { setCanvasAudioStatus, setCanvasVideoStatus, setCanvasScreenStatus } =
    slateSlice.actions;

export default slateSlice.reducer;
