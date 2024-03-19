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

async function deleteProductWithRelations(productId: number): Promise<void> {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.asset.deleteMany({ where: { productId } });
      await prisma.tags.deleteMany({ where: { productId } });
      await prisma.categories.deleteMany({ where: { productId } });

      // Delete the product itself
      await prisma.product.delete({ where: { id: productId } });
    });
  } catch (error) {
    console.error("Error deleting product with relations:", error);
    throw new Error("Failed to delete product");
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
interface singleProduct {
  productId: string;
}

async function getSingleProductDetails({
  productId,
}: singleProduct): Promise<any> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
      include: {
        tags: true,
        categories: true,
        assets: true,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const transformedProduct = {
      ...product,
      tags: product.tags.map((tag) => tag.tag),
      categories: product.categories.map((category) => category.category),
      assets: product.assets.map((asset) => asset.url),
    };

    return transformedProduct;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // It's better to throw the original error for the caller to handle
  }
}

async function getProductAssetUrls(productId: number): Promise<string[]> {
  try {
    const productAssets = await prisma.asset.findMany({
      where: { productId },
      select: { url: true },
    });

    return productAssets.map((asset) => asset.url);
  } catch (error) {
    console.error("Error fetching product asset URLs:", error);
    throw new Error("Failed to fetch product asset URLs");
  }
}

export {
  createProductWithAssets,
  getProducts,
  deleteProductWithRelations,
  getProductAssetUrls,
  getSingleProductDetails,
};
