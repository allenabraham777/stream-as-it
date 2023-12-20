import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Stream.IStreamSlice = {
    resolution: {
        width: 1920,
        height: 1080
    },
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
        screenShareStream: null,
        canvasStream: null
    }
};

const streamSlice = createSlice({
    name: 'app/stream',
    initialState,
    reducers: {
        setVideoStatus(state, action: PayloadAction<boolean>) {
            state.streamStudioStatus.video = action.payload;
        },
        setAudioStatus(state, action: PayloadAction<boolean>) {
            state.streamStudioStatus.audio = action.payload;
        },
        setScreenStatus(state, action: PayloadAction<boolean>) {
            state.streamStudioStatus.screen = action.payload;
        },
        setVideoStream(state, action: PayloadAction<MediaStream | null>) {
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
        setScreenShareStream(state, action: PayloadAction<MediaStream | null>) {
            state.streamData.screenShareStream = action.payload;
        },
        resetScreenShareStream(state) {
            if (state.streamData.screenShareStream) {
                const tracks = state.streamData.screenShareStream.getTracks();

                tracks.forEach((track) => {
                    console.info('Stopping Track: ' + track.kind);
                    track.stop();
                });
            }
            state.streamData.screenShareStream = null;
        },
        setCanvasStream(state, action: PayloadAction<MediaStream | null>) {
            state.streamData.canvasStream = action.payload;
        },
        setLiveStatus(state, action: PayloadAction<boolean>) {
            state.streamStatus.isLive = action.payload;
        },
        setResolution(state, action: PayloadAction<Stream.IResolution>) {
            state.resolution = action.payload;
        }
    }
});

export const {
    setAudioStatus,
    setVideoStatus,
    setScreenStatus,
    setVideoStream,
    setScreenShareStream,
    setCanvasStream,
    setLiveStatus,
    resetVideoStream,
    resetScreenShareStream,
    setResolution
} = streamSlice.actions;

export default streamSlice.reducer;
