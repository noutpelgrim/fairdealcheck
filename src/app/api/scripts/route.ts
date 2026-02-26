import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const client = await clerkClient();
        const user = await client.users.getUser(userId);

        const privateMetadata = user.privateMetadata as {
            isPro?: boolean;
        };

        const isPro = privateMetadata.isPro === true;

        const { analysis, quoteAmount } = body;
        const diff = typeof quoteAmount === 'number' && typeof analysis.fairMax === 'number'
            ? Math.max(0, quoteAmount - analysis.fairMax)
            : 0;

        let friendly = "";
        let professional = "";
        let assertive = "";

        // Behavioral Psychology applied:
        // Anchoring: We state our target price or market average first.
        // Justification ("Because"): Giving a reason (research, budget) increases compliance.
        // Alternative Solutions: Offering to adjust scope keeps the door open.
        // Escalation: Assertive tone clearly states the consequence (going elsewhere) if the anchor isn't met.

        if (analysis.status === "fair") {
            friendly = `Hi there! I received the €${quoteAmount} quote for the work. I know market rates in the area are right around this range, so it seems fair. Because I'm strictly managing my budget right now, is there any flexibility to come down slightly, perhaps to €${Math.round(quoteAmount * 0.95)}? I'd love to lock this in with you today.`;
            professional = `Hello. Thank you for providing the quote of €${quoteAmount}. Based on my local research, this aligns with standard market rates. However, my allocated budget for this project is €${Math.round(quoteAmount * 0.9)}, so I'm hoping we can find a middle ground. Are there any adjustments we can make to the scope to meet that number?`;
            assertive = `Hi. I reviewed the €${quoteAmount} quote. It's within the acceptable market range, but I have a firm cap of €${Math.round(quoteAmount * 0.9)} for this specific service. Let me know if you can price match that figure, and I'll proceed immediately.`;
        } else if (analysis.status === "high") {
            friendly = `Hi! Thanks so much for sending over the quote for €${quoteAmount}. I've been doing some research on standard local rates, and my data suggests the high end is usually around €${analysis.fairMax}. Because I was really hoping to work with you specifically, is there any way we can bring the price closer to that €${analysis.fairMax} mark?`;
            professional = `Hello, I appreciate you taking the time to quote €${quoteAmount}. I've compared this against standard market data, which places the expected range between €${analysis.fairMin} and €${analysis.fairMax}. Since your quote is above this average, could we review the breakdown to see where we can optimize to hit €${analysis.fairMax}? Alternatively, if there's a simpler tier of service that fits that budget, I'm open to discussing it.`;
            assertive = `Hello. I have received the quote of €${quoteAmount}. My research shows the upper limit for this market is €${analysis.fairMax}. I cannot justify a premium above market rate for this scope. If you are able to adjust the quote to €${analysis.fairMax}, we can move forward. Otherwise, I will need to explore my other options.`;
        } else {
            // Overpriced
            friendly = `Hello! I really appreciate the quote of €${quoteAmount}. To be completely transparent, I've checked a few data points and the standard market rate seems to top out at €${analysis.fairMax}. Because that's quite a wide gap, I'm unable to proceed at the current price. I'd love to give you the business if we can get closer to that market average. What's the best you can do?`;
            professional = `Hi there. Thank you for the proposal of €${quoteAmount}. I have mapped out competitive local rates, and they consistently range up to €${analysis.fairMax} maximum for this exact service. Since your quote is significantly above the market standard, I cannot approve it as-is. Please let me know if there's been a miscalculation in the scope, or if you can revise the quote to align with the €${analysis.fairMax} market rate.`;
            assertive = `Hello. I'm writing regarding the €${quoteAmount} quote. Standard market data indicates a fair price for this work caps at €${analysis.fairMax}. As it stands, your quote is well above market rate. I am moving quickly to finalize a provider—if you can revise your proposal to €${analysis.fairMax}, we have a deal. If not, I will decline the quote and finalize with another provider.`;
        }

        // Artificial delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!isPro) {
            return NextResponse.json({
                friendly,
                professional: "Upgrade to Pro to unlock advanced professional negotiation scripts.",
                assertive: "Upgrade to Pro to unlock assertive escalation scripts.",
            });
        }

        return NextResponse.json({
            friendly,
            professional,
            assertive,
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to generate scripts" }, { status: 500 });
    }
}
