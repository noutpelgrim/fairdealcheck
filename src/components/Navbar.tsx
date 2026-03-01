import React from "react";
import Link from "next/link";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2.5 group">
                    {/* Shield + check SVG logo */}
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                    >
                        <path
                            d="M14 2L4 6.5V13C4 18.5 8.4 23.7 14 25C19.6 23.7 24 18.5 24 13V6.5L14 2Z"
                            fill="#020617"
                        />
                        <path
                            d="M9.5 13.5L12.5 16.5L18.5 10.5"
                            stroke="#10b981"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {/* Wordmark */}
                    <span className="font-bold text-lg tracking-tight text-navy">
                        FairDeal<span className="text-emerald-600">Check</span>
                    </span>
                </Link>

                {/* Nav links */}
                <div className="flex items-center gap-6">
                    <Link href="/examples">
                        <span className="text-sm font-medium text-navy/60 hover:text-navy transition-colors">
                            Examples
                        </span>
                    </Link>
                    <Link href="/blog">
                        <span className="text-sm font-medium text-navy/60 hover:text-navy transition-colors">
                            Blog
                        </span>
                    </Link>
                    <Link href="/analyze">
                        <span className="text-sm font-medium text-navy hover:text-emerald-600 transition-colors">
                            Analyze Now
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
