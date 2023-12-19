import { createSlice } from '@reduxjs/toolkit';

interface IStore {
    streamStudioStatus: {
        video: boolean;
        audio: boolean;
        screen: boolean;
    };
    streamStatus: {
        isLive: boolean;
    };
    streamData: {
        videoStream: MediaStream | null;
        canvasStream: MediaStream | null;
    };
}

const initialState: IStore = {
    streamStudioStatus: {
        video: false,
        audio: false,
        screen: false
    },
    streamStatus: {
        isLive: false
    },
    streamData: {
        videoStream: null,
        canvasStream: null
    }
};

const streamSlice = createSlice({
    name: 'app/stream',
    initialState,
    reducers: {
        setVideoStatus(state, action) {
            state.streamStudioStatus.video = action.payload;
        },
        setAudioStatus(state, action) {
            state.streamStudioStatus.audio = action.payload;
        },
        setScreenStatus(state, action) {
            state.streamStudioStatus.screen = action.payload;
        },
        setVideoStream(state, action) {
            state.streamData.videoStream = action.payload;
        },
        resetVideoStream(state) {
            if (state.streamData.videoStream) {
                const tracks = state.streamData.videoStream.getTracks();

                tracks.forEach((track) => {
                    console.info('Stopping Track: ' + track.kind);
                    track.stop();
                });
            }
            state.streamData.videoStream = null;
        },
        setCanvasStream(state, action) {
            state.streamData.canvasStream = action.payload;
        },
        setLiveStatus(state, action) {
            state.streamStatus.isLive = action.payload;
        }
    }
});

export const {
    setAudioStatus,
    setVideoStatus,
    setScreenStatus,
    setVideoStream,
    setCanvasStream,
    setLiveStatus,
    resetVideoStream
} = streamSlice.actions;

export default streamSlice.reducer;
