import { selector } from "recoil";
import videoState from "store/videoState";

const audioActiveState = selector({
  key: "audioActiveState",
  get: ({ get }) => {
    const videoSettings = get(videoState);

    return videoSettings.audio;
  },
});

export default audioActiveState;
