"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Logo } from "@/components/Logo";

export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { isSignedIn } = useAuth();

    const isHomepage = pathname === "/";

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {!isHomepage && (
                        <button
                            onClick={() => router.back()}
                            className="p-2 -ml-2 text-navy/50 hover:text-navy hover:bg-neutral-100 rounded-full transition-colors flex bg-neutral-50/50 xl:bg-transparent"
                            aria-label="Go back"
                            title="Go back"
                        >
                            <ArrowLeft className="w-[18px] h-[18px]" />
                        </button>
                    )}
                    {/* Logo */}
                    <Logo />
                </div>

                {/* Nav links - Hidden on small screens, flex on large */}
                <div className="flex items-center gap-4 sm:gap-6">
                    <Link href="/examples" className="hidden md:block">
                        <span className="text-sm font-medium text-navy/60 hover:text-navy transition-colors">
                            Examples
                        </span>
                    </Link>
                    <Link href="/pricing" className="hidden sm:block">
                        <span className="text-sm font-medium text-navy/60 hover:text-navy transition-colors">
                            Pricing
                        </span>
                    </Link>

                    {/* Auth State */}
                    {isSignedIn ? (
                        <>
                            <Link href="/dashboard" className="hidden sm:block ml-2">
                                <span className="text-sm font-medium text-navy hover:text-emerald-600 transition-colors">
                                    Dashboard
                                </span>
                            </Link>
                            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
                        </>
                    ) : (
                        <Link href="/sign-in" className="hidden sm:block">
                            <span className="text-sm font-medium text-navy/60 hover:text-navy transition-colors">
                                Sign In
                            </span>
                        </Link>
                    )}

                    <Link href="/analyze" className="sm:ml-2">
                        <span className="text-sm font-bold text-navy hover:text-emerald-600 transition-colors bg-white sm:bg-transparent border border-neutral-100 sm:border-none px-3 py-1.5 rounded-full sm:p-0">
                            Audit a Quote
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
