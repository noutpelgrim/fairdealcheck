import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Attempt to parse priceId from request body if we support multiple tires, but here we just have 1 pro tier
        const priceId = process.env.STRIPE_PRO_PRICE_ID;

        if (!priceId) {
            return new NextResponse("Stripe configuration missing", { status: 500 });
        }

        // In a full DB setup, we'd look up if they already have a stripeCustomerId,
        // but without an MVP DB, we will just create a new customer or let Stripe handle it
        // and map it back via client_reference_id

        // The base URL of the application
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            mode: "subscription",
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${baseUrl}/dashboard?upgraded=true`,
            cancel_url: `${baseUrl}/pricing?canceled=true`,
            client_reference_id: userId, // CRITICAL: This links the checkout back to the Clerk user
            subscription_data: {
                metadata: {
                    clerkUserId: userId,
                }
            }
        });

        return NextResponse.json({ url: session.url });

    } catch (error) {
        console.error("[STRIPE_CHECKOUT_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
