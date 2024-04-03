import Stripe from "stripe";
import prisma from "../../prisma";
import { promo } from "../../types/enums/promoEnum";

const stripe = new Stripe(process.env.DEV_STRIPE_SECRECT || "", {
  apiVersion: "2023-10-16",
});

const CURRENCY = "usd";
const DISCOUNT_AMOUNT_CENTS = 1000; // $10 discount represented in cents
const SUCCESS_URL =
  "http://localhost:4000/v1/orders/payment-success?session_id={CHECKOUT_SESSION_ID}";
const CANCEL_URL = "http://localhost:4000/v1/orders/payment-cancelled";

class StripeService {
  static async createCheckoutSessionForOrder(
    orderId: number,
    transactionId: number,
    coupon?: string,
  ) {
    try {
      const orderItems = await prisma.orderItem.findMany({
        where: { orderId },
        include: { product: true },
      });

      if (orderItems.length === 0) {
        throw new Error("Order items not found for this order");
      }

      let totalAmount = orderItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity * 100,
        0,
      );

      // Apply discount if coupon matches
      if (coupon === promo.PROMO_2024) {
        totalAmount = Math.max(0, totalAmount - DISCOUNT_AMOUNT_CENTS);
      }

      const lineItems = [
        {
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: "Total Order",
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: SUCCESS_URL,
        cancel_url: CANCEL_URL,
        client_reference_id: transactionId.toString(),
      });

      return session;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw new Error("Failed to create checkout session");
    }
  }
  static async checkoutSession(sessionId: string) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      return session;
    } catch (error) {
      console.log(error);
      throw new Error("Could not retrieve Checkout Session");
    }
  }
}

export default StripeService;
