import { Request, Response } from "express";
import S3Service from "../../services/aws/s3.constructor";
import {
  createProductWithAssets,
  getProducts,
} from "../../model/product/product.model";
import { ResponseMessages, ResponseStatus } from "../../enums/responseEnums";
import { uploadProductSchema } from "../../schema/validation";
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

async function uploadProduct(request: Request, response: Response) {
  try {
    const validatedData = uploadProductSchema.parse(request.body);

    const {
      productName,
      description,
      price,
      categories: categoriesString,
      tags: tagsString,
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

    const product = await createProductWithAssets({
      name: productName,
      description,
      price: parseFloat(price),
      categories,
      tags,
      assetUrls,
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

async function getProductsHandler(request: Request, response: Response) {
  try {
    const page = parseInt(request.query.page as string) || 1;
    const pageSize = parseInt(request.query.pageSize as string) || 10;

    if (page < 1 || pageSize < 1) {
      return response
        .status(ResponseStatus.BadRequest)
        .json({ message: "Invalid pagination parameters." });
    }

    const products = await getProducts({ page, pageSize });

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
      .json({ data: processedProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return response
      .status(ResponseStatus.InternalServerError)
      .json({ message: ResponseMessages.InternalServerError });
  }
}

export default {
  uploadProduct,
  getProductsHandler,
};
