import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/copilot(.*)'])
const isPublicRoute = createRouteMatcher(['/', '/pricing', '/analyze(.*)', '/blog(.*)', '/api/webhook/paddle', '/sign-in(.*)', '/sign-up(.*)'])

const clerk = clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req) && isProtectedRoute(req)) {
        await auth.protect()
    }
});

export default async function middleware(req: any, event: any) {
    const response = await clerk(req, event);

    const ua = req.headers.get('user-agent') || '';
    const isBot = ua.toLowerCase().includes('chatgpt') || ua.toLowerCase().includes('bot') || ua.toLowerCase().includes('spider') || ua.toLowerCase().includes('crawler');

    // If it's a bot and Clerk tries to redirect (auth/handshake), suppress the redirect
    // and just render the page normally so bots can see the public content.
    const isRedirect = [301, 302, 307, 308].includes(response?.status || 0);
    if (isBot && isRedirect) {
        // We still need to pass Clerk's auth headers downstream so auth() doesn't crash on the page
        const headers = new Headers(req.headers);
        headers.set('x-clerk-auth-reason', 'bot-bypass');
        headers.set('x-clerk-auth-status', 'signed-out');

        return NextResponse.next({
            request: {
                headers: headers
            }
        });
    }

    return response || NextResponse.next();
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
