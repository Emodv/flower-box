import Instance from "@/services/api";

export const uploadProduct = async ({
  productName,
  productId,
  description,
  price,
  category,
  productImages,
}: {
  productName: string;
  productId: string;
  description: string;
  price: string;
  category: string;
  productImages?: any;
}) => {
  const formData = new FormData();

  productImages.forEach((file: File) => formData.append("files", file));

  formData.append("productName", productName);
  formData.append("productId", productId);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("category", category);

  return Instance.post(`/admin/add-product`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
