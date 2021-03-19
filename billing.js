import stripePackage from "stripe";
import handler from "./lib/handler-lib";
import { calculateCost } from "./lib/billing-lib";

export const main = handler(async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the  environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "inr",
    shipping: {
      name: "Gajanan Sanu",
      address: {
        line1: "10 2nd Main Road",
        postal_code: "560003",
        city: "Bangalore",
        state: "KA",
        country: "IN",
      },
    },
  });

  return { status: true };
});