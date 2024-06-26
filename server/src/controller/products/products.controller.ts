import { Request, Response } from "express";
import S3Service from "../../services/aws/s3.service";
import * as productModel from "../../model/product/product.model";
import {
  ResponseMessages,
  ResponseStatus,
} from "../../types/enums/responseEnums";
import { productSchema, updateProductSchema } from "../../schema/validation";
import { Category, TagsEnum } from "@prisma/client";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  assets: string[];
}

export async function uploadProduct(request: Request, response: Response) {
  try {
    const validatedData = productSchema.parse(request.body);

    const {
      productName,
      description,
      price,
      categories: categoriesString,
      tags: tagsString,
      productId,
    } = validatedData;

    const files: Express.Multer.File[] = request.files as Express.Multer.File[];

    const categories = categoriesString.split("+") as Category[];
    const tags = tagsString.split("+") as TagsEnum[];

    const userId = request.user?.userId;

    if (!userId) {
      return response
        .status(ResponseStatus.BadRequest)
        .json({ message: ResponseMessages.BadRequest });
    }

    const uploadedFileNames = await S3Service.uploadImages(files, userId);
    const assetUrls = uploadedFileNames;

    const product = await productModel.createProductWithAssets({
      name: productName,
      description,
      price: parseFloat(price),
      categories,
      tags,
      assetUrls,
      productId,
    });

    response
      .status(ResponseStatus.Created)
      .json({ message: ResponseMessages.Created, data: product });
  } catch (error) {
    console.error("Error uploading product:", error);
    response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}

export async function getPaginatedProducts(
  request: Request,
  response: Response,
) {
  try {
    const page = parseInt(request.query.page as string) || 1;
    const pageSize = parseInt(request.query.pageSize as string) || 12;

    if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
      return response
        .status(ResponseStatus.BadRequest)
        .json({ message: "Invalid pagination parameters." });
    }

    const category = request.query.category as Category | undefined;
    const searchString = request.query.searchString as string | undefined;

    const { products, totalCount, hasMore } = await productModel.getProducts({
      page,
      pageSize,
      category,
      searchString,
    });

    const processedProducts = await Promise.all(
      products.map(async (product: Product) => {
        const signedUrls = await S3Service.getSignedUrlForAssets(
          product.assets,
        );
        return {
          ...product,
          assets: signedUrls,
        };
      }),
    );

    return response
      .status(ResponseStatus.Success)
      .json({ data: processedProducts, totalCount, hasMore });
  } catch (error) {
    console.error("Error fetching products:", error);
    return response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}

export async function getProduct(request: Request, response: Response) {
  try {
    const { productId } = request.params;

    if (!productId) {
      return response
        .status(ResponseStatus.BadRequest)
        .json({ message: "Product ID is required." });
    }

    const productDetails = await productModel.getSingleProductDetails({
      productId,
    });

    const signedUrls = await S3Service.getSignedUrlForAssets(
      productDetails.assets,
    );

    const processedProduct = {
      ...productDetails,
      assets: signedUrls,
    };

    return response
      .status(ResponseStatus.Success)
      .json({ data: processedProduct });
  } catch (error: any) {
    console.error("Error fetching single product:", error);
    if (error.message === "Product not found") {
      return response
        .status(ResponseStatus.NotFound)
        .json({ message: "Product not found" });
    }
    return response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}

export async function deleteProduct(request: Request, response: Response) {
  try {
    const productId = parseInt(request.params.productId);

    if (isNaN(productId)) {
      return response
        .status(ResponseStatus.BadRequest)
        .json({ message: "Invalid product ID" });
    }

    const assetUrls = await productModel.getProductAssetUrls(productId);

    // Delete the assets from S3 if any exist
    if (assetUrls.length > 0) {
      await S3Service.deleteImagesByNames(assetUrls);
    }

    // Proceed to delete the product and its related entities in the database
    await productModel.deleteProductWithRelations(productId);

    response
      .status(ResponseStatus.Success)
      .json({ message: ResponseMessages.Success });
  } catch (error) {
    console.error("Error deleting product:", error);
    response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}

export async function getProductsByCategories(
  request: Request,
  response: Response,
) {
  try {
    const { categories } = request.body;

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return response
        .status(ResponseStatus.BadRequest)
        .json({ message: "Invalid or missing categories." });
    }

    const groupedProducts =
      await productModel.getLimitedProductsByCategories(categories);

    for (const category of Object.keys(groupedProducts)) {
      for (const product of groupedProducts[category]) {
        if (product.assets.length > 0) {
          const signedUrls = await S3Service.getSignedUrlForAssets(
            product.assets,
          );
          product.assets = signedUrls;
        }
      }
    }

    return response.status(200).json({ data: groupedProducts });
  } catch (error) {
    console.error("Error fetching products by categories:", error);
    response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}

export async function getTopProducts(request: Request, response: Response) {
  try {
    const topProducts = await productModel.getTopProductsByInteractions();

    const processedProducts = await Promise.all(
      topProducts.map(async (product: any) => {
        const signedUrls = product.assets
          ? await S3Service.getSignedUrlForAssets(product.assets)
          : [];
        return {
          ...product,
          assets: signedUrls,
        };
      }),
    );

    return response
      .status(ResponseStatus.Success)
      .json({ data: processedProducts });
  } catch (error) {
    console.error("Error fetching top products by interactions:", error);
    return response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}

export async function updateProduct(request: Request, response: Response) {
  try {
    const validatedData = updateProductSchema.parse(request.body);
    const {
      id,
      productName,
      description,
      price,
      categories: categoriesString,
      tags: tagsString,
      existingAssetUrls: existingAssetUrlsString,
    } = validatedData;

    const files: Express.Multer.File[] = request.files as Express.Multer.File[];

    const tags = tagsString ? (tagsString.split("+") as TagsEnum[]) : undefined;
    const categories = categoriesString
      ? (categoriesString.split("+") as Category[])
      : undefined;
    const existingAssetUrls = existingAssetUrlsString
      ? existingAssetUrlsString.split("+")
      : undefined;

    const userId = request.user?.userId;
    if (!userId) {
      return response
        .status(ResponseStatus.BadRequest)
        .json({ message: ResponseMessages.BadRequest });
    }

    if (existingAssetUrls && existingAssetUrls.length) {
      await productModel.deleteExistingAssets(id, existingAssetUrls);
      await S3Service.deleteImagesByNames(existingAssetUrls);
    }

    const uploadedFileNames =
      files && files.length ? await S3Service.uploadImages(files, userId) : [];
    const newAssetUrls = uploadedFileNames.map((fileName) => fileName);

    if (newAssetUrls.length > 0) {
      await productModel.createNewAssets(id, newAssetUrls);
    }

    const updateDetails = {
      id,
      ...(productName && { name: productName }),
      ...(description && { description }),
      ...(price && { price: parseFloat(price) }),
      ...(categories && { categories }),
      ...(tags && { tags }),
    };

    await productModel.updateProductDetails(updateDetails);

    response.status(ResponseStatus.Created).json({
      message: ResponseMessages.Created,
      data: { id, productName, description, price, categories, tags },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}
