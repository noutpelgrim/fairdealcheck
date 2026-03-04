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
        <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-100">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {!isHomepage && (
                        <button
                            onClick={() => router.back()}
                            className="p-2 -ml-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-colors flex bg-transparent"
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
                        <span className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
                            Examples
                        </span>
                    </Link>
                    <Link href="/pricing" className="hidden sm:block">
                        <span className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
                            Pricing
                        </span>
                    </Link>
                    <Link href="/blog" className="hidden lg:block">
                        <span className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
                            Blog
                        </span>
                    </Link>
                    <Link href="/methodology" className="hidden lg:block">
                        <span className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
                            Methodology
                        </span>
                    </Link>
                    <Link href="/transparency" className="hidden lg:block">
                        <span className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
                            Transparency
                        </span>
                    </Link>

                    {/* Auth State */}
                    {isSignedIn ? (
                        <>
                            <Link href="/dashboard" className="hidden sm:block ml-2">
                                <span className="text-[13px] font-medium text-slate-900 hover:text-emerald-500 transition-colors">
                                    Dashboard
                                </span>
                            </Link>
                            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
                        </>
                    ) : (
                        <Link href="/sign-in" className="hidden sm:block">
                            <span className="text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
                                Sign In
                            </span>
                        </Link>
                    )}

                    <Link href="/analyze" className="sm:ml-2">
                        <span className="inline-flex items-center justify-center text-[13px] font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors px-4 py-2 rounded-lg">
                            Audit a Quote
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
