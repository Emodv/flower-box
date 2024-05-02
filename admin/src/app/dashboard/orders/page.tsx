"use client";

import React from "react";
import PageTitle from "@/components/PageTitle";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaginationTable from "@/components/custom/pagination/paginationTable";
import { orderEnum, orderType } from "@/types/types";
import Image from "next/image";
import TableSkeleton from "@/components/custom/skeleton/tableSkeleton";
import { usePathname, useRouter } from "next/navigation";
import { useOrdersDetails } from "@/services/client/orders";
import { statusOptions } from "@/types/order/orderType";

const columns = [
  orderEnum.orderEnum.id,
  orderEnum.orderEnum.status,
  orderEnum.orderEnum.createdAt,
  orderEnum.orderEnum.updatedAt,
  orderEnum.orderEnum.address,
  orderEnum.orderEnum.deliveryDate,
];

export default function OrdersPage() {
  const router = useRouter();
  const pathName = usePathname();

  const {
    query: { isLoading, isError, data, isFetching, error },
    view: { view, setView },
    currentPage,
  } = useOrdersDetails();

  if (isLoading)
    return (
      <div>
        <PageTitle title="Orders" />
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
        <p className="mt-4 text-2xl">No Orders found</p>
        <p className="text-subtle text-lg">No Orders in Inventory yet...</p>
      </div>
    );
  }

  const { orders, hasMore } = data?.data as orderType.Orders;
  const nextPage = hasMore ? currentPage + 1 : undefined;
  const prevPage = currentPage > 1 ? currentPage - 1 : undefined;

  return (
    <div className="">
      <div className="flex justify-between">
        <PageTitle title="Orders" />
        <Tabs
          value={view}
          onValueChange={(value) => {
            setView(value);
            router.replace(`${pathName}?page=${1}`);
          }}
          className="mb-4 w-[400px] dark:bg-primary-foreground"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={statusOptions.PENDING}>Pending</TabsTrigger>
            <TabsTrigger value={statusOptions.FAILED}>Delivered</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <PaginationTable
        columns={columns}
        data={{
          data: orders,
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
