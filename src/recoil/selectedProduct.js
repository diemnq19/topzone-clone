import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "product-select",
  storage: localStorage,
  converter: JSON,
});

const productSelectAtom = atom({
  key: "productSelectAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default productSelectAtom
