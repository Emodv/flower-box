import { Request, Response } from "express";
import S3Service from "../../services/aws/s3.constructor";
import { createProductWithAssets } from "../../model/product/product.model";
import { ResponseMessages, ResponseStatus } from "../../enums/responseEnums";

async function uploadProduct(request: Request, response: Response) {
  const { productName, description, price, category } = request.body;
  const files: Express.Multer.File[] = request.files as Express.Multer.File[];

  const userId = request.user?.userId as string;

  try {
    const uploadedFileNames = await S3Service.uploadImages(files, userId);
    const assetUrls = uploadedFileNames;

    //TODO : add tags
    const product = await createProductWithAssets({
      name: productName,
      description,
      price: parseFloat(price),
      category,
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

export default {
  uploadProduct,
};
