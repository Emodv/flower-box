import Stripe from "stripe";
import prisma from "../../prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

class StripeService {
  static async createCheckoutSessionForOrder(orderId: number) {
    const orderItems = await prisma.orderItem.findMany({
      where: { orderId },
      include: { product: true },
    });

    if (orderItems.length === 0) {
      throw new Error("Order items not found for this order");
    }

    const lineItems = orderItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url:
        "http://example.com/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://example.com/cancel",
      client_reference_id: orderId.toString(),
    });

    return session;
  }
}

export { StripeService };
