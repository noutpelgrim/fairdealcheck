import React from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Logo />

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
                    <Link href="/blog" className="hidden lg:block">
                        <span className="text-sm font-medium text-navy/60 hover:text-navy transition-colors">
                            Blog
                        </span>
                    </Link>
                    <Link href="/methodology" className="hidden lg:block">
                        <span className="text-sm font-medium text-navy/60 hover:text-navy transition-colors">
                            Methodology
                        </span>
                    </Link>
                    <Link href="/transparency" className="hidden lg:block">
                        <span className="text-sm font-medium text-navy/60 hover:text-navy transition-colors">
                            Transparency
                        </span>
                    </Link>
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
