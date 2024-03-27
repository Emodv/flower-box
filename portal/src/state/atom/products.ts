import { atom } from "recoil";

export const Products = atom({
  key: "products",
  default: ["hello","asdf","ASdfasdf","Asdf"] as string[],
});
