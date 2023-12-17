import { atom } from 'recoil';

interface IStream {
    stream: MediaStream | null;
    screenStream: MediaStream | null;
    video: boolean;
    audio: boolean;
    screen: boolean;
}

const videoState = atom({
    key: 'videoState',
    default: {
        stream: null,
        screenStream: null,
        video: false,
        audio: false,
        screen: false
    } as IStream
});

export default videoState;
