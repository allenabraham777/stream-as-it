import { selector } from 'recoil';
import streamState from 'store/streamState';

const canvasVideoStreamState = selector({
    key: 'canvasVideoStreamState',
    get: ({ get }) => {
        const stream = get(streamState);

        return stream.video;
    }
});

export default canvasVideoStreamState;
