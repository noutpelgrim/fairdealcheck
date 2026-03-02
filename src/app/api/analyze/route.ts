import { NextResponse } from "next/server";
import { analyzeQuote, QuoteRequest } from "@/lib/pricingEngine";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        // Handle guest users (no userId) vs registered users
        if (userId) {
            const client = await clerkClient();
            const user = await client.users.getUser(userId);

            const privateMetadata = user.privateMetadata as {
                isPro?: boolean;
                usageCount?: number;
                usageResetDate?: string;
            };

            const isPro = privateMetadata.isPro === true;
            let usageCount = privateMetadata.usageCount || 0;
            let usageResetDate = privateMetadata.usageResetDate
                ? new Date(privateMetadata.usageResetDate)
                : new Date();

            // Check if reset period has passed (e.g. 30 days)
            if (!isPro) {
                const now = new Date();
                if (now > usageResetDate) {
                    // Reset usage
                    usageCount = 0;
                    // Set next reset date to 30 days from now
                    usageResetDate = new Date();
                    usageResetDate.setDate(usageResetDate.getDate() + 30);
                } else if (usageCount >= 5) { // Increased limit for demo purposes
                    // Limit reached
                    return NextResponse.json(
                        { error: "Free plan limit reached. Please upgrade to Pro for unlimited analyses." },
                        { status: 403 }
                    );
                }
            }

            const body: QuoteRequest = await req.json();

            // Calculate advanced pricing metrics
            const analysis = analyzeQuote(body);

            // Update Usage Counter for free users
            if (!isPro) {
                await client.users.updateUserMetadata(userId, {
                    privateMetadata: {
                        usageCount: usageCount + 1,
                        usageResetDate: usageResetDate.toISOString(),
                    }
                });
            }

            // Artificial delay for realism
            await new Promise(resolve => setTimeout(resolve, 1500));

            return NextResponse.json(analysis);
        } else {
            // Guest User: Process request without usage tracking
            const body: QuoteRequest = await req.json();
            const analysis = analyzeQuote(body);

            // Artificial delay for realism
            await new Promise(resolve => setTimeout(resolve, 1500));

            return NextResponse.json(analysis);
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
