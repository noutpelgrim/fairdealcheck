import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (error: any) {
        console.error(`⚠️ Webhook signature verification failed.`, error.message);
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    try {
        if (event.type === "checkout.session.completed") {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );

            // We passed the clerkUserId in the checkout session creation
            const clerkUserId = session.client_reference_id;

            if (!clerkUserId) {
                console.error("No clerk mapping found in checkout session");
                return new NextResponse("Missing metadata", { status: 400 });
            }

            const client = await clerkClient();
            await client.users.updateUserMetadata(clerkUserId, {
                privateMetadata: {
                    stripeCustomerId: subscription.customer as string,
                    stripeSubscriptionId: subscription.id,
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(
                        subscription.current_period_end * 1000
                    ).toISOString(),
                    isPro: true,
                },
            });
        }

        if (event.type === "invoice.payment_succeeded") {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            );

            const clerkUserId = subscription.metadata.clerkUserId;

            if (clerkUserId) {
                const client = await clerkClient();
                await client.users.updateUserMetadata(clerkUserId, {
                    privateMetadata: {
                        stripePriceId: subscription.items.data[0].price.id,
                        stripeCurrentPeriodEnd: new Date(
                            subscription.current_period_end * 1000
                        ).toISOString(),
                    },
                });
            }
        }

        if (event.type === "customer.subscription.deleted" || event.type === "customer.subscription.updated") {
            const subscription = event.data.object as Stripe.Subscription;
            const clerkUserId = subscription.metadata.clerkUserId;

            // If the status is canceled or past_due, we could revoke access, but handling simple active state here
            const isPro = subscription.status === "active" || subscription.status === "trialing";

            if (clerkUserId) {
                const client = await clerkClient();
                await client.users.updateUserMetadata(clerkUserId, {
                    privateMetadata: {
                        stripePriceId: subscription.items.data[0].price.id,
                        stripeCurrentPeriodEnd: new Date(
                            subscription.current_period_end * 1000
                        ).toISOString(),
                        isPro: isPro
                    },
                });
            }
        }

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        console.error("[WEBHOOK_ERROR]", error);
        return new NextResponse("Internal Webhook Error", { status: 500 });
    }
}
