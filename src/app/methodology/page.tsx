"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function MethodologyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">

                {/* Header */}
                <div className="mb-14">
                    <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
                        Our Methodology
                    </div>
                    <h1 className="text-5xl font-black text-navy tracking-tight leading-[1.1] mb-5">
                        How we calculate your Fairness Score.
                    </h1>
                    <p className="text-navy/60 text-lg leading-relaxed">
                        Every score is driven by data, not opinion. Here&apos;s the plain-English explanation
                        of every decision we make — and every source we use — to produce a number you can defend
                        in any service conversation.
                    </p>
                </div>

                <div className="space-y-12">

                    {/* Section 1 */}
                    <div>
                        <h2 className="text-2xl font-bold text-navy mb-4">1. Where Our Data Comes From</h2>
                        <p className="text-navy/60 leading-relaxed mb-6">
                            We use three independent data layers, cross-referenced to eliminate outliers and
                            regional distortions:
                        </p>
                        <div className="space-y-4">
                            {[
                                {
                                    title: "Industry Labor Rate Guides",
                                    body: "Certified labor rate benchmarks published by trade associations and industry bodies for each service category (auto repair, HVAC, plumbing, electrical, etc.). These guides are updated quarterly and reflect the rate that a reasonably skilled professional in a given trade should charge per hour in a given region.",
                                },
                                {
                                    title: "Regional Transaction Data",
                                    body: "Verified, anonymized service quotes and invoices aggregated by ZIP code and updated monthly. This is the most location-sensitive layer — it tells us what people in your specific area are actually paying right now, not a national average.",
                                },
                                {
                                    title: "Anonymized Community Submissions",
                                    body: "With explicit permission, quotes analyzed on FairDealCheck are contributed to our database after all identifying information is removed. This layer provides real-time market signals that commercial databases often lag on. You can opt out at any time.",
                                },
                            ].map((item) => (
                                <div key={item.title} className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6">
                                    <div className="flex gap-3 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                                        <h3 className="font-bold text-navy">{item.title}</h3>
                                    </div>
                                    <p className="text-navy/60 text-sm leading-relaxed pl-5">{item.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h2 className="text-2xl font-bold text-navy mb-4">2. How the Score Is Calculated</h2>
                        <p className="text-navy/60 leading-relaxed mb-6">
                            Your 0–100 Fairness Score is a weighted composite of three measurements:
                        </p>
                        <div className="overflow-hidden rounded-2xl border border-neutral-100">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-neutral-50 border-b border-neutral-100">
                                        <th className="text-left px-6 py-4 font-bold text-navy">Signal</th>
                                        <th className="text-left px-6 py-4 font-bold text-navy">Weight</th>
                                        <th className="text-left px-6 py-4 font-bold text-navy">How It Works</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-50">
                                    {[
                                        {
                                            signal: "Labor Rate Deviation",
                                            weight: "40%",
                                            detail: "Your quoted hourly labor rate vs. the regional certified benchmark. A 20%+ markup triggers a significant score penalty.",
                                        },
                                        {
                                            signal: "Parts Markup Analysis",
                                            weight: "35%",
                                            detail: "Parts have transparent distributor and retail price points. We flag anything priced significantly above standard retail or distributor cost.",
                                        },
                                        {
                                            signal: "Total Price Deviation",
                                            weight: "25%",
                                            detail: "The total quote vs. the market-rate range for your specific job type, vehicle/home type, and ZIP code.",
                                        },
                                    ].map((row) => (
                                        <tr key={row.signal} className="bg-white">
                                            <td className="px-6 py-4 font-semibold text-navy">{row.signal}</td>
                                            <td className="px-6 py-4">
                                                <span className="text-emerald-600 font-bold">{row.weight}</span>
                                            </td>
                                            <td className="px-6 py-4 text-navy/60">{row.detail}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h2 className="text-2xl font-bold text-navy mb-4">3. What the Score Means</h2>
                        <div className="space-y-3">
                            {[
                                { range: "70 – 100", label: "Fair or Competitive", color: "emerald", desc: "Your quote is within normal market range for your area. There may be minor room to negotiate, but you are not being materially overcharged." },
                                { range: "50 – 69", label: "Slightly Elevated", color: "amber", desc: "Your quote is above the local average. There is meaningful negotiation room. Use the provided script to ask your service provider to align with market rates." },
                                { range: "0 – 49", label: "Statistically Overpriced", color: "red", desc: "Your quote is significantly above the verified market rate for your area. We strongly recommend negotiating or getting a second quote before authorizing any work." },
                            ].map((tier) => (
                                <div
                                    key={tier.range}
                                    className={`flex gap-4 items-start p-5 rounded-2xl border ${tier.color === "emerald"
                                            ? "bg-emerald-50 border-emerald-100"
                                            : tier.color === "amber"
                                                ? "bg-amber-50 border-amber-100"
                                                : "bg-red-50 border-red-100"
                                        }`}
                                >
                                    <span
                                        className={`font-black text-lg tabular-nums shrink-0 ${tier.color === "emerald"
                                                ? "text-emerald-600"
                                                : tier.color === "amber"
                                                    ? "text-amber-600"
                                                    : "text-red-600"
                                            }`}
                                    >
                                        {tier.range}
                                    </span>
                                    <div>
                                        <div className="font-bold text-navy text-sm mb-1">{tier.label}</div>
                                        <div className="text-navy/60 text-sm leading-relaxed">{tier.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 4 — Independence Statement */}
                    <div>
                        <h2 className="text-2xl font-bold text-navy mb-4">4. Our Independence Guarantee</h2>
                        <div className="bg-navy rounded-3xl p-8 text-white">
                            <p className="text-white/80 leading-relaxed mb-4">
                                FairDealCheck is not affiliated with any service provider network, parts supplier,
                                auto dealer group, or home services marketplace. We have no financial incentive
                                to score any quote higher or lower than the data supports.
                            </p>
                            <p className="text-white/80 leading-relaxed mb-4">
                                We make money only when you subscribe to a plan. We never make money when you
                                receive, upload, or act on a quote. This means our scores cannot be influenced
                                by advertisers, service partners, or platform economics.
                            </p>
                            <p className="text-white/60 text-sm italic">
                                This is the same independence standard held by Consumer Reports, Wirecutter,
                                and major consumer advocacy organizations. We believe pricing data
                                is only trustworthy when the publisher has nothing to gain from the outcome.
                            </p>
                        </div>
                    </div>

                    {/* Section 5 — Data freshness */}
                    <div className="bg-neutral-50 border border-neutral-100 rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <p className="font-bold text-navy mb-1">Data Last Updated</p>
                            <p className="text-navy/60 text-sm">March 2026 — Regional rates recalibrated monthly</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-navy mb-1">Dataset Size</p>
                            <p className="text-navy/60 text-sm">84,000+ verified quotes across 50 states</p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-4">
                        <p className="text-navy/60 mb-4">Ready to put the data to work?</p>
                        <Link
                            href="/analyze"
                            className="inline-flex items-center gap-2 bg-navy text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-navy/20 hover:bg-navy/90 transition-colors"
                        >
                            Check My Quote — It&apos;s Free →
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-neutral-100 text-center text-sm text-neutral-400">
                <p>© 2026 FairDeal Technologies Inc. · <Link href="/privacy" className="hover:text-navy transition-colors">Privacy</Link> · <Link href="/terms" className="hover:text-navy transition-colors">Terms</Link></p>
            </footer>
        </div>
    );
}
