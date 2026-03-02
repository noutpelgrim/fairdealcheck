import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Logo } from "@/components/Logo";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};
    return {
        title: `${post.title} — FairDealCheck Blog`,
        description: post.description,
        keywords: [post.primaryKeyword, "fair price check", "service quote comparison"],
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-sm text-navy/50 hover:text-navy transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-5">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                            {post.category}
                        </span>
                        <span className="text-sm text-navy/40">{post.readTime}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-navy tracking-tight leading-[1.1] mb-6">
                        {post.title}
                    </h1>
                    <p className="text-lg text-navy/60 leading-relaxed mb-6">{post.description}</p>
                    <div className="flex items-center gap-2 text-sm text-navy/40 border-t border-neutral-100 pt-6">
                        <span>Published {formattedDate}</span>
                        <span>&bull;</span>
                        <span>FairDealCheck Team</span>
                    </div>
                </header>

                {/* Inline CTA */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <div className="font-bold text-navy mb-1">Got a quote to check?</div>
                        <div className="text-sm text-navy/60">Get your Fairness Score in under 60 seconds &mdash; free.</div>
                    </div>
                    <Link href="/analyze" className="flex-shrink-0">
                        <button className="bg-navy text-white font-semibold px-6 py-3 rounded-full hover:bg-emerald-700 transition-all text-sm whitespace-nowrap">
                            Check My Quote
                            <ArrowRight className="inline ml-2 w-4 h-4" />
                        </button>
                    </Link>
                </div>

                {/* Article Content */}
                <article
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Bottom CTA */}
                <div className="mt-16 bg-navy rounded-[40px] p-10 text-white text-center">
                    <h2 className="text-2xl font-bold mb-2">Check your own quote now</h2>
                    <p className="text-white/60 mb-6 text-sm max-w-sm mx-auto">
                        Free. No account required. Your quote is never stored.
                    </p>
                    <Link href="/analyze">
                        <button className="bg-white text-navy font-bold px-8 py-4 rounded-full hover:bg-emerald-50 transition-all">
                            Check My Quote &mdash; It&apos;s Free
                            <ArrowRight className="inline ml-2 w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </main>

            <footer className="py-12 border-t border-neutral-100">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-neutral-400">
                    <Logo className="opacity-60 grayscale" />
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
