import Stripe from "stripe";
import { SubscriptionEnum } from "../../enums/stripeEnums";

const stripe = new Stripe(process.env.DEV_STRIPE_SECRECT || "", {
  apiVersion: "2023-10-16",
});

// const successUrl =
//   "https://api.tamilmatchmaking.com/v1/stripe/payment-success?session_id={CHECKOUT_SESSION_ID}";
// const cancelUrl = "https://api.tamilmatchmaking.com/v1/stripe/payment-cancelled";

const successUrl =
  "http://localhost:4000/v1/stripe/payment-success?session_id={CHECKOUT_SESSION_ID}";
const cancelUrl = "http://localhost:4000/v1/stripe/payment-cancelled";

async function getSubscription(
  userId: string,
  subscriptionType:
    | "1 month subscription"
    | "3 months subscription"
    | "6 months subscription",
) {
  try {
    const unitAmount = SubscriptionEnum[subscriptionType];

    if (!unitAmount) {
      throw new Error("Invalid subscription type");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: `Subscription - ${subscriptionType}`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: userId,
      metadata: {
        subscriptionType,
      },
    });
    return session;
  } catch (error) {
    console.log(error);
    throw new Error("Could not create Subscription Session");
  }
}

async function checkoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error("Could not retrieve Checkout Session");
  }
}

export { getSubscription, checkoutSession };
