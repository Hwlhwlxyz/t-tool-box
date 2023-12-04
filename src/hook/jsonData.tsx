import { atom, WritableAtom } from "jotai";

const innerJsonAtom = atom<object>({});
const jsonDataAtom = atom(
  (get) => get(innerJsonAtom),
  (get, set, newjsonData: WritableAtom<object, [], object>) => {
    return set(newjsonData);
  }
);
