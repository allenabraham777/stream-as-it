import { selector } from "recoil";
import settingsState from "store/settingsState";

const resolutionState = selector({
  key: "resolutionState",
  get: ({ get }) => {
    const settings = get(settingsState);

    return settings.resolution;
  },
});

export default resolutionState;
