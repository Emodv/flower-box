import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as adminService from "../adminService";
import { queryClient } from "@/lib/react-query-provider";
import { CustomAxiosError } from "../api";
import { orderType, transactionType } from "@/types/types";
import { usePagination } from "@/hooks/usePagination";
import { useState } from "react";
import { statusOptions } from "@/types/order/orderType";
import { statusOptionsT } from "@/types/transactions/transactionType";

export function useMarkOrderComplete() {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: adminService.markOrderComplete,
    onSuccess(response) {
      toast({
        title: "Order Marked Completed.",
        variant: "sucess",
      });
      queryClient.invalidateQueries({ queryKey: ["paginatedOrders"] });
    },
    onError(error: CustomAxiosError) {
      const message = error.response?.data?.message || error.message;
      toast({
        title: message,
        variant: "destructive",
      });
    },
    onSettled() {},
  });

  return mutation;
}

interface orderDetails {
  data: orderType.Orders;
}

export function useOrdersDetails() {
  const [view, setView] = useState(statusOptions.PENDING);

  const { currentPage } = usePagination();

  const query = useQuery<orderDetails>({
    queryKey: ["paginatedOrders", currentPage, view],
    queryFn: () =>
      adminService.fetchPaginatedOrders({
        page: currentPage,
        view,
      }),
  });

  return {
    query,
    currentPage,
    view: {
      view,
      setView,
    },
  };
}

interface transactionsDetail {
  data: transactionType.Transactions;
}

export function useTransactionDetails() {
  const { currentPage } = usePagination();

  const [view, setView] = useState(statusOptionsT.SUCCESS);

  const query = useQuery<transactionsDetail>({
    queryKey: ["paginatedOrders", currentPage, view],
    queryFn: () =>
      adminService.fetchPaginatedTransactions({
        page: currentPage,
        view,
      }),
  });

  return {
    query,
    currentPage,
    view: {
      view,
      setView,
    },
  };
}
