"use client";

import { DataTable } from "@/components/DataTable";
import React from "react";
import { useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import * as adminService from "@/services/adminService";
import PageTitle from "@/components/PageTitle";
import { ColumnDef } from "@tanstack/react-table";
import { ProductTypes } from "@/types/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CustomAxiosError } from "@/services/api";

type Props = {};

// interface PaginatedProductsResponse {
//   data: {
//     data: ProductTypes.Product[];
//   };
// }

function ProductList({}: Props) {
  const [formLoading, setFormLoading] = useState(false);

  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["paginatedProducts"],
    queryFn: ({ pageParam = 1 }) =>
      adminService.fetchPaginatedProducts({
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: adminService.deleteProductById,
    onSuccess: (response) => {
      setFormLoading(false);
      toast({
        title: "Product Deleted.",
        variant: "sucess",
      });
      queryClient.refetchQueries({
        queryKey: ["products"],
      });
    },
    onError: (error: CustomAxiosError) => {
      setFormLoading(false);
      const message = error.response?.data?.message || error.message;
      toast({
        title: message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Could not load Products...</div>;

  const pageIndex = data?.pageParams[data?.pageParams.length-1]
  const products = data?.pages.flatMap((page) => page.data) || [];
  console.log(products, "products");
  console.log(pageIndex, "pageIndex");

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Product list" />
      <DataTable
        columns={columns(mutation)}
        data={products}
        fetchNextPage={fetchNextPage}
        fetchPreviousPage={fetchPreviousPage}
        hasNextPage={hasNextPage}
        pageIndex={pageIndex}
      />
    </div>
  );
}

export default ProductList;

function columns(mutation: any): ColumnDef<ProductTypes.Product>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "assets",
      header: "Image",
      cell: ({ row }) => {
        const assets: string[] = row.getValue("assets");
        return (
          <div className="flex h-14 w-full flex-wrap gap-1 font-medium">
            {/* {assets?.map((assetUrl: string) => {
            return ( */}

            <div className="w-14" key={assets[0]}>
              <Image
                src={assets[0]}
                width={100}
                height={100}
                alt={`preview`}
                className="h-full w-full object-cover"
              />
            </div>
            {/* ); */}
            {/* })} */}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Product title",
    },

    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        const formatted = date.toLocaleDateString();
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ChevronDown size={15} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="flex cursor-pointer space-x-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    const productId = row.original.id;
                    mutation.mutate({
                      productId,
                    });
                  }}
                >
                  <Trash size={15} color="red" />

                  <p>Delete Item</p>
                  {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
