import prisma from "../../prisma";
import { Prisma, Category } from "@prisma/client";

interface ProductData {
  name: string;
  description: string;
  price: number;
  category: Category;
  assetUrls: string[];
}

async function createProductWithAssets({
  name,
  description,
  price,
  category,
  assetUrls,
}: ProductData): Promise<Prisma.Prisma__ProductClient<any>> {
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
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

export { createProductWithAssets };
