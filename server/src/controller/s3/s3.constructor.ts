// import {
//   S3Client,
//   PutObjectCommand,
//   GetObjectCommand,
//   DeleteObjectsCommand,
// } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// //@ts-ignore
// const s3Client = new S3Client({
//   region: "ca-central-1",
//   credentials: {
//     accessKeyId: process.env.ACCESS_KEY_ID,
//     secretAccessKey: process.env.SECRET_KEY_ID,
//   },
// });

// const bucketName = "s3-tamilmatchmaking";

// interface File {
//   fieldname: string;
//   originalname: string;
//   encoding: string;
//   mimetype: string;
//   buffer: Buffer;
//   size: number;
// }

// const uploadAssets = async (
//   files: File[],
//   userId: number
// ): Promise<string[]> => {
//   const uploadFileNames: string[] = [];

//   for (const file of files) {
//     const name = `${Date.now()}_${userId}`;
//     const params = {
//       Bucket: bucketName,
//       Key: `tamilmatchmaking/${name}`,
//       Body: file.buffer,
//     };

//     const command = new PutObjectCommand(params);
//     await s3Client.send(command);

//     // @ts-ignore
//     uploadFileNames.push(name);
//   }

//   return uploadFileNames;
// };

// async function getAssetsUrls(assets: string[]) {
//   const imageUrls = [];
//   try {
//     for (let assetName of assets) {
//       const imageUrl = await getSignedUrl(
//         s3Client,
//         new GetObjectCommand({
//           Bucket: bucketName,
//           Key: "tamilmatchmaking/" + assetName,
//         }),
//         { expiresIn: 60 * 60 }
//       );
//       imageUrls.push(imageUrl);
//     }
//     return imageUrls;
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error fetching user Assets");
//   }
// }

// async function fetchAllProfileAssets(userProfiles: any[]) {
//   try {
//     for (let childrens of userProfiles) {
//       const imageUrl = await getSignedUrl(
//         s3Client,
//         new GetObjectCommand({
//           Bucket: bucketName,
//           Key: "tamilmatchmaking/" + childrens.children.assets[0].s3Id,
//         }),
//         { expiresIn: 60 * 60 }
//       );
//       childrens.children.assets[0].profileImage = imageUrl;
//     }
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error fetching user Assets");
//   }
// }
// async function fetchProfileAssets(profileDetails: any[]) {
//   try {
//     //@ts-ignore
//     for (let asset of profileDetails.assets) {
//       const imageUrl = await getSignedUrl(
//         s3Client,
//         new GetObjectCommand({
//           Bucket: bucketName,
//           Key: "tamilmatchmaking/" + asset.s3Id,
//         }),
//         { expiresIn: 60 * 60 }
//       );
//       asset.profileImage = imageUrl;
//     }
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error fetching user Assets");
//   }
// }

// async function fetchSingleProfileAsset(profileDetails: any[]) {
//   try {
//     // @ts-ignore
//     for (let asset of profileDetails?.assets) {
//       const imageUrl = await getSignedUrl(
//         s3Client,
//         new GetObjectCommand({
//           Bucket: bucketName,
//           Key: "tamilmatchmaking/" + asset?.s3Id,
//         }),
//         { expiresIn: 60 * 60 }
//       );

//       asset.profileImage = imageUrl;
//     }
//   } catch (error) {
//     console.log(error);
//     throw new Error("Error fetching user Assets");
//   }
// }

// async function deleteUserAssets(s3Ids: string[]) {
//   try {
//     const objectsToDelete = s3Ids.map((id) => ({
//       Key: `tamilmatchmaking/${id}`,
//     }));

//     const deleteParams = {
//       Bucket: bucketName,
//       Delete: {
//         Objects: objectsToDelete,
//         Quiet: false,
//       },
//     };

//     // Sending the delete command to S3
//     const deleteResult = await s3Client.send(
//       new DeleteObjectsCommand(deleteParams)
//     );
//     console.log(deleteResult, "deleteResult");
//     return deleteResult;
//   } catch (error) {
//     throw new Error(`Failed to delete assets`);
//   }
// }

// export {
//   uploadAssets,
//   getAssetsUrls,
//   fetchAllProfileAssets,
//   fetchProfileAssets,
//   fetchSingleProfileAsset,
//   deleteUserAssets,

// };