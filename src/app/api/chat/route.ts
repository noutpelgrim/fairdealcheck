import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const isPro = user.privateMetadata.isPro === true;

        if (!isPro) {
            return new NextResponse("Upgrade to Pro to use the Negotiation Copilot", { status: 403 });
        }

        const { messages } = await req.json();

        const systemPrompt = `You are a world-class negotiation expert and behavioral psychologist assisting a user in negotiating a service quote (e.g., contractor, mechanic, dentist).
Your goal is to help them analyze the provider's response and suggest the best next move.

Always format your response with exactly three clear sections using Markdown headings:
1. ### Analysis: A brief 2-3 sentence breakdown of the provider's tactics or position.
2. ### Strategy: A 1-2 sentence recommendation on what to do next based on behavioral psychology (e.g., anchoring, alternative options, silence).
3. ### Reply: A short, actionable message they can copy and paste to send back to the provider.

Keep your tone professional, authoritative, and concise. Do not use filler words.`;

        const result = streamText({
            model: openai('gpt-4o'),
            system: systemPrompt,
            messages,
            temperature: 0.7,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error("[CHAT_API_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
