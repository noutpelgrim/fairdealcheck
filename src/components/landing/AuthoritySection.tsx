"use client";

import React from "react";
import Link from "next/link";

export function AuthoritySection() {
    return (
        <section className="pb-24 px-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-neutral-50 to-white border border-neutral-200 rounded-[40px] p-10 md:p-16 overflow-hidden relative">

                {/* Subtle background watermark */}
                <div className="absolute top-8 right-12 text-[120px] font-black text-neutral-100 select-none pointer-events-none leading-none">
                    CR
                </div>

                <div className="relative">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
                            The Pricing Standard
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-navy tracking-tight leading-[1.1] mb-5 max-w-2xl">
                            We don&apos;t guess.{" "}
                            <span className="text-emerald-600">We measure.</span>
                        </h2>
                        <p className="text-navy/60 text-lg leading-relaxed max-w-2xl">
                            Every Fairness Score is calculated from three independent data sources — verified industry labor rate guides,
                            regional transaction data updated monthly by ZIP code, and anonymized community quote contributions.
                            We cross-reference over <strong className="text-navy">84,000 real service quotes</strong> to produce
                            a score you can take into any service conversation and defend with confidence.
                        </p>
                        <p className="text-navy/50 mt-4 leading-relaxed max-w-2xl">
                            This isn&apos;t crowd-sourced opinion. It&apos;s actuarial-grade pricing intelligence — built
                            the same way insurance companies and consumer advocacy groups have benchmarked markets for decades.
                        </p>
                    </div>

                    {/* Three-column cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                        {[
                            {
                                icon: "📊",
                                title: "Independent Data",
                                body: "Three separate pricing databases, cross-referenced for accuracy. We are not affiliated with any service provider, parts supplier, or home services marketplace.",
                            },
                            {
                                icon: "🔄",
                                title: "Updated Monthly",
                                body: "Regional rates are recalibrated every 30 days to reflect market shifts. You're compared to what people in your area are actually paying right now — not a stale national average.",
                            },
                            {
                                icon: "🔒",
                                title: "Never Monetized",
                                body: "We don't sell your quotes or share data with service providers — ever. We make money only when you subscribe, not when you get a quote. No financial incentive to skew your score.",
                            },
                        ].map((card) => (
                            <div
                                key={card.title}
                                className="bg-white border border-neutral-100 rounded-3xl p-7 shadow-sm"
                            >
                                <div className="text-2xl mb-4">{card.icon}</div>
                                <h3 className="font-bold text-navy text-base mb-2">{card.title}</h3>
                                <p className="text-navy/55 text-sm leading-relaxed">{card.body}</p>
                            </div>
                        ))}
                    </div>

                    {/* Data citation footer */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-neutral-100">
                        <p className="text-xs text-neutral-400 italic">
                            All scores are based on 84,000+ verified quotes in your region — last updated March 2026.
                            <Link href="/methodology" className="ml-2 text-emerald-600 font-semibold underline underline-offset-2 hover:text-emerald-700 transition-colors">
                                Read our full methodology →
                            </Link>
                        </p>
                        <div className="flex items-center gap-2 text-xs text-neutral-400 shrink-0">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Data updated March 2026
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
