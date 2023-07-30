import { selector } from "recoil";
import authState from "store/authState";

const userState = selector({
  key: "userState",
  get: ({ get }) => {
    const auth = get(authState);

    return auth.user;
  },
});

export default userState;
