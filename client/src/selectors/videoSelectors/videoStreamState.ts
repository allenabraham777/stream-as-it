import { selector } from "recoil";
import videoState from "store/videoState";

const videoStreamState = selector({
  key: "videoStreamState",
  get: ({ get }) => {
    const videoSettings = get(videoState);

    return videoSettings.stream;
  },
});

export default videoStreamState;
