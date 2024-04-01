import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "@/services";
import { Button } from "../../ui/button";
import ProductCards from "../cards/productCards";
import { ProductTypes } from "@/types/types";
import { Category } from "@/types/productTypes";
import useStore from "@/state/store";

function PaginatedProducts() {
  const { searchString, category } = useStore((state) => state);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["paginatedProducts", category, searchString],
    queryFn: ({ pageParam = 1 }) =>
      productService.fetchPaginatedProducts({
        pageParam,
        category,
        searchString,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  console.log(data?.pages, "data");
  console.log(searchString, category, "store");

  if (status === "pending") return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container min-h-screen">
      <div className="products card-grid">
        {data?.pages.map((product: any) => {
          return (
            <>
              {product?.data.map((item: ProductTypes.Product) => {
                return <ProductCards key={item.id} {...item} />;
              })}
            </>
          );
        })}
      </div>
      <div className="flex justify-center pt-10">
        <Button
          variant="outline"
          className="hover:bg-primary-hover"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading..."
            : !hasNextPage
              ? "🥰"
              : "Load More"}
        </Button>
      </div>
    </div>
  );
}

export default PaginatedProducts;
