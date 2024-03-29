import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "@/services";
import { Button } from "../../ui/button";
import ProductCards from "../cards/productCards";
import { ProductTypes } from "@/types/types";

function PaginatedProducts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["paginatedProducts"],
    queryFn: ({ pageParam = 1 }) =>
      productService.fetchPaginatedProducts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  console.log(data?.pages, "data");

  if (status === "pending") return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container h-screen">
      <div className="products card-grid">
        {data?.pages.map((product: any) => {
          return (
            <>
              {product?.data.map((item: ProductTypes.Product) => {
                return (
                  <ProductCards
                    key={item.id}
                    {...item}
                    />
                );
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
          {isFetchingNextPage ? "Loading..." : !hasNextPage ? "No more data to load." :"Load More"}
        </Button>
      </div>
    </div>
  );
}

export default PaginatedProducts;
