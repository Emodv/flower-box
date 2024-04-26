import prisma from "../../prisma";
import {
  Order,
  OrderStatus,
  TransactionStatus,
  OrderItem,
  Transaction,
} from "@prisma/client";

interface newOrderI extends Order {
  orderItems: OrderItem[];
  transaction: Transaction | null;
}

interface OrderQueryParams {
  page: number;
  pageSize: number;
  status: OrderStatus;
}

interface PaginatedOrderResponse {
  orders: Order[];
  hasMore: boolean;
}

export async function getOrders({
  page,
  pageSize,
  status,
}: OrderQueryParams): Promise<PaginatedOrderResponse> {
  try {
    const skip = (page - 1) * pageSize;

    const orders = await prisma.order.findMany({
      where: { status: status },
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    const totalOrders = await prisma.order.count({
      where: { status: status },
    });

    return {
      orders,
      hasMore: skip + pageSize < totalOrders,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

export async function completeOrder({
  orderId,
}: {
  orderId: number;
}): Promise<void> {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { status: true },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new Error(
        "Order is not in a state that can be marked as completed",
      );
    }

    await prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.COMPLETED },
    });

    console.log(`Order ${orderId} has been marked as completed.`);
  } catch (error) {
    console.error("Error completing order:", error);
    throw new Error("Failed to complete order");
  }
}

async function createOrder({
  address,
  orderItems,
}: {
  address: string;
  orderItems: Array<{ productId: number; quantity: number }>;
}): Promise<newOrderI | null> {
  try {
    const orderWithDetails = await prisma.order.create({
      data: {
        address,
        status: OrderStatus.PENDING,
        transaction: {
          create: {
            amount: 0,
            status: TransactionStatus.FAILED,
          },
        },
        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
      },
      include: {
        orderItems: true,
        transaction: true,
      },
    });

    return orderWithDetails;
  } catch (error) {
    console.error("Error creating order with related entities:", error);
    throw new Error("Failed to create order and related entities");
  }
}

async function updateTransactionStatusAndAmount(
  transactionId: number,
  amount: number,
) {
  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: TransactionStatus.SUCCESS, amount },
    });
    return updatedTransaction;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw new Error("Failed to update transaction");
  }
}

export { createOrder, updateTransactionStatusAndAmount };
