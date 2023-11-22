import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: localStorage,
  converter: JSON,
});

export const initialUserState = {
  id: "",
  email: "",
  name: "",
  address: "",
  phone: "",
  email_verified_at: "",
};

const userAtom = atom({
  key: "userAtomState",
  default: initialUserState,
  effects_UNSTABLE: [persistAtom],
});

export default userAtom;
