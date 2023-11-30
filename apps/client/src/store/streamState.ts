import { atom } from "recoil";

interface ICanvasStream {
  video: boolean;
  audio: boolean;
  screen: boolean;
}

const streamState = atom({
  key: "streamState",
  default: {
    video: false,
    audio: false,
    screen: false,
  } as ICanvasStream,
});

export default streamState;
