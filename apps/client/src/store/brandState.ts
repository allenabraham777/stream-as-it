import { atom } from "recoil";
import constants from "constants/brand";

const brandState = atom({
  key: "brandState",
  default: {
    color: constants.colors.default,
    shape: constants.shapes.RECTANGLE,
    background: constants.backgrounds.default,
  } as IBrand,
});

export default brandState;
