import { Request, Response } from "express";
import * as ordersModel from "../../model/orders/orders.model";
import StripeService from "../../services/stripe/stripe.service";
import {
  ResponseMessages,
  ResponseStatus,
} from "../../types/enums/responseEnums";

async function createOrderController(request: Request, response: Response) {
  try {
    const { address, orderItems, promo: coupon } = request.body;

    console.log({ address, orderItems }, "payload");

    if (!address || !orderItems || orderItems.length === 0) {
      return response.status(ResponseStatus.BadRequest).json({
        message: "Missing order details. Address and order items are required.",
      });
    }

    const newOrder = await ordersModel.createOrder({ address, orderItems });

    if (!newOrder || !newOrder.id) {
      throw new Error("Order creation failed or missing order ID.");
    }

    if (!newOrder.transaction) {
      throw new Error("Order creation failed or missing Transaction");
    }

    const stripeSession = await StripeService.createCheckoutSessionForOrder(
      newOrder.id,
      newOrder.transaction.id,
      coupon,
    );

    return response.status(ResponseStatus.Created).json({
      message: ResponseMessages.Created,
      data: {
        // order: newOrder,
        stripeSessionId: stripeSession.id,
        sessionUrl: stripeSession.url,
      },
    });
  } catch (error) {
    console.error("Error creating order and Stripe session:", error);
    return response.status(ResponseStatus.InternalServerError).json({
      message: ResponseMessages.InternalServerError,
    });
  }
}

async function paymentSuccess(request: Request, response: Response) {
  try {
    const sessionId = request.query.session_id as string;

    if (!sessionId) {
      return response
        .status(ResponseStatus.BadRequest)
        .json({ message: "Session ID is required" });
    }

    const session = await StripeService.checkoutSession(sessionId);

    if (!session.client_reference_id) {
      throw new Error("Transaction ID missing in Stripe session");
    }

    const transactionId = parseInt(session.client_reference_id, 10);
    const totalAmount = session.amount_total ? session.amount_total / 100 : 0;

    await ordersModel.updateTransactionStatusAndAmount(
      transactionId,
      totalAmount,
    );

    response
      .status(ResponseStatus.Redirect)
      .redirect(process.env.CLIENT_SERVER_2 + "/category");
  } catch (error) {
    console.error("Error processing payment success:", error);
    return response
      .status(ResponseStatus.InternalServerError)
      .json({ message: "Failed to process payment success" });
  }
}

async function paymentCancelled(request: Request, response: Response) {
  return response
    .status(ResponseStatus.Redirect)
    .redirect(process.env.CLIENT_SERVER_2 + "/category");
}

export { createOrderController, paymentSuccess, paymentCancelled };
