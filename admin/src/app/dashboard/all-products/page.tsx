"use client";

import React from "react";
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
import { useParams, useSearchParams } from "next/navigation";

type Props = {};

// interface PaginatedProductsResponse {
//   data: {
//     data: ProductTypes.Product[];
//   };
// }

function ProductList({}: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();

  const [formLoading, setFormLoading] = useState(false);

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

  console.log(data?.pages, "data-data");
  const search = searchParams.get("page");
  console.log(search, "search");

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Product list" />
      <div className="table">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.pages[search]?.data.map((invoice) => {
              console.log(invoice,"invoice")
              return (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.name}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>{invoice.createdAt}</TableCell>
                  <TableCell className="text-right">
                    {invoice.price}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default ProductList;

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
