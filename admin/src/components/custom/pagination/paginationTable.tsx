"use client";

import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import PaginationControls from "./paginationControl";
import {
  ProductTypes,
  orderType,
  routes,
  transactionType,
} from "@/types/types";
import TableSkeleton from "../skeleton/tableSkeleton";
import { cn, formatDate } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMarkOrderComplete } from "@/services/client/orders";

interface Props {
  columns: string[];
  data?: {
    data:
      | ProductTypes.Product[]
      | transactionType.Transaction[]
      | orderType.order[]
      | undefined;
    prevPage?: number;
    nextPage?: number;
  };
  isError: boolean;
  error: any;
  isFetching: boolean;
  caption: string;
}

const PaginationTable = ({
  columns,
  data,
  isError,
  error,
  isFetching,
  caption,
}: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mutateId, setMutateId] = useState<boolean | number>(false);

  const { mutate: markOrderCompleteMut } = useMarkOrderComplete();

  if (isFetching) return <TableSkeleton />;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="table-responsive mt-4">
      <Table>
        <TableCaption>{caption}</TableCaption>
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
        <TableBody>
          {data?.data?.map((product) => (
            <TableRow key={product.id} className="h-10">
              {columns.map((col, index) => (
                <TableCell
                  onClick={() => {
                    if (pathName === routes.all_products) {
                      router.push(`${routes.all_products}/${product.id}`);
                    }
                    if (pathName === routes.orders) {
                      setIsOpen(true);
                      setMutateId(product?.id);
                    }
                  }}
                  key={`${product.id}`}
                  className={cn("", {
                    "text-end": index + 1 === columns.length,
                  })}
                >
                  {col === "assets" ? (
                    <Image
                      // @ts-ignore
                      src={product?.assets[0]}
                      // src="/placeholderProduct.jpg"
                      width={100}
                      height={100}
                      // @ts-ignore
                      alt={`Image of ${product.name}`}
                      placeholder="blur"
                      blurDataURL="/placeholderProduct.jpg"
                    />
                  ) : col === "createdAt" || col === "updatedAt" || col === 'deliveryDate' ? (
                    // @ts-ignore
                    formatDate(product[col])
                  ) : (
                    // @ts-ignore
                    product[col]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              <PaginationControls
                prevPage={data?.prevPage}
                nextPage={data?.nextPage}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delivered.</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark this order as Delivered?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                if (!mutateId) {
                  return;
                }
                markOrderCompleteMut({ orderId: mutateId as number });
                setIsOpen(false);
              }}
            >
              Mark as delivered
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaginationTable;
