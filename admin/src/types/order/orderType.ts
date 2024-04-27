type Orders = {
  orders: order[];
  hasMore : boolean;
};

interface order {
    id:number;
    status:string;
    createdAt:string;
    updatedAt:string;
    address:string;
}

export const statusOptions = {
  PENDING: "PENDING",
  FAILED: "COMPLETED",
};

export type { Orders, order };
