import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import { paddle } from "@/lib/paddle";

export async function POST(req: Request) {
    const signature = req.headers.get("paddle-signature");

    if (!signature) {
        return new NextResponse("Missing signature", { status: 400 });
    }

    const payload = await req.text();

    try {
        const secretKey = process.env.PADDLE_WEBHOOK_SECRET || "";

        // Verify the webhook signature using the Paddle SDK
        const eventData = await paddle.webhooks.unmarshal(payload, secretKey, signature);

        const client = await clerkClient();

        if (eventData?.eventType === "subscription.created" || eventData?.eventType === "subscription.updated") {
            // Find the customData holding the clerk user id passed from the frontend Paddle checkout
            const customData = eventData.data.customData as { userId?: string } | undefined;
            const userId = customData?.userId;
            const subscriptionId = eventData.data.id;

            if (userId) {
                await client.users.updateUserMetadata(userId, {
                    privateMetadata: {
                        isPro: true,
                        paddleSubscriptionId: subscriptionId
                    }
                });
                console.log(`[Paddle Webhook] Activated Pro for user ${userId}`);
            } else {
                console.error("[Paddle Webhook] Webhook missing userId in customData");
            }
        }

        if (eventData?.eventType === "subscription.canceled") {
            const customData = eventData.data.customData as { userId?: string } | undefined;
            const userId = customData?.userId;

            if (userId) {
                await client.users.updateUserMetadata(userId, {
                    privateMetadata: {
                        isPro: false,
                        paddleSubscriptionId: null
                    }
                });
                console.log(`[Paddle Webhook] Deactivated Pro for user ${userId}`);
            }
        }

        return new NextResponse("Webhook processed", { status: 200 });

    } catch (err) {
        console.error(`[Paddle Webhook Error]`, err);
        return new NextResponse("Webhook verification failed", { status: 400 });
    }
}
