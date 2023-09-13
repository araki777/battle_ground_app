import { atomWithStorage } from "jotai/utils";

export const accessTokenAtom = atomWithStorage("accessToken", null);
export const accessTokenDateAtom = atomWithStorage("accessTokenDate", null);
