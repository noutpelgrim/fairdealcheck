import Stripe from "stripe";

// We assert that the environment variable will be provided.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-02-24.acacia", // Hardcoding latest for this project
    appInfo: {
        name: "FairDealCheck",
        version: "0.1.0",
    },
});
