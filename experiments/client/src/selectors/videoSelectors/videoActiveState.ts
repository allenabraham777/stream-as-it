import { selector } from 'recoil';
import videoState from 'store/videoState';

const videoActiveState = selector({
    key: 'videoActiveState',
    get: ({ get }) => {
        const videoSettings = get(videoState);

        return videoSettings.video;
    }
});

export default videoActiveState;
