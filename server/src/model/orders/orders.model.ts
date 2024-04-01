import prisma from "../../prisma";
import {
  OrderItem,
  Order,
  OrderStatus,
  TransactionStatus,
} from "@prisma/client";

async function createOrder({
  address,
  orderItems,
}: {
  address: string;
  orderItems: OrderItem[];
}): Promise<Order | null> {
  try {
    const order = await prisma.$transaction(async (prisma) => {
      // Create the order
      const newOrder = await prisma.order.create({
        data: {
          address,
          status: OrderStatus.PENDING,
        },
      });

      const defaultTransactionAmount = 0;

      await prisma.transaction.create({
        data: {
          orderId: newOrder.id,
          amount: defaultTransactionAmount,
          status: TransactionStatus.FAILED,
        },
      });

      await prisma.orderItem.createMany({
        data: orderItems.map((item) => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      const orderWithDetails = await prisma.order.findUnique({
        where: { id: newOrder.id },
        include: {
          orderItems: true,
          transaction: true,
        },
      });

      return orderWithDetails;
    });

    return order;
  } catch (error) {
    console.error("Error creating order with transaction:", error);
    throw new Error("Failed to create order and transaction");
  }
}

export { createOrder };
