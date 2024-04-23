"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import * as adminService from "@/services/adminService";
import PageTitle from "@/components/PageTitle";
import PaginationTable from "@/components/custom/pagination/paginationTable";
import { ProductEnum, ProductTypes } from "@/types/types";
import { usePagination } from "@/hooks/usePagination";
import Image from "next/image";
import TableSkeleton from "@/components/custom/skeleton/tableSkeleton";

type Props = {};

interface productDetails {
    data: ProductTypes.Product[];
}

const columns = [
  ProductEnum.ProductColumns.Assets,
  // ProductEnum.ProductColumns.Id,
  ProductEnum.ProductColumns.Name,
  ProductEnum.ProductColumns.Description,
  ProductEnum.ProductColumns.Price,
  ProductEnum.ProductColumns.CreatedAt,
  // ProductEnum.ProductColumns.UpdatedAt,
  // ProductEnum.ProductColumns.Tags,
  // ProductEnum.ProductColumns.Categories,
];

function ProductList({}: Props) {
  const { currentPage } = usePagination();

  const { data, error, isError, isLoading, isFetching } =
    useQuery<productDetails>({
      queryKey: ["paginatedProducts", currentPage],
      queryFn: () => adminService.fetchPaginatedProducts({ page: currentPage }),
    });

    if (isLoading)
      return (
        <div>
          <PageTitle title="All Products" />
          <TableSkeleton />
        </div>
      );
  
    if (isError) {
      return (
        <div className="container flex flex-col items-center justify-center py-20">
          <Image
            src="/noproductfound.png"
            width={300}
            height={300}
            alt="empty no image"
          ></Image>
          <p className="mt-4 text-2xl">No Products found</p>
          <p className="text-subtle text-lg">No Orders in Inventory yet...</p>
        </div>
      );
    }

  return (
    <div className="">
      <PageTitle title="Product list" />
      <PaginationTable
        columns={columns}
        data={data}
        isError={isError}
        isFetching={isFetching}
        error={error}
        caption="list of products"
      />
    </div>
  );
}

export default ProductList;
