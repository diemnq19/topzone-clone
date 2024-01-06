import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "admin",
  storage: localStorage,
  converter: JSON,
});

export const initialAdminState = {
  id: "",
  email: "",
  name: "",
  address: "",
  phone: "",
};

const adminAtom = atom({
  key: "adminAtomState",
  default: initialAdminState,
  effects_UNSTABLE: [persistAtom],
});

export default adminAtom;
