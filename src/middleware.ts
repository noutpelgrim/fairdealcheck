import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/analyze(.*)', '/copilot(.*)'])
const isPublicRoute = createRouteMatcher(['/', '/pricing', '/api/webhook/paddle', '/sign-in(.*)', '/sign-up(.*)'])

const clerk = clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req) && isProtectedRoute(req)) {
        await auth.protect()
    }
});

export default function middleware(req: any, event: any) {
    const ua = req.headers.get('user-agent') || '';
    // Bypass Clerk entirely for AI scrapers and search engine bots to avoid the dev-mode handshake redirect
    if (ua.toLowerCase().includes('chatgpt') || ua.toLowerCase().includes('bot') || ua.toLowerCase().includes('spider') || ua.toLowerCase().includes('crawler')) {
        return NextResponse.next();
    }
    return clerk(req, event);
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
