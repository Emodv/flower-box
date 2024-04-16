"use client";

import React from "react";
import { cn, formatDate, truncateString } from "@/lib/utils";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { ProductTypes } from "@/types/types";
import { usePagination } from "@/hooks/usePagination";
import TableSkeleton from "../skeleton/tableSkeleton";
import { useRouter } from "next/navigation";

interface Props {
  columns: string[];
  data?: {
    data: ProductTypes.Product[];
    prevPage?: number;
    nextPage?: number;
  };
  isError: boolean;
  isFetching: boolean;
  error: any;
}

function PaginationTable({ columns, data, isError, error, isFetching }: Props) {
  const router = useRouter();
  const { currentPage, setPage } = usePagination();

  return (
    <div className="table-responsive">
      {isFetching ? (
        <TableSkeleton />
      ) : (
        <Table>
          <TableCaption>A list of products</TableCaption>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={column}
                  className={cn("capitalize", {
                    "text-right": index === columns.length - 1,
                  })}
                >
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {isError ? (
              <div>Error: {error?.message}</div>
            ) : (
              data?.data.map((product) => (
                <TableRow
                  key={product.id}
                  className="h-10"
                  onClick={() =>
                    router.push(`/dashboard/all-products/${product.id}`)
                  }
                >
                  <TableCell className="font-medium">
                    <Image
                      src={product.assets[0]}
                      alt="product image"
                      width={100}
                      height={100}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  {/* <TableCell >{truncateString(product.description, 100)}</TableCell> */}
                  <TableCell >{product.description}</TableCell>
                  <TableCell>{formatDate(product.createdAt)}</TableCell>
                  <TableCell className="text-right">{product.price}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow className="hover:bg-background">
              <TableCell colSpan={5}>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        // @ts-ignore
                        onClick={() => setPage(data?.prevPage)}
                        aria-label="Go to next page"
                        size="default"
                        className={cn("gap-1 pr-2.5")}
                        disabled={!data?.prevPage}
                        variant="ghost"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous</span>
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button
                        // @ts-ignore
                        onClick={() => setPage(data?.prevPage)}
                        aria-label="Go to next page"
                        size="default"
                        className={cn("gap-1 pr-2.5")}
                        disabled={!data?.prevPage}
                        variant="ghost"
                      >
                        {currentPage - 1}
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink isActive>{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <Button
                        // @ts-ignore
                        onClick={() => setPage(data.nextPage)}
                        aria-label="Go to next page"
                        size="default"
                        className={cn("gap-1 pr-2.5")}
                        disabled={!data?.nextPage}
                        variant="ghost"
                      >
                        {currentPage + 1}
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button
                        // @ts-ignore
                        onClick={() => setPage(data.nextPage)}
                        aria-label="Go to next page"
                        size="default"
                        className={cn("gap-1 pr-2.5")}
                        disabled={!data?.nextPage}
                        variant="ghost"
                      >
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}

export default PaginationTable;
