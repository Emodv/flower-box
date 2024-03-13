import Instance from "@/services/api";

export const uploadProduct = async ({
  productName,
  productId,
  description,
  price,
  categories,
  tags,
  productImages,
}: {
  productName: string;
  productId: string;
  description: string;
  price: string;
  categories: string[];
  tags: string[];
  productImages?: any;
}) => {
  const formData = new FormData();

  productImages.forEach((file: File) => formData.append("files", file));

  formData.append("productName", productName);
  formData.append("productId", productId);
  formData.append("description", description);
  formData.append("price", price);
  const categoriesString = categories.join("+");
  const tagsString = tags.join("+");

  formData.append("categories", categoriesString);
  formData.append("tags", tagsString);

  return Instance.post(`/products/add-product`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export function loginHandler(userData: { email: string; password: string }) {
  return Instance.post(`/authentication/admin/login`, userData, {
  });
}

export function fetchPaginatedProducts({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const url = `/products/get-paginated-products?page=${page}&pageSize=${pageSize}`;

  return Instance.get(url);
}
