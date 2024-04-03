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
