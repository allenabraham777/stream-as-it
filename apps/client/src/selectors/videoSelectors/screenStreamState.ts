import { selector } from 'recoil';
import videoState from 'store/videoState';

const screenStreamState = selector({
    key: 'screenStreamState',
    get: ({ get }) => {
        const videoSettings = get(videoState);

        return videoSettings.screenStream;
    }
});

export default screenStreamState;
