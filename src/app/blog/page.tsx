import React from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog — FairDealCheck | Pricing Guides & Negotiation Tips",
    description:
        "Learn how to spot overpriced service quotes, compare market rates, and negotiate like a pro. Real pricing data for auto repair, contractors, and home services.",
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-white">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <ShieldCheck className="h-6 w-6 text-navy" />
                        <span className="font-bold text-lg tracking-tight text-navy">FairDeal</span>
                    </Link>
                    <Link href="/analyze">
                        <span className="text-sm font-medium text-navy hover:text-emerald-600 transition-colors">
                            Analyze Now
                        </span>
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-16">
                    <div className="inline-flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                        FairDeal Blog
                    </div>
                    <h1 className="text-5xl font-bold text-navy tracking-tight mb-4">
                        Know what things cost.<br />Stop overpaying.
                    </h1>
                    <p className="text-navy/60 text-lg max-w-xl">
                        Pricing guides, negotiation scripts, and industry benchmarks — so you always walk in informed.
                    </p>
                </div>

                {/* Post grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col bg-neutral-50 rounded-3xl border border-neutral-100 p-8 hover:border-navy/20 hover:shadow-lg hover:shadow-navy/5 transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                    {post.category}
                                </span>
                                <span className="text-xs text-navy/40">{post.readTime}</span>
                            </div>
                            <h2 className="text-xl font-bold text-navy mb-3 leading-snug group-hover:text-emerald-700 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-navy/60 text-sm leading-relaxed flex-1 mb-6">
                                {post.description}
                            </p>
                            <div className="flex items-center text-sm font-semibold text-navy group-hover:text-emerald-600 transition-colors">
                                Read article
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA banner */}
                <div className="mt-20 bg-navy rounded-[40px] p-10 md:p-16 text-white text-center">
                    <h2 className="text-3xl font-bold mb-3">Ready to check your own quote?</h2>
                    <p className="text-white/60 mb-8 max-w-md mx-auto">
                        Upload any service quote and get an instant Fairness Score, market comparison, and negotiation script — free.
                    </p>
                    <Link href="/analyze">
                        <button className="bg-white text-navy font-bold px-8 py-4 rounded-full hover:bg-emerald-50 transition-all shadow-xl">
                            Check My Quote — It&apos;s Free
                            <ArrowRight className="inline ml-2 w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </main>

            <footer className="py-12 border-t border-neutral-100">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-neutral-400">
                    <Link href="/" className="flex items-center space-x-2">
                        <ShieldCheck className="h-5 w-5 opacity-40" />
                        <span className="font-semibold tracking-tight opacity-60">FairDealCheck</span>
                    </Link>
                    <div className="flex items-center space-x-8">
                        <Link href="/privacy" className="hover:text-navy transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-navy transition-colors">Terms</Link>
                        <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
                    </div>
                    <p>© 2026 FairDeal Technologies Inc.</p>
                </div>
            </footer>
        </div>
    );
}
