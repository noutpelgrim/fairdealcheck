import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId } = await auth();

        let isPro = false;
        if (userId) {
            try {
                const client = await clerkClient();
                const user = await client.users.getUser(userId);
                const privateMetadata = user.privateMetadata as { isPro?: boolean };
                isPro = privateMetadata.isPro === true;
            } catch (e) {
                console.error("Clerk error:", e);
            }
        }

        const { analysis, quoteAmount } = body;
        const marketAverage = Math.round((analysis.fairMin + analysis.fairMax) / 2);

        // Expert Negotiation Strategy Logic
        let friendly = "";
        let professional = "";
        let assertive = "";

        if (analysis.status === "fair") {
            friendly = `Hi! I've reviewed the €${quoteAmount} quote for the service. I've done some market research, and your pricing seems very fair and competitive compared to the local average of €${marketAverage}. I'm really impressed with your team's reputation. While the quote is fair, I'm trying to stay strictly within a specific budget for this quarter. Would there be any room for a small courtesy discount—perhaps 5%—if I were to lock this in and pay the deposit today? I’d love to get this on the calendar. Is there any flexibility there?`;

            professional = `Hello. Thank you for providing the quote of €${quoteAmount}. I have compared this against regional market data, which indicates a fair range centered around €${marketAverage}. Your proposal is well within that competitive window. That said, I am currently evaluating multiple projects and am looking to optimize my total spend. Given that this quote is fair, I am prepared to move forward immediately if we can align on a slightly adjusted figure of €${Math.round(quoteAmount * 0.95)}. This would allow me to authorize the work today without further review. Can you help me understand if that’s a possibility?`;

            assertive = `Hi. I reviewed the €${quoteAmount} proposal. My data shows this is a standard market rate for the area. However, I have a firm cap for this specific project and am looking for the best possible value to justify the immediate start. If we can bring this down to €${Math.round(quoteAmount * 0.93)}, I will bypass other quotes and sign the agreement now. I’m ready to proceed—is there flexibility to meet that number for an immediate commitment?`;
        } else {
            // High or Overpriced
            const diffPercent = Math.round(((quoteAmount - marketAverage) / marketAverage) * 100);

            friendly = `Hi there! I really appreciate the detailed quote of €${quoteAmount}. I’ve been researching market rates for this service in our area, and I noticed that the average total is closer to €${marketAverage}. It looks like this quote is about ${diffPercent}% higher than the standard market range. I was really hoping to work with you specifically because of your great reviews, but the current price is a bit difficult for me to justify. Because I’d prefer to give you the business, is there any way we can bring this closer to the €${analysis.fairMax} range? I’m happy to discuss adjusting the scope if that helps. What do you think?`;

            professional = `Hello. Thank you for the €${quoteAmount} proposal. I have conducted a thorough review of regional market pricing for this exact scope, and the data indicates a fair market value closer to €${marketAverage}. Your quote currenty carries a premium of approximately ${diffPercent}% over the market average, which is higher than my allocated budget. I would like to find a way to make this work, as I value your expertise. Could we review the labor and parts breakdown together to see where we can align this more closely with local market standards? I am aiming for a target of €${analysis.fairMax}. Is there flexibility in the pricing to reach that goal?`;

            assertive = `Hi. I’m writing regarding the €${quoteAmount} quote. My analysis of current market rates for this service shows a standard range that caps at €${analysis.fairMax}, with a regional average of €${marketAverage}. Your quote is significantly above that benchmark. At this price point, I cannot move forward, as I have received other competitive bids that align more closely with the €${marketAverage} mark. However, I’d prefer to finalize this with you if you can match the market rate. If you can revise the quote to €${analysis.fairMax}, I am prepared to sign today. Otherwise, I will have to proceed with another provider. Can you help me understand if you can adjust this?`;
        }

        await new Promise(resolve => setTimeout(resolve, 800));

        return NextResponse.json({
            friendly,
            professional,
            assertive,
        });
    } catch (error) {
        console.error("Script generation error:", error);
        return NextResponse.json({ error: "Failed to generate scripts" }, { status: 500 });
    }
}
