import { selector } from "recoil";
import streamState from "store/streamState";

const canvasScreenStreamState = selector({
  key: "canvasScreenStreamState",
  get: ({ get }) => {
    const stream = get(streamState);

    return stream.screen;
  },
});

export default canvasScreenStreamState;
