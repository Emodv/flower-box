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
    accessKeyId: process.env.IAM_ACCESS_KEY_ID!,
    secretAccessKey: process.env.IAM_SECRET_KEY_ID!,
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
    try {
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
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error("Failed to upload images");
    }
  }

  public static async deleteImagesByNames(
    imageNames: string[],
  ): Promise<string[]> {
    try {
      const objectsToDelete = imageNames.map((imageName) => ({
        Key: `${imageName}`,
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
    } catch (error) {
      console.error("Error deleting images:", error);
      throw new Error("Failed to delete images");
    }
  }

  public static async getSignedUrlForAssets(
    assetNames: string[],
  ): Promise<string[]> {
    try {
      const signUrlAssets = assetNames.map(async (assetName) => {
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: `${assetName}`,
        });
        return getSignedUrl(s3Client, command, { expiresIn: 3600 });
      });

      const urls = await Promise.all(signUrlAssets);

      return urls;
    } catch (error) {
      console.error("Error generating signed URLs:", error);
      throw new Error("Failed to generate signed URLs");
    }
  }
}

export default S3Service;
