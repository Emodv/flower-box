import prisma from "../../prisma";
import { Prisma, Category, TagsEnum } from "@prisma/client";

interface ProductData {
  name: string;
  description: string;
  price: number;
  categories: Category[];
  tags: TagsEnum[];
  assetUrls: string[];
}

async function createProductWithAssets({
  name,
  description,
  price,
  categories,
  tags,
  assetUrls,
}: ProductData): Promise<Prisma.Prisma__ProductClient<any>> {
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        categories: {
          create: categories.map((category) => ({
            category,
          })),
        },
        tags: {
          create: tags.map((tag) => ({
            tag,
          })),
        },
        assets: {
          create: assetUrls.map((url) => ({
            url,
          })),
        },
      },
    });

    return product;
  } catch (error) {
    console.error("Error creating product with assets:", error);
    throw new Error("Failed to create product");
  }
}

interface ProductQueryParams {
  page: number;
  pageSize: number;
}

async function getProducts({
  page,
  pageSize,
}: ProductQueryParams): Promise<any> {
  try {
    const skip = (page - 1) * pageSize;

    const products = await prisma.product.findMany({
      skip,
      take: pageSize,
      include: {
        tags: true,
        categories: true,
        assets: true,
      },
    });

    const transformedProducts = products.map((product) => ({
      ...product,
      tags: product.tags.map((tag) => tag.tag),
      categories: product.categories.map((category) => category.category),
      assets: product.assets.map((asset) => asset.url),
    }));

    return transformedProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

export { createProductWithAssets, getProducts };
