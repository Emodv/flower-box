export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  categories: string[];
  assets: string[];
};

export enum Category {
  all = "all",
  spring = "spring",
  summer = "summer",
  autumn = "autumn",
  winter = "winter",
  romantic = "romantic",
  sympathy = "sympathy",
  congratulation = "congratulation",
  tropic = "tropic",
  anniversary = "anniversary",
  bouquets = "bouquets",
  basket = "basket",
  vase = "vase",
}