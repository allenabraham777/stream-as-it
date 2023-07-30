import { selector } from "recoil";
import videoState from "store/videoState";

const screenActiveState = selector({
  key: "screenActiveState",
  get: ({ get }) => {
    const videoSettings = get(videoState);

    return videoSettings.screen;
  },
});

export default screenActiveState;
