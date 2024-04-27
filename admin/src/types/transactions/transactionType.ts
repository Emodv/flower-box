type Transactions = {
  transactions: Transaction[];
  hasMore: boolean;
};

interface Transaction {
  id: number;
  orderId: number;
  amount: number;
  status: string;
  createdAt: string;
}

export const statusOptionsT = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

export type { Transactions, Transaction };
