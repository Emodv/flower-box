"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import * as adminService from "@/services/adminService";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { ChevronDown, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CustomAxiosError } from "@/services/api";
import tableSkeleton from "@/components/custom/skeleton/tableSkeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {};

const columns = ["image", "name", "description", "createdAt", "price"];

function ProductList({}: Props) {
  const { toast } = useToast();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const parsedPage = parseInt(page || "1");
  const pathname = usePathname();

  // useEffect(() => {
  //   if (!page) {
  //     replace(`${pathname}?page=1`);
  //   }
  // }, [page, replace, pathname]);

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
    getNextPageParam: (lastPage) => {
      console.log(lastPage.nextPage,"lastPage.nextPage")
      return lastPage.nextPage;
    },
    getPreviousPageParam: (lastPage, allPages) => {
      const currentPage = allPages[allPages.length - 1];
      console.log(currentPage.prevPage,"currentPage.prevPage")
      return currentPage.prevPage
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Could not load Products...</div>;

  const handleNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      const nextPage = parsedPage + 1;
      replace(`${pathname}?page=${nextPage}`);
      fetchNextPage();
    }
  };

  const handlePrevPage = () => {
    if (page || 0 > 1) {
      const prevPage = parsedPage - 1;
      replace(`${pathname}?page=${prevPage}`);
      fetchPreviousPage();
    }
  };

  console.log(data?.pages, "data?.pages");
  console.log(parsedPage, "parsedPage");

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Product list" />
      <div className="table">
        <Table>
          <TableCaption>A list of products...</TableCaption>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={column}
                  className={cn("capitalize", {
                    "text-right": index == columns.length - 1,
                  })}
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.pages[0]?.data.map((product) => {
              return (
                <TableRow key={product.id} className="h-10">
                  <TableCell className="font-medium">
                    <Image
                      src={product.assets[0]}
                      alt="product image"
                      width={100}
                      height={100}
                    ></Image>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.createdAt}</TableCell>
                  <TableCell className="text-right">{product.price}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow className="hover:bg-background">
              <TableCell colSpan={3}></TableCell>
              <TableCell colSpan={2}>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={handlePrevPage}
                    disabled={parsedPage <= 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={!hasNextPage}
                  >
                    Next
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default ProductList;
