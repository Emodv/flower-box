import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize the S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_KEY_ID!,
  },
});

const bucketName = process.env.AWS_S3_BUCKET_NAME;

class S3Service {
  private static folderName = "products";

  public static async uploadImages(
    files: Express.Multer.File[],
    userId: string,
  ): Promise<string[]> {
    const uploadedFileNames: string[] = [];

    for (const file of files) {
      const fileName = `${S3Service.folderName}/${Date.now()}_${userId}_${file.originalname}`;
      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: file.buffer,
      };

      await s3Client.send(new PutObjectCommand(params));
      uploadedFileNames.push(fileName);
    }

    return uploadedFileNames;
  }

  public static async deleteImagesByNames(
    imageNames: string[],
  ): Promise<string[]> {
    const objectsToDelete = imageNames.map((imageName) => ({
      Key: `${S3Service.folderName}/${imageName}`,
    }));

    const params = {
      Bucket: bucketName,
      Delete: {
        Objects: objectsToDelete,
        Quiet: false,
      },
    };

    await s3Client.send(new DeleteObjectsCommand(params));
    return imageNames;
  }

  public static async getSignedUrlForAssets(
    assetNames: string[],
  ): Promise<string[]> {
    const urls = await Promise.all(
      assetNames.map(async (assetName) => {
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: `${S3Service.folderName}/${assetName}`,
        });
        return getSignedUrl(s3Client, command, { expiresIn: 3600 });
      }),
    );

    return urls;
  }
}

export default S3Service;
