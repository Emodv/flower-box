import { TransactionStatus, Transaction } from "@prisma/client";
import prisma from "../../prisma";

interface TransactionQueryParams {
  page: number;
  pageSize: number;
  status: TransactionStatus;
}

interface PaginatedTransactionResponse {
  transactions: Transaction[];
  hasMore: boolean;
}

export async function getTransactions({
  page,
  pageSize,
  status,
}: TransactionQueryParams): Promise<PaginatedTransactionResponse> {
  try {
    const skip = (page - 1) * pageSize;

    const transactions = await prisma.transaction.findMany({
      where: { status: status },
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    const totalTransactions = await prisma.transaction.count({
      where: { status: status },
    });

    return {
      transactions,
      hasMore: skip + pageSize < totalTransactions,
    };
  } catch (error) {
    console.error("Error fetching transactions based on status:", error);
    throw new Error("Failed to fetch transactions");
  }
}
