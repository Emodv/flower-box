"use client";

import { DataTable } from "@/components/DataTable";
import React from "react";
import { columns } from "./columns";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPaginatedProducts } from "@/services/adminService";
import PageTitle from "@/components/PageTitle";
import { ProductTypes } from "@/types/types";

type Props = {};

interface PaginatedProductsResponse {
  data: {
    data: ProductTypes.Product[];
  };
}

function ProductList({}: Props) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError, error } = useQuery<PaginatedProductsResponse>({
    queryKey: ["products", page, pageSize],
    queryFn: () => fetchPaginatedProducts({ page, pageSize }),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        Could not load Products...
      </div>
    );
  
  const products = data?.data.data || [];

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Product list" />
      <DataTable columns={columns} data={products} />
    </div>
  );
}

export default ProductList;
