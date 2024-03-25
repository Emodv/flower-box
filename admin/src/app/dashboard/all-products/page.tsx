"use client";

import { DataTable } from "@/components/DataTable";
import React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProductById,
  fetchPaginatedProducts,
} from "@/services/adminService";
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

interface PaginatedProductsResponse {
  data: {
    data: ProductTypes.Product[];
  };
}

function ProductList({}: Props) {
  const [page, setPage] = useState(1);
  const [formLoading, setFormLoading] = useState(false);
  const pageSize = 10;

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } =
    useQuery<PaginatedProductsResponse>({
      queryKey: ["products", page, pageSize],
      queryFn: () => fetchPaginatedProducts({ page, pageSize }),
      refetchOnWindowFocus: false,
    });

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteProductById,
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

  const products = data?.data.data || [];

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Product list" />
      <DataTable columns={columns(mutation)} data={products} />
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
        console.log(assets,'asdf')
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
    // {
    //   accessorKey: "updatedAt",
    //   header: "Updated At",
    //   cell: ({ row }) => {
    //     const date = new Date(row.getValue("updatedAt"));
    //     const formatted = date.toLocaleDateString();
    //     return <div className="font-medium">{formatted}</div>;
    //   },
    // },
    // {
    //   accessorKey: "tags",
    //   header: "Tags",
    //   cell: ({ row }) => {
    //     const tags: string[] = row.getValue("tags");
    //     return (
    //       <div className="flex w-40 flex-wrap gap-1 font-medium">
    //         {tags?.map((tag) => {
    //           return (
    //             <span
    //               key={tag}
    //               className="rounded-md bg-primary p-1 text-white shadow-sm"
    //             >
    //               {tag}
    //             </span>
    //           );
    //         })}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "categories",
    //   header: "Categories",
    //   cell: ({ row }) => {
    //     const categories: string[] = row.getValue("categories");
    //     return (
    //       <div className="flex w-64 flex-wrap gap-1 font-medium">
    //         {categories?.map((category) => {
    //           return (
    //             <span
    //               key={category}
    //               className="rounded-md bg-primary p-1 text-white shadow-sm"
    //             >
    //               {category}
    //             </span>
    //           );
    //         })}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "description",
    //   header: "Description",
    //   cell: ({ row }) => {
    //     const description: string = row.getValue("description");
    //     return <div className="w-64">{description}asdf</div>;
    //   },
    // },
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
