"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import * as adminService from "@/services/adminService";
import PageTitle from "@/components/PageTitle";
import PaginationTable from "@/components/custom/pagination/paginationTable";
import { ProductTypes } from "@/types/types";
import { usePagination } from "@/hooks/usePagination";

type Props = {};

interface productDetails {
  data: {
    data: ProductTypes.Product;
  };
}

const columns = ["image", "name", "description", "createdAt", "price"];

function ProductList({}: Props) {
  const { currentPage } = usePagination();

  const { data, error, isError, isLoading, isFetching } =
    useQuery<productDetails>({
      queryKey: ["paginatedProducts", currentPage],
      queryFn: () => adminService.fetchPaginatedProducts({ page: currentPage }),
    });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Could not load Products...</div>;

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Product list" />
      <PaginationTable
        columns={columns}
        // @ts-ignore
        data={data}
        isError={isError}
        isFetching={isFetching}
        error={error}
      />
    </div>
  );
}

export default ProductList;
