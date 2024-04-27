import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "@/services";
import { Button } from "../../ui/button";
import ProductCards from "../cards/productCards";
import { ProductTypes } from "@/types/types";
import useStore from "@/state/store";
import Image from "next/image";
import { SkeletonCard } from "../skeleton/cardSkeleton";

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

  if (status === "pending") {
    return (
      <div className="container flex justify-between flex-wrap gap-2 px-10">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
          return <SkeletonCard key={item}></SkeletonCard>;
        })}
      </div>
    );
  }
  
  if (error || data?.pages[0]?.data.length < 1) {
    return (
      <div className="container flex flex-col items-center justify-center py-20">
        <Image
          src="/noproductfound.png"
          width={300}
          height={300}
          alt="empty no image"
        ></Image>
        <p className="mt-4 text-2xl">No products found...</p>
        <p className="text-lg text-subtle">
          Your search did not match any products, try adjusting the filter...
        </p>
      </div>
    );
  }

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
