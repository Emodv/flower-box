"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";

import PaginationTable from "@/components/custom/pagination/paginationTable";
import { transactionEnum, transactionType } from "@/types/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import TableSkeleton from "@/components/custom/skeleton/tableSkeleton";
import { usePathname, useRouter } from "next/navigation";
import { useTransactionDetails } from "@/services/client/orders";
import { statusOptionsT } from "@/types/transactions/transactionType";

const columns = [
  // transactionEnum.TransactionEnum.id,
  transactionEnum.TransactionEnum.orderId,
  transactionEnum.TransactionEnum.amount,
  transactionEnum.TransactionEnum.status,
  transactionEnum.TransactionEnum.createdAt,
];

export default function OrdersPage() {
  const router = useRouter();
  const pathName = usePathname();

  const {
    query: { isLoading, isError, data, isFetching, error },
    view: { view, setView },
    currentPage,
  } = useTransactionDetails();

  if (isLoading)
    return (
      <div>
        <PageTitle title="Transactions" />
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
        <p className="mt-4 text-2xl">No Transactions found</p>
        <p className="text-subtle text-lg">
          No Transactions in Inventory yet...
        </p>
      </div>
    );
  }

  const { transactions, hasMore } = data?.data as transactionType.Transactions;

  const nextPage = hasMore ? currentPage + 1 : undefined;
  const prevPage = currentPage > 1 ? currentPage - 1 : undefined;

  return (
    <div className="">
      <div className="flex justify-between">
        <PageTitle title="Transactions" />
        <Tabs
          value={view}
          onValueChange={(value) => {
            setView(value);
            router.replace(`${pathName}?page=${1}`);
          }}
          className="mb-4 w-[400px] dark:bg-primary-foreground"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={statusOptionsT.SUCCESS}>Success</TabsTrigger>
            <TabsTrigger value={statusOptionsT.FAILED}>Failed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <PaginationTable
        columns={columns}
        data={{
          data: transactions,
          nextPage,
          prevPage,
        }}
        isError={isError}
        isFetching={isFetching}
        error={error}
        caption="List of Successful Transaction"
      />
    </div>
  );
}
