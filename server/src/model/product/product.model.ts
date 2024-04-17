import prisma from "../../prisma";
import { Prisma, Category, TagsEnum } from "@prisma/client";
import {
  ExtendedProduct,
  GroupedProducts,
  ProductData,
  ProductQueryParams,
  TransformedProduct,
} from "./types";

export async function createProductWithAssets({
  name,
  description,
  price,
  categories,
  tags,
  assetUrls,
  productId,
}: ProductData): Promise<Prisma.Prisma__ProductClient<any>> {
  try {
    const product = await prisma.product.create({
      data: {
        productId,
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

export async function deleteProductWithRelations(
  productId: number,
): Promise<void> {
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

export async function getTopProductsByInteractions(): Promise<any> {
  try {
    const topProducts = await prisma.product.findMany({
      include: {
        interaction: true,
        assets: true,
      },
      orderBy: {
        interaction: {
          _count: "desc",
        },
      },
      take: 10,
    });

    const transformedProduct = topProducts.map((product) => {
      return {
        ...product,
        assets: product.assets.map((asset) => asset.url),
      };
    });

    return transformedProduct;
  } catch (error) {
    console.error("Error fetching top products by interactions:", error);
    throw new Error("Failed to fetch top products");
  }
}

export async function getProducts({
  page,
  pageSize,
  category,
  searchString,
}: ProductQueryParams & {
  category?: Category;
  searchString?: string;
}): Promise<any> {
  try {
    const skip = (page - 1) * pageSize;

    let whereClause: Prisma.ProductWhereInput = {};

    if (category && category !== Category.all) {
      whereClause.categories = {
        some: {
          category: category,
        },
      };
    } else if (searchString) {
      const searchTerms = searchString.split(" ");
      const searchTermCategories = searchTerms.filter((item: string) => {
        return Object.values(Category).includes(item as Category);
      });
      const searchTermTags = searchTerms.filter((item: string) => {
        return Object.values(TagsEnum).includes(item as TagsEnum);
      });
      whereClause = {
        OR: [
          { name: { contains: searchString } },
          {
            categories: {
              some: { category: { in: searchTermCategories as Category[] } },
            },
          },
          { tags: { some: { tag: { in: searchTermTags as TagsEnum[] } } } },
        ],
      };
    }
    console.log(JSON.stringify(whereClause), "where");

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        include: {
          tags: true,
          categories: true,
          assets: true,
        },
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    const transformedProducts = products.map((product) => ({
      ...product,
      tags: product.tags.map((tag) => tag.tag),
      categories: product.categories.map((category) => category.category),
      assets: product.assets.map((asset) => asset.url),
    }));

    return {
      products: transformedProducts,
      totalCount,
      hasMore: skip + pageSize < totalCount,
    };
  } catch (error) {
    console.error("Error fetching products with filters:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function getSingleProductDetails({
  productId,
}: {
  productId: string;
}): Promise<any> {
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
    throw error;
  }
}

export async function getProductAssetUrls(
  productId: number,
): Promise<string[]> {
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

// fetch products by catogries

export async function getLimitedProductsByCategories(
  categoryNames: Category[],
): Promise<GroupedProducts> {
  try {
    const categoryProductPromises: Promise<TransformedProduct[]>[] =
      categoryNames.map(async (categoryName) => {
        const products = await prisma.product.findMany({
          where: {
            categories: {
              some: {
                category: categoryName,
              },
            },
          },
          take: 10,
          include: {
            // categories: true,
            assets: true,
          },
        });

        return products.map((product: ExtendedProduct) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          // categories: product.categories.map((category) => category.category),
          assets: product.assets.map((asset) => asset.url),
          createdAt: product.createdAt,
        }));
      });

    const results = await Promise.all(categoryProductPromises);
    const groupedByCategories: GroupedProducts = {};

    categoryNames.forEach((categoryName, index) => {
      groupedByCategories[categoryName] = results[index];
    });

    return groupedByCategories;
  } catch (error) {
    console.error("Error fetching limited products by categories:", error);
    throw new Error("Failed to fetch limited products by categories");
  }
}
