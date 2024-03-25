import {
  TagsEnum,
  Tags as PrismaTags,
  Categories as PrismaCategories,
  Asset as PrismaAsset,
  Category,
} from "@prisma/client";

export interface ProductData {
  name: string;
  description: string;
  price: number;
  categories: Category[];
  tags: TagsEnum[];
  assetUrls: string[];
}

export interface ProductQueryParams {
  page: number;
  pageSize: number;
}

export interface TransformedProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  tags?: string[];
  categories?: string[];
  assets: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface GroupedProducts {
  [category: string]: TransformedProduct[];
}

export interface ExtendedProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  tags?: PrismaTags[];
  categories?: PrismaCategories[];
  assets: PrismaAsset[];
  createdAt: Date;
  updatedAt?: Date;
}
