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
  return Instance.post(`/authentication/admin/login`, userData, {});
}

export const fetchPaginatedProducts = async ({
  page = 1,
}: {
  page: number;
}) => {
  const pageSize = 10;
  let queryString = `/products/get-paginated-products?page=${page}&pageSize=${pageSize}`;

  const response = await Instance.get(queryString);
  const { data, totalCount, hasMore } = response.data;

  const nextPage = hasMore ? page + 1 : undefined;
  const prevPage = page > 1 ? page - 1 : undefined;

  return {
    data,
    nextPage,
    prevPage,
    totalCount
  };
};

export function deleteProductById({ productId }: { productId: number }) {
  const url = `/products/delete-product/${productId}`;

  return Instance.get(url);
}

export function fetchProduct({ productId }: { productId: string }) {
  const url = `/products/product/${productId}`;

  return Instance.get(url);
}
